import { Controller, Get, Res, Query, Post, Body, UseGuards } from '@nestjs/common';
import { Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'profile/user.entity';
import { CourseModel } from 'course/course.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { Role, KhouryRedirectResponse, AdminDataParams } from '@template/common';
import { NonProductionGuard } from 'non-production.guard';
import { ConfigService } from '@nestjs/config';

@Controller() 
export class LoginController {
  constructor(private connection: Connection, private jwtService: JwtService, private configService: ConfigService) {}

  @Post('/khoury_login') 
  async recieveDataFromKhoury(@Body() body: AdminDataParams): Promise<KhouryRedirectResponse> {
    let user: UserModel;
    user = await UserModel.findOne({ where: { username: body.username }, relations: ['courses']});
    
    if (!user) {
      user = await UserModel.create(); // Q: will this work if we don't load the relations?
    }

    user = Object.assign(user, {
      email: body.email,
      name: body.first_name + body.last_name,
      photoURL: body.photo_url,  // We'll have to find away around this becuase the photo urls expire
    });

    const courseNameToUserCourse = async (name, role) => {
        const course = await CourseModel.findOne({
            where: { name: name },
          });
          if (course) { // assumes we already have the course in our db
            let userCourse: UserCourseModel;
            userCourse = await UserCourseModel.findOne({ where: { userId: user.id, courseId: course.id, role: role }})
            if (!userCourse) {
              userCourse = await UserCourseModel.create({userId: user.id, course: course, role: role}).save();  
            }
            return userCourse;
          }
    }

    const userCourses = [];
    Promise.all(
      body.courses.map(async el => {
          const userCourse = await courseNameToUserCourse(el.course_name, Role.STUDENT);
          userCourses.push(userCourse);
        }
    ));
    Promise.all(
        body.ta_courses.map(async el => {
            const taCourse = await courseNameToUserCourse(el.course_name, Role.TA);
            userCourses.push(taCourse);
          }
      ));
    user.courses = userCourses;
    user.save();

    // TODO: Add logic to do HMAP hash of the user's info
    return { redirect: this.configService.get('DOMAIN') + `/login/entry?userId=${user.id}` }
  }

  // This is the real admin entry point
  @Get('/login/entry')
  enterFromKhoury(@Res() res: Response, @Query('userId') userId: number): void {
    // TODO: Get HMAP hashing working 
    const token = this.jwtService.sign({ userId });
    res.cookie('auth_token', token).redirect(302, '/');
  }

  // This is for login on development only
  @Get('/profile/entry')
  @UseGuards(NonProductionGuard)
  enterFromDev(@Res() res: Response, @Query('userId') userId: number): void {
    const token = this.jwtService.sign({ userId });
    res.cookie('auth_token', token).redirect(302, '/');
  }
}
