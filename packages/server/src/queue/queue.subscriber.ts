import { QueueSSEService } from '../queue/queue-sse.service';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { QueueModel } from './queue.entity';

@EventSubscriber()
export class QueueSubscriber implements EntitySubscriberInterface<QueueModel> {
  private queueSSEService: QueueSSEService;
  constructor(connection: Connection, queueSSEService: QueueSSEService) {
    this.queueSSEService = queueSSEService;
    connection.subscribers.push(this);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  listenTo() {
    return QueueModel;
  }

  async afterUpdate(event: UpdateEvent<QueueModel>): Promise<void> {
    if (event.entity) {
      // Send all listening clients an update
      await this.queueSSEService.updateQueue(event.entity.id);
    }
  }
}
