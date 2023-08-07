import { SiteAdminService } from './site-admin.service';
import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { createCourse } from '@koh/common';
import { CourseModel } from 'course/course.entity';
import { SemesterModel } from 'semester/semester.entity';

@Controller('site_admin')
@UseGuards(JwtAuthGuard)
export class SiteAdminController {
  constructor(private readonly adminService: SiteAdminService) {}

  @Post('/course')
  async addCourse(@Body() body: createCourse): Promise<any> {
    //Currently query by course name, in the future change to section group
    console.log(body);
    const course = await CourseModel.findOne({
      where: {
        name: body.name,
        // sectionGroupName: body.section
      },
    });
    if (course) {
      console.error('Already Registered');
      throw new HttpException('Already Registered', HttpStatus.NOT_FOUND);
    }
    const semester = await SemesterModel.findOne(body.semester);
    try {
      const course = await CourseModel.create({
        name: body.name,
        semesterId: body.semester,
        sectionGroupName: body.section,
        coordinator_email: body.coordinatorEmail || null,
        zoomLink: body.zoomLink || null,
        enabled: body.enabled,
        timezone: body.timezone,
        semester: semester,
      }).save();
      return course;
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Course create error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('all_courses')
  async getAllCourses(): Promise<CourseModel[]> {
    const courses = await CourseModel.find();
    if (courses === null || courses === undefined) {
      console.error('Can not find courses(admin)');
      throw new HttpException(
        'Can not find courses(admin)',
        HttpStatus.NOT_FOUND,
      );
    }
    return courses;
  }

  @Delete(':id/deleteCourse')
  async deleteQuestionType(@Param('id') cid: number): Promise<CourseModel> {
    const course = await CourseModel.findOne(cid);
    if (!course) {
      console.error('Course not found');
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    return course.softRemove();
  }
}
