
import { QuestionType, Role } from "@template/common";
import { Factory } from "typeorm-factory";
import { Course } from "../course/course.entity";
import { Question } from "../question/question.entity";
import { Queue } from "../queue/queue.entity";
import { Semester } from "../course/semester.entity";
import { UserCourse } from "../profile/user-course.entity";
import { User } from "../profile/user.entity";

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

export const CourseFactory = new Factory(Course)
  .attr("name", "CS 2500")
  .attr("icalURL", "hi.com")
  .assocOne("semester", SemesterFactory);

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
  .assocOne("queue", QueueFactory)
  .assocOne("creator", UserFactory);
