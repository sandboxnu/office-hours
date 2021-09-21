import { ClosedQuestionStatus } from '@koh/common';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import {
  NotificationService,
  NotifMsgs,
} from '../notification/notification.service';
import { QueueSSEService } from '../queue/queue-sse.service';
import { QueueModel } from '../queue/queue.entity';
import { QuestionModel } from './question.entity';

@EventSubscriber()
export class QuestionSubscriber
  implements EntitySubscriberInterface<QuestionModel>
{
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
    if (!event.entity) {
      // TODO: this is kinda janky maybe fix
      return;
    }

    await this.queueSSEService.updateQuestions(event.entity.queueId);
    // Send push notification to students when they are hit 3rd in line
    // if status updated to closed
    if (
      event.updatedColumns.find((c) => c.propertyName === 'status') &&
      event.entity.status in ClosedQuestionStatus
    ) {
      // get 3rd in queue before and after this update
      const previousThird = await QuestionModel.waitingInQueue(
        event.entity.queueId,
      )
        .offset(2)
        .getOne();
      const third = await QuestionModel.waitingInQueue(event.entity.queueId)
        .setQueryRunner(event.queryRunner) // Run in same transaction as the update
        .offset(2)
        .getOne();
      if (third && previousThird?.id !== third?.id) {
        const { creatorId } = third;
        this.notifService.notifyUser(creatorId, NotifMsgs.queue.THIRD_PLACE);
      }
    }
  }

  async afterInsert(event: InsertEvent<QuestionModel>): Promise<void> {
    const numberOfQuestions = await QuestionModel.waitingInQueue(
      event.entity.queueId,
    ).getCount();

    if (numberOfQuestions === 0) {
      const staff = (
        await QueueModel.findOne(event.entity.queueId, {
          relations: ['staffList'],
        })
      ).staffList;

      staff.forEach((staff) => {
        this.notifService.notifyUser(
          staff.id,
          NotifMsgs.ta.STUDENT_JOINED_EMPTY_QUEUE,
        );
      });
    }

    // Send all listening clients an update
    await this.queueSSEService.updateQuestions(event.entity.queueId);
  }

  async beforeRemove(event: RemoveEvent<QuestionModel>): Promise<void> {
    // due to cascades entity is not guaranteed to be loaded
    if (event.entity) {
      // Send all listening clients an update
      await this.queueSSEService.updateQuestions(event.entity.queueId);
    }
  }
}
