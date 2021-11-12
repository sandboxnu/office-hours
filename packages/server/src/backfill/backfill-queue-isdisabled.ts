import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { QueueModel } from '../queue/queue.entity';

@Injectable()
export class BackfillQueueIsDisabled {
  @Command({
    command: 'backfill:default-queue-isdisabled',
    describe: 'set default visibility for preexisting queues to false.',
    autoExit: true,
  })
  async fix(): Promise<void> {
    const queues = await QueueModel.find();

    queues.forEach((queue) => {
      queue.isDisabled = false;
    });

    await QueueModel.save(queues);
  }
}
