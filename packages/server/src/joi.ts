import Joi from "@hapi/joi";
import { QuestionType } from "@template/common";

// type CoursePartial
export const CoursePartialSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string(),
});

// type OfficeHourBlock
export const OfficeHourBlockSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
  // course: CoursePartialSchema,
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
      role: Joi.string().valid("student", "ta", "professor"),
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
  questionType: Joi.string()
    .valid(...Object.values(QuestionType))
    .allow(null),
  status: Joi.string().valid(
    "Drafting",
    "Queued",
    "Helping",
    "Resolved",
    "Deferred",
    "No Show",
    "Deleted"
  ),
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
  // id: Joi.number(),
  name: Joi.string(),
  // semester: Joi.object({
  //   season: Joi.string().valid("Fall", "Spring", "Summer 1", "Summer 2"),
  //   year: Joi.number(),
  // }),
  officeHours: Joi.array().items(OfficeHourBlockSchema),
  // queues: Joi.array().items(QueueSchema),
});

export const CourseQueueSchema = Joi.array().items(
  Joi.object({
    id: Joi.number(),
    room: Joi.string(),
    staffList: Joi.array().items(UserPartialSchema),
    queueSize: Joi.number(),
    notes: Joi.string().optional(),
  })
);

export const NotifPayload = Joi.object({
  endpoint: Joi.string(),
  expirationTime: Joi.date().allow(null).optional(),
  keys: Joi.object({ p256dh: Joi.string(), auth: Joi.string() }),
});

export const QueueNotePayload = Joi.object({
  notes: Joi.string(),
});
