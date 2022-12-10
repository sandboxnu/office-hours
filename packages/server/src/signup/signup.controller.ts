import { UBCOuserParam } from '@koh/common';
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserModel } from 'profile/user.entity';
import { SignupService } from './signup.service';
import { CourseModel } from 'course/course.entity';

@Controller('signup')
export class SignupController {
  constructor(private signupService: SignupService) {}
  //for usercourse testing
  @Post('/ubc_usercourse')
  async insertUsercourse(
    @Req() req: Request,
    @Res() res: Response,
    @Body('courses') courseId: any,
    @Body('userId') id: number,
  ): Promise<any> {
    this.signupService.insertUserCourse(courseId, id);
  }

  @Post('/ubc_signup')
  async receiveDataFromSignup(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: UBCOuserParam,
  ): Promise<any> {
    const user = await UserModel.findOne({
      where: { email: body.email },
    });
    if (user) {
      res.status(300).send({ message: 'User already exists' });
      console.log('user exists');
      return 'exists';
    }
    const courses = [];
    body.selected_course.forEach((course) => {
      courses.push(
        CourseModel.findOne({
          where: { name: course },
        }),
      );
    });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(body.password, salt);
      const user1 = await UserModel.create({
        courses: courses,
        email: body.email,
        firstName: body.first_name,
        lastName: body.last_name,
        sid: body.sid,
        password: password,
        hideInsights: [],
      }).save();
      // insert student's courses into user course table
      await this.signupService.insertUserCourse(body.selected_course, user1.id);
      res.status(200).send({ message: 'User has been signed up' });
      return 'success';
    }
  }
}
