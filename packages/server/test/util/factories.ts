import { QuestionType, Role } from '@template/common';
import { Factory } from 'typeorm-factory';
import { CourseModel } from '../../src/course/course.entity';
import { QuestionModel } from '../../src/question/question.entity';
import { QueueModel } from '../../src/queue/queue.entity';
import { SemesterModel } from '../../src/course/semester.entity';
import { UserCourseModel } from '../../src/profile/user-course.entity';
import { UserModel } from '../../src/profile/user.entity';
import { OfficeHourModel } from '../../src/course/office-hour.entity';

export const UserFactory = new Factory(UserModel)
  .sequence('username', (i) => `user${i}`)
  .sequence('email', (i) => `user${i}@neu.edu`)
  .sequence('name', (i) => `John Doe the ${i}th`)
  .sequence('photoURL', (i) => `https://pics/${i}`);

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

export const OfficeHourFactory = new Factory(OfficeHourModel)
  .attr('title', 'Alex & Stanley')
  .attr('room', 'WVH 101')
  .attr('startTime', new Date(2020, 4, 20, 10, 0, 0))
  .attr('endTime', new Date(2020, 4, 20, 11, 30, 0));

export const CourseFactory = new Factory(CourseModel)
  .attr('name', 'CS 2500')
  .attr('icalURL', 'hi.com')
  .assocOne('semester', SemesterFactory)
  .assocMany('officeHours', OfficeHourFactory);

export const UserCourseFactory = new Factory(UserCourseModel)
  .assocOne('user', UserFactory)
  .assocOne('course', CourseFactory)
  .attr('role', Role.STUDENT);

export const QueueFactory = new Factory(QueueModel)
  .sequence('room', (i) => `WVH ${i}`)
  .assocOne('course', CourseFactory);

export const QuestionFactory = new Factory(QuestionModel)
  .sequence('text', (i) => `question ${i}`)
  .attr('status', 'Queued')
  .attr('questionType', QuestionType.Other)
  .attr('createdAt', new Date(2020, 2, 1))
  .assocOne('queue', QueueFactory)
  .assocOne('creator', UserFactory);
