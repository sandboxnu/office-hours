import {
  EventSubscriber,
  EntitySubscriberInterface,
  Connection,
  UpdateEvent,
} from 'typeorm';
import {
  NotificationService,
  NotifMsgs,
} from '../notification/notification.service';
import { QuestionModel } from './question.entity';
import { ClosedQuestionStatus } from '@template/common';
import { SSEService } from 'sse/sse.service';

@EventSubscriber()
export class QuestionSubscriber
  implements EntitySubscriberInterface<QuestionModel> {
  private notifService: NotificationService;
  private sseService: SSEService;
  constructor(
    connection: Connection,
    notifService: NotificationService,
    sseService: SSEService,
  ) {
    this.notifService = notifService;
    this.sseService = sseService;
    connection.subscribers.push(this);
  }

  listenTo() {
    return QuestionModel;
  }

  async afterUpdate(event: UpdateEvent<QuestionModel>) {
    // Send all listening clients an update
    this.sseService.sendEvent(`q-${event.entity.queueId}`, { msg: 'update' });

    // Send push notification to students when they are hit 3rd in line
    // if status updated to closed
    if (
      event.updatedColumns.find((c) => c.propertyName === 'status') &&
      event.entity.status in ClosedQuestionStatus
    ) {
      // get top 3 in queue
      const top3 = await QuestionModel.openInQueue(event.entity.queueId)
        .setQueryRunner(event.queryRunner) // Run in same transaction as the update
        .limit(3)
        .getMany();
      if (top3.length === 3) {
        const { creatorId } = top3[2];
        this.notifService.notifyUser(creatorId, NotifMsgs.queue.THIRD_PLACE);
      }
    }
  }
}
