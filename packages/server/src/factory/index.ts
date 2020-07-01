import { QuestionType, Role } from "@template/common";
import { Factory } from "typeorm-factory";
import { CourseModel } from "../entity/CourseModel";
import { DesktopNotifModel } from "../entity/DesktopNotifModel";
import { PhoneNotifModel } from "../entity/PhoneNotifModel";
import { QuestionModel } from "../entity/QuestionModel";
import { QueueModel } from "../entity/QueueModel";
import { SemesterModel } from "../entity/SemesterModel";
import { UserCourseModel } from "../entity/UserCourseModel";
import { UserModel } from "../entity/UserModel";

export const UserFactory = new Factory(UserModel)
  .sequence("username", (i) => `user${i}`)
  .sequence("email", (i) => `user${i}@neu.edu`)
  .sequence("name", (i) => `John Doe the ${i}th`)
  .sequence("photoURL", (i) => `https://pics/${i}`);

export const StudentCourseFactory = new Factory(UserCourseModel).attr(
  "role",
  Role.STUDENT
);

export const TACourseFactory = new Factory(UserCourseModel).attr(
  "role",
  Role.TA
);

export const SemesterFactory = new Factory(SemesterModel)
  .attr("season", "Fall")
  .attr("year", 2020);

export const CourseFactory = new Factory(CourseModel)
  .attr("name", "CS 2500")
  .attr("icalURL", "hi.com")
  .assocOne("semester", SemesterFactory);

export const UserCourseFactory = new Factory(UserCourseModel)
  .assocOne("user", UserFactory)
  .assocOne("course", CourseFactory)
  .attr("role", Role.STUDENT);

export const QueueFactory = new Factory(QueueModel)
  .sequence("room", (i) => `WVH ${i}`)
  .assocOne("course", CourseFactory);

export const QuestionFactory = new Factory(QuestionModel)
  .sequence("text", (i) => `question ${i}`)
  .attr("status", "Queued")
  .attr("questionType", QuestionType.Other)
  .assocOne("queue", QueueFactory)
  .assocOne("creator", UserFactory);

export const PhoneNotifFactory = new Factory(PhoneNotifModel).attr(
  "phoneNumber",
  "+12223334444"
);

export const DesktopNotifFactory = new Factory(DesktopNotifModel)
  .attr("endpoint", "gooooooogle.com")
  .attr("expirationTime", new Date(1836, 3, 6))
  .attr("p256dh", "some_key")
  .attr("auth", "keeeeeeey")
  .assocOne("user", UserFactory);
