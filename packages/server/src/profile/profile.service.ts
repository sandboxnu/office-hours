import { KhouryProfCourse, QuestionStatusKeys } from '@koh/common';
import { Injectable } from '@nestjs/common';
import {
  LastRegistrationModel,
  khourySemesterCodes,
} from 'login/last-registration-model.entity';
import { LoginCourseService } from 'login/login-course.service';
import { ProfSectionGroupsModel } from 'login/prof-section-groups.entity';
import { Connection } from 'typeorm';
import { UserModel } from './user.entity';
import { QuestionModel } from 'question/question.entity';
import nodemailer from 'nodemailer';
@Injectable()
export class ProfileService {
  constructor(
    private connection: Connection,
    private loginCourseService: LoginCourseService,
  ) {}
  public async mail(url: string, receiver: string): Promise<void> {
    // const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'ca9b9cce379050',
        pass: '8f86e600f1db47',
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'lilsus267111@gmail.com', // sender address
      to: receiver, // list of receivers
      subject: 'Your email reset link', // Subject line
      text: url, // plain text body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  public async inQueue(user: UserModel): Promise<boolean> {
    const question = await QuestionModel.findOne({
      where: {
        creatorId: user.id,
      },
    });
    if (question) {
      if (question.status === QuestionStatusKeys.Queued) {
        return true;
      }
      return false;
    }
    return false;
  }
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
    const lastRegisteredSemester = lastRegistered?.lastRegisteredSemester;

    if (!profCourses) return; // not a professor

    const pendingCourses = [];

    for (const c of profCourses.sectionGroups) {
      // current semester does not match last time prof registered, there may be pending courses
      if (
        c.crns.length !== 0 &&
        (!lastRegisteredSemester || // lastRegistered doesnt exist if prof has never registered before
          !this.isSameRegistrationTime(c.semester, lastRegisteredSemester))
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
