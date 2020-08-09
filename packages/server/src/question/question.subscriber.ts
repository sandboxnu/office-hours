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

@EventSubscriber()
export class QuestionSubscriber
  implements EntitySubscriberInterface<QuestionModel> {
  notifService: NotificationService;
  constructor(connection: Connection, notifService: NotificationService) {
    this.notifService = notifService;
    connection.subscribers.push(this);
  }

  listenTo() {
    return QuestionModel;
  }

  // Notify students when they get near the top of the queue
  async afterUpdate(event: UpdateEvent<QuestionModel>) {
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
