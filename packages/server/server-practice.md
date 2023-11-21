# enforce types

### In packages/common/index.ts, define classes as such to enforce types:
class-validator class is used to enforce types and suggest optional fields

```
export class Image {
  @IsOptional()
  @IsInt()
  id?: number;
}
```

### Use exported classes in the nestjs and nestjs example
```
import {
  GetQueueResponse,
  UpdateQueueParams
} from '@koh/common';

...

  @Patch(':queueId')
  @Roles(Role.TA, Role.PROFESSOR)
  async updateQueue(
    @Param('queueId') queueId: number,
    @Body() body: UpdateQueueParams,
  ): Promise<QueueModel> {
    const queue = await this.queueService.getQueue(queueId);
    if (queue === undefined) {
      throw new NotFoundException();
    }
    queue.notes = body.notes;
    queue.allowQuestions = body.allowQuestions;
    try {
      await queue.save();
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.queueController.saveQueue,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return queue;
  }
```
