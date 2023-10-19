import { UBCOuserParam } from '@koh/common';
import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserModel } from 'profile/user.entity';
import { SignupService } from './signup.service';
import { CourseModel } from 'course/course.entity';

@Controller('signup')
export class SignupController {
  constructor(private signupService: SignupService) {}
  //for usercourse testing
  // @Post('/ubc_usercourse')
  // async insertUsercourse(
  //   @Req() req: Request,
  //   @Res() res: Response,
  //   @Body('courses') courseId: any,
  //   @Body('userId') id: number,
  // ): Promise<any> {
  //   this.signupService.insertUserCourse(courseId, id);
  // }

  @Post('/ubc_signup')
  async receiveDataFromSignup(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: UBCOuserParam,
  ): Promise<any> {
    const course = await CourseModel.findOne(body.selected_course);

    if (!course) {
      throw new NotFoundException();
    }

    let user = await UserModel.findOne({
      where: { email: body.email },
      relations: ['courses'],
    });

    if (user) {
      res.status(409).send({ message: 'User already exists' });
      return 'exists';
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body.password, salt);

    user = await UserModel.create({
      courses: [],
      email: body.email,
      firstName: body.first_name,
      lastName: body.last_name,
      sid: body.sid,
      password: password,
      hideInsights: [],
    }).save();

    // insertUserCourse loops through given courseIds and create usercourse
    // it also eventually add the list of usercourses into both user and course models.
    await this.signupService.insertUserCourse(course, user);
    res.status(200).send({ message: 'User has been signed up' });
    return 'success';
  }
}
