
import { QuestionType, Role } from "@template/common";
import { Factory } from "typeorm-factory";
import { Course } from "../../src/course/course.entity";
import { Question } from "../../src/question/question.entity";
import { Queue } from "../../src/queue/queue.entity";
import { Semester } from "../../src/course/semester.entity";
import { UserCourse } from "../../src/profile/user-course.entity";
import { User } from "../../src/profile/user.entity";
import { OfficeHour } from "../../src/course/office-hour.entity";

export const UserFactory = new Factory(User)
  .sequence("username", (i) => `user${i}`)
  .sequence("email", (i) => `user${i}@neu.edu`)
  .sequence("name", (i) => `John Doe the ${i}th`)
  .sequence("photoURL", (i) => `https://pics/${i}`);

export const StudentCourseFactory = new Factory(UserCourse).attr(
  "role",
  Role.STUDENT
);

export const TACourseFactory = new Factory(UserCourse).attr(
  "role",
  Role.TA
);

export const SemesterFactory = new Factory(Semester)
  .attr("season", "Fall")
  .attr("year", 2020);

export const OfficeHourFactory = new Factory(OfficeHour)
  .attr('title', 'Alex & Stanley')
  .attr('room', 'WVH 101')
  .attr('startTime', new Date(2020, 4, 20, 10, 0, 0))
  .attr('endTime', new Date(2020, 4, 20, 11, 30, 0))

export const CourseFactory = new Factory(Course)
  .attr("name", "CS 2500")
  .attr("icalURL", "hi.com")
  .assocOne("semester", SemesterFactory)
  .assocMany('officeHours', OfficeHourFactory)

export const UserCourseFactory = new Factory(UserCourse)
  .assocOne("user", UserFactory)
  .assocOne("course", CourseFactory)
  .attr("role", Role.STUDENT);

export const QueueFactory = new Factory(Queue)
  .sequence("room", (i) => `WVH ${i}`)
  .assocOne("course", CourseFactory);

export const QuestionFactory = new Factory(Question)
  .sequence("text", (i) => `question ${i}`)
  .attr("status", "Queued")
  .attr("questionType", QuestionType.Other)
  .attr("createdAt", new Date(2020, 2, 1))
  .assocOne("queue", QueueFactory)
  .assocOne("creator", UserFactory);
