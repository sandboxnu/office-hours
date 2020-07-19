import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetCourseResponse, QueuePartial, Role } from '@template/common';
import { Connection } from 'typeorm';
import { JwtAuthGuard } from '../profile/jwt-auth.guard';
import { UserCourseModel } from '../profile/user-course.entity';
import { User } from '../profile/user.decorator';
import { UserModel } from '../profile/user.entity';
import { QueueModel } from '../queue/queue.entity';
import { CourseModel } from './course.entity';

@Controller('courses')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class CourseController {
  constructor(private connection: Connection) {}

  @Get(':id')
  async get(@Param('id') id: number): Promise<GetCourseResponse> {
    return await CourseModel.findOne(id, {
      relations: ['officeHours', 'queues', 'queues.staffList'],
    });
  }

  @Post(':id/ta_location/:room')
  async checkIn(
    @Param('id') courseId: number,
    @Param('room') room: string,
    @User() user: UserModel,
  ): Promise<QueuePartial> {
    // TODO: think of a neat way to make this abstracted
    const isTAInCourse =
      (await UserCourseModel.count({
        where: {
          role: Role.TA,
          courseId: courseId,
          userId: user.id,
        },
      })) === 1;

    if (!isTAInCourse) {
      throw new UnauthorizedException(
        "Can't check in to office hours for a course you're not a TA of!",
      );
    }

    let queue = await QueueModel.findOne(
      {
        room,
        courseId,
      },
      { relations: ['staffList'] },
    );

    if (!queue) {
      queue = await QueueModel.create({
        room,
        courseId,
        staffList: [],
      }).save();
    }

    queue.staffList.push(user);
    await queue.save();

    return queue;
  }
}
