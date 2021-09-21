import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { UserModel } from 'profile/user.entity';
import { QueueModel } from '../queue/queue.entity';

export const QueueRole = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const queue = await QueueModel.findOne(request.params.queueId);
    const courseId = queue?.courseId;
    const user = await UserModel.findOne(request.user.userId, {
      relations: ['courses'],
    });

    const userCourse = user.courses.find((course) => {
      return Number(course.courseId) === Number(courseId);
    });

    if (!userCourse) {
      throw new NotFoundException(
        "cannot read propery 'role ' of undefined on user: " + user.id + user,
      );
    }
    return userCourse.role;
  },
);
