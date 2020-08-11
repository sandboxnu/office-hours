import { ClosedQuestionStatus } from '@template/common';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import {
  NotificationService,
  NotifMsgs,
} from '../notification/notification.service';
import { QuestionModel } from './question.entity';

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
      if (previousThird && third && previousThird?.id !== third?.id) {
        const { creatorId } = third;
        this.notifService.notifyUser(creatorId, NotifMsgs.queue.THIRD_PLACE);
      }
    }
  }
}
