import { KhouryProfCourse } from '@koh/common';
import { Injectable } from '@nestjs/common';
import { LastRegistrationModel } from 'login/last-registration-model.entity';
import { LoginCourseService } from 'login/login-course.service';
import { ProfSectionGroupsModel } from 'login/prof-section-groups.entity';
import { Connection } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    private connection: Connection,
    private loginCourseService: LoginCourseService,
  ) {}

  public async getPendingCourses(userId: number): Promise<KhouryProfCourse[]> {
    const profCourses = await ProfSectionGroupsModel.findOne({
      where: {
        profId: userId,
      },
    });
    const lastRegistered = await LastRegistrationModel.findOne({
      where: {
        profId: userId,
      },
    });

    if (!profCourses) return; // not a professor

    const profCourseSem =
      profCourses.sectionGroups[0] && profCourses.sectionGroups[0].semester;

    const pendingCourses = [];

    if (lastRegistered?.lastRegisteredSemester !== profCourseSem) {
      // current semester does not match last time prof registered, there may be pending courses
      for (const c of profCourses.sectionGroups) {
        if (c.crns.length !== 0) {
          const courseCRN = c.crns[0];
          const profCourse = await this.loginCourseService.courseCRNToCourse(
            courseCRN,
            c.semester,
          );
          if (!profCourse) pendingCourses.push(c);
        }
      }
    }
    return pendingCourses;
  }
}
