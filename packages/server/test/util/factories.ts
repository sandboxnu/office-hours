import { QuestionType, Role } from '@template/common';
import { Factory } from 'typeorm-factory';
import { CourseModel } from '../../src/course/course.entity';
import { OfficeHourModel } from '../../src/course/office-hour.entity';
import { SemesterModel } from '../../src/course/semester.entity';
import { UserCourseModel } from '../../src/profile/user-course.entity';
import { UserModel } from '../../src/profile/user.entity';
import { QuestionModel } from '../../src/question/question.entity';
import { QueueModel } from '../../src/queue/queue.entity';

export const UserFactory = new Factory(UserModel)
  .attr('username', `user`)
  .attr('email', `user@neu.edu`)
  .attr('name', `User`)
  .attr('photoURL', `https://pics/user`);

export const StudentCourseFactory = new Factory(UserCourseModel).attr(
  'role',
  Role.STUDENT,
);

export const TACourseFactory = new Factory(UserCourseModel).attr(
  'role',
  Role.TA,
);

export const SemesterFactory = new Factory(SemesterModel)
  .attr('season', 'Fall')
  .attr('year', 2020);

export const ClosedOfficeHourFactory = new Factory(OfficeHourModel)
  .attr('title', 'Alex & Stanley')
  .attr('startTime', new Date('2020-05-20T14:00:00.000Z'))
  .attr('endTime', new Date('2020-05-20T15:30:00.000Z'));

export const OfficeHourFactory = new Factory(OfficeHourModel)
  .attr('title', 'Alex & Stanley')
  .attr('startTime', new Date(new Date().getTime() - 3600000))
  .attr('endTime', new Date(new Date().getTime() + 3600000));

export const CourseFactory = new Factory(CourseModel)
  .attr('name', 'CS 2500')
  .attr('icalURL', 'http://hi.com')
  .attr('enabled', true)
  .assocOne('semester', SemesterFactory)
  .assocMany('officeHours', OfficeHourFactory);

export const UserCourseFactory = new Factory(UserCourseModel)
  .assocOne('user', UserFactory)
  .assocOne('course', CourseFactory)
  .attr('role', Role.STUDENT);

export const QueueFactory = new Factory(QueueModel)
  .attr('room', `WVH 101`)
  .assocOne('course', CourseFactory)
  .assocMany('officeHours', OfficeHourFactory);

// WARNING: DO NOT USE CREATORID. AS YOU SEE HERE, WE ONLY ACCEPT CREATOR
//TODO: make it accept creatorId as well
export const QuestionFactory = new Factory(QuestionModel)
  .sequence('text', (i) => `question ${i}`)
  .attr('status', 'Queued')
  .attr('questionType', QuestionType.Other)
  .attr('createdAt', new Date())
  .assocOne('queue', QueueFactory)
  .assocOne('creator', UserFactory);
