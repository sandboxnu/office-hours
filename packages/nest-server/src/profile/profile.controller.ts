import { Controller, Get } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from './user.entity';
import { pick } from 'lodash';
import { GetProfileResponse } from '@template/common';

@Controller('profile')
export class ProfileController {
  constructor(private connection: Connection) {}

  @Get()
  async testing(): Promise<GetProfileResponse> {
    const user = await User.findOne(1, {
      relations: ['courses', 'courses.course'],
    });

    const courses = user.courses.map((userCourse) => {
      return {
        course: {
          id: userCourse.courseId,
          name: userCourse.course.name,
        },
        role: userCourse.role,
      };
    });

    const userResponse = pick(user, [
      'id',
      'email',
      'name',
      'photoURL',
      'courses',
    ]);
    return { ...userResponse, courses };
  }
}
