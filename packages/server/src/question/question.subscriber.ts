import {
  EventSubscriber,
  EntitySubscriberInterface,
  Connection,
  UpdateEvent,
  InsertEvent,
} from 'typeorm';
import {
  NotificationService,
  NotifMsgs,
} from '../notification/notification.service';
import { QuestionModel } from './question.entity';
import { ClosedQuestionStatus } from '@template/common';
import { QueueSSEService } from 'queue/queue-sse.service';

@EventSubscriber()
export class QuestionSubscriber
  implements EntitySubscriberInterface<QuestionModel> {
  private notifService: NotificationService;
  private queueSSEService: QueueSSEService;
  constructor(
    connection: Connection,
    notifService: NotificationService,
    queueSSEService: QueueSSEService,
  ) {
    this.notifService = notifService;
    this.queueSSEService = queueSSEService;
    connection.subscribers.push(this);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  listenTo() {
    return QuestionModel;
  }

  async afterUpdate(event: UpdateEvent<QuestionModel>): Promise<void> {
    // Send all listening clients an update
    await this.queueSSEService.updateQuestions(event.entity.queueId);

    // Send push notification to students when they are hit 3rd in line
    // if status updated to closed
    if (
      event.updatedColumns.find((c) => c.propertyName === 'status') &&
      event.entity.status in ClosedQuestionStatus
    ) {
      // get 3rd in queue before and after this update
      const previousThird = await QuestionModel.openInQueue(
        event.entity.queueId,
      )
        .offset(2)
        .getOne();
      const third = await QuestionModel.openInQueue(event.entity.queueId)
        .setQueryRunner(event.queryRunner) // Run in same transaction as the update
        .offset(2)
        .getOne();
      if (previousThird?.id !== third?.id) {
        const { creatorId } = third;
        this.notifService.notifyUser(creatorId, NotifMsgs.queue.THIRD_PLACE);
      }
    }
  }

  async afterInsert(event: InsertEvent<QuestionModel>): Promise<void> {
    // Send all listening clients an update
    await this.queueSSEService.updateQuestions(event.entity.queueId);
  }
}
