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

# create axios route example
  site_admin = {
    getCourses: async (): Promise<GetCourseResponse[]> =>
      this.req("GET", "/api/v1/site_admin/all_courses"),
    createCourse: async (body: createCourse): Promise<any> =>
      this.req("POST", `/api/v1/site_admin/course`, undefined, body),
    deleteCourse: async (cid: number): Promise<GetCourseResponse> =>
      this.req("DELETE", `/api/v1/site_admin/${cid}/deleteCourse`),
  };


Usage front end:
import { API } from "@koh/api-client";
      await API.site_admin.createCourse(body);
      message.success("Course added");