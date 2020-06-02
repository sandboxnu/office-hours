import Joi from "@hapi/joi";
import { courseRoutes } from "./api/courseRoutes";

// type CoursePartial
export const CoursePartialSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string(),
});

// type OfficeHourBlock
export const OfficeHourBlockSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
  course: CoursePartialSchema,
  room: Joi.string(),
  startTime: Joi.date(),
  endTime: Joi.date(),
});

// type User
export const UserSchema = Joi.object({
  id: Joi.number(),
  email: Joi.string(),
  name: Joi.string(),
  photoURL: Joi.string().allow(null),
  courses: Joi.array().items(
    Joi.object({
      course: Joi.object({
        id: Joi.number(),
        name: Joi.string(),
      }),
      role: Joi.string(),
    })
  ),
});

// type UserPartial
export const UserPartialSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string(),
  photoURL: Joi.string().allow(null),
});

// type Question
export const QuestionSchema = Joi.object({
  id: Joi.number(),
  creator: UserPartialSchema,
  text: Joi.string().allow(null),
  taHelped: UserPartialSchema.allow(null),
  createdAt: Joi.date(),
  helpedAt: Joi.date().allow(null),
  closedAt: Joi.date().allow(null),
  questionType: Joi.string().allow(null),
  status: Joi.string(),
});

// type Queue
export const QueueSchema = Joi.object({
  id: Joi.number(),
  course: CoursePartialSchema,
  room: Joi.string(),
  createdAt: Joi.date(),
  closedAt: Joi.date().allow(null),
  staffList: Joi.array().items(UserPartialSchema),
  questions: Joi.array().items(QuestionSchema),
});

// type Course
export const CourseSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string(),
  semester: Joi.object({
    season: Joi.string(),
    year: Joi.number(),
  }),
  officeHours: Joi.array().items(OfficeHourBlockSchema),
  queues: Joi.array().items(QueueSchema),
});
