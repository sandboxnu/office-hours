import { UBCOuserParam } from '@koh/common';
import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  //UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import { ConfigService } from '@nestjs/config';
// import * as Sentry from '@sentry/node';
// import async from 'async';
// import { CourseModel } from 'course/course.entity';
// import { User } from 'decorators/user.decorator';
import { Request, Response } from 'express';
//import * as httpSignature from 'http-signature';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserCourseModel } from 'profile/user-course.entity';
import { UserModel } from 'profile/user.entity';
// import { BulkCountryUpdatePage } from 'twilio/lib/rest/voice/v1/dialingPermissions/bulkCountryUpdate';
//import { Connection } from 'typeorm';
import { NonProductionGuard } from '../guards/non-production.guard';
import { SignupService } from './signup.service';
// import { AnyAaaaRecord } from 'dns';
@Controller('signup')
@UseGuards(NonProductionGuard)
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
    console.log(body);
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(body.password, salt);
      const user1 = await UserModel.create({
        courses: body.selected_course,
        email: body.email,
        firstName: body.first_name,
        lastName: body.last_name,
        sid: body.sid,
        password: password,
        hideInsights: [],
      }).save();
      // insert student's courses into user course table
      await this.signupService.insertUserCourse(body.selected_course, user1.id);
    } else {
      res.status(400).send({ message: 'User already exists' });
    }
  }
}
