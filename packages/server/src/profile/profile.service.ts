import { KhouryProfCourse } from '@koh/common';
import { Injectable } from '@nestjs/common';
import {
  LastRegistrationModel,
  khourySemesterCodes,
} from 'login/last-registration-model.entity';
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

    const pendingCourses = [];

    for (const c of profCourses.sectionGroups) {
      // current semester does not match last time prof registered, there may be pending courses
      if (
        c.crns.length !== 0 &&
        !this.isSameRegistrationTime(
          c.semester,
          lastRegistered?.lastRegisteredSemester,
        )
      ) {
        const courseCRN = c.crns[0];
        const profCourse = await this.loginCourseService.courseCRNToCourse(
          courseCRN,
          c.semester,
        );
        if (!profCourse) pendingCourses.push(c);
      }
    }

    return pendingCourses;
  }

  // hacky way to check if two semester codes from Khoury have the same registration window
  private isSameRegistrationTime(semester1: string, semester2: string) {
    const year1 = Number(semester1.slice(0, 4));
    const year2 = Number(semester2.slice(0, 4));
    const semesterCode1 = semester1.slice(-2);
    const semesterCode2 = semester2.slice(-2);
    const summer1 = khourySemesterCodes['Summer_1'];
    const summerFull = khourySemesterCodes['Summer_Full'];
    // we want to treat Summer 1 and Summer Full as the same window
    // for profs to register classes for both at the same time
    if (
      (semesterCode1 === summer1 || semesterCode2 === summer1) &&
      (semesterCode1 === summerFull || semesterCode2 === summerFull)
    ) {
      return year1 === year2;
    }
    return semester1 === semester2;
  }
}
