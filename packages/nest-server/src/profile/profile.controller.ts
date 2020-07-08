import { Controller, Get, Res, Query, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Connection } from 'typeorm';
import { User as UserModel } from './user.entity';
import { pick } from 'lodash';
import { GetProfileResponse } from '@template/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './user.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private connection: Connection, private jwtService: JwtService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(
    @User(['courses', 'courses.course']) user: UserModel,
  ): Promise<GetProfileResponse> {
    const courses = user.courses.map((userCourse) => {
      return {
        course: {
          id: userCourse.courseId,
          name: userCourse.course.name,
        },
        role: userCourse.role,
      };
    });

    const userResponse = pick(user, ['id', 'email', 'name', 'photoURL']);
    return { ...userResponse, courses };
  }

  // TODO handle the khoury flow for real.
  @Get('/entry')
  enterFromKhoury(@Res() res: Response, @Query('userId') userId: number): void {
    const token = this.jwtService.sign({ userId });
    res.cookie('auth_token', token).status(200).send();
  }
}
