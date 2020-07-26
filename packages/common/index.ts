import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import "reflect-metadata";

export enum WSMessageType {
  Count = "count",
  Refresh = "ref",
}

/////////////////////////
// API Base Data Types //
/////////////////////////

// NOTE: These are not the DB data types. They are only used for the api

/**
 * Represents a user.
 * @param id - The unique id of the user in our db.
 * @param email - The email string of the user if they provide it (nullable)
 * @param name - The full name of this user: First Last.
 * @param photoURL - The URL string of this user photo. This is pulled from the admin site
 * @param courses - The list of courses that the user is accociated with (as either a 'student', 'ta' or 'professor')
 */
export type User = {
  id: number;
  email: string;
  name: string;
  photoURL: string;
  courses: UserCourse[];
  desktopNotifsEnabled: boolean;
  phoneNotifsEnabled: boolean;
  phoneNumber: string;
};

/**
 * Contains the partial user info needed by the frontend when nested in a response
 * @param id - The unique id of the user in our db.
 * @param name - The full name of this user: First Last.
 * @param photoURL - The URL string of this user photo. This is pulled from the admin site
 */
export type UserPartial = {
  id: number;
  email: string;
  name: string;
  photoURL?: string;
};

/**
 * Represents a course in the context of office hours.
 * @param id - The id number of this Course.
 * @param name - The subject and course number of this course. Ex: "CS 2500"
 * @param semester - The semester of this course.
 * @param officeHours - The list of office hours associated with the course.
 * @param queues - The queue id associated with this office hour.
 */
export type Course = {
  id: number;
  name: string;
  semester: Semester;
  officeHours: OfficeHourBlock[];
  queues: Queue[];
};

/**
 * Represents a partial course data needed on the front end when nested in a response.
 * @param id - The id number of this Course.
 * @param name - The subject and course number of this course. Ex: "CS 2500"
 */
export type CoursePartial = {
  id: number;
  name: string;
};

/**
 * Represents a course that a user is accociated with and their role in that course
 * @param course - The course the user accociated with.
 * @param role - The user's role in the course.
 */
export type UserCourse = {
  course: CoursePartial;
  role: Role;
};

/**
 * Represents one of three possible user roles in a course.
 */
export enum Role {
  STUDENT = "student",
  TA = "ta",
  PROFESSOR = "professor",
}

/**
 * Represents an Office Hour block as assigned on the course calendar.
 * @param id - The id number of this office hour.
 * @param title - The title of the event as it show in the google calender.
 * @param course - The course this office hour supports.
 * @param room - The room string where this office hour is taking place.
 * @param startTime - The date string for the start time of this office hour block. Ex: "2019-09-21T12:00:00-04:00"
 * @param endTime - The date string for the end time of this office hour block.
 */
interface OfficeHourBlock {
  id: number;
  title: string;
  course: CoursePartial;
  room: string; // if not in person set to string "online"
  startTime: string;
  endTime: string;
}

/**
 * A Queue that students can join with thier tickets.
 * @param id - The unique id number for a Queue.
 * @param course - The course that this office hours queue is for.
 * @param room - The full name of the building + room # that the current office hours queue is in.
 * @param createdAt - The date string for the opened on time (aka created on time) of this queue of this queue. Ex: "2019-09-21T12:00:00-04:00"
 * @param closedAt - The date string for the the closed on time for the queue.
 * @param staffList - The list of TA user's that are currently helping at office hours.
 * @param questions - The list of the students questions assocaited with the queue.
 */
export interface Queue {
  id: number;
  course: CoursePartial;
  room: string;
  createdAt: Date;
  closedAt?: Date;
  staffList: UserPartial[];
  questions: Question[];
}

/**
 * A Queue partial to be shown on the today page.
 * @param id - The unique id number for a Queue.
 * @param room - The full name of the building + room # that the current office hours queue is in.
 * @param staffList - The list of TA user's that are currently helping at office hours.
 */
export interface QueuePartial {
  id: number;
  room: string;
  staffList: UserPartial[];
  queueSize: number;
  notes?: string;
  // TODO: Add wait time?
}

/**
 * A Question is created when a student wants help from a TA.
 * @param id - The unique id number for a student question.
 * @param creator - The Student that has created the question.
 * @param text - The text descritipn of what he/she needs help with.
 * @param createdAt - The date string for the time that the Ticket was created. Ex: "2020-09-12T12:00:00-04:00"
 * @param helpedAt - The date string for the time that the TA began helping the Student.
 * @param closedAt - The date string for the time that the TA finished helping the Student.
 * @param questionType - The question type helps distinguish question for TA's and data insights.
 * @param status - The current status of the question in the queue.
 * @param position - The current position of this question in the queue.
 */
export type Question = {
  id: number;
  creator: UserPartial;
  text?: string;
  taHelped?: UserPartial;
  createdAt: Date; // TODO: remove this field, frontend doesn't need it
  helpedAt?: Date;
  closedAt?: Date;
  questionType?: QuestionType;
  status: QuestionStatus;
  location?: string;
  isOnline?: boolean;
};

// Question Types
export enum QuestionType {
  Concept = "Concept",
  Clarification = "Clarification",
  Testing = "Testing",
  Bug = "Bug",
  Setup = "Setup",
  Other = "Other",
}

// TODO: See if we want to do it this way later
// export type QuestionStatus =
//   | {
//       type: QuestionStatusType.Open;
//       status: OpenQuestionStatus;
//     }
//   | {
//       type: QuestionStatusType.Closed;
//       status: ClosedQuestionStatus;
//     };

// export enum QuestionStatusType {
//   Open = "Open",
//   Closed = "Closed",
// }

export enum OpenQuestionStatus {
  Drafting = "Drafting",
  Queued = "Queued",
  Helping = "Helping",
}

export enum ClosedQuestionStatus {
  Resolved = "Resolved",
  Deferred = "Deferred",
  NoShow = "NoShow",
  Deleted = "Deleted",
  Stale = "Stale",
}

// Ticket Status - Represents a given status of as student's ticket
export type QuestionStatus = keyof typeof QuestionStatusKeys;
// an Enum-like constant that contains all the statuses for convenience.
export const QuestionStatusKeys = {
  ...OpenQuestionStatus,
  ...ClosedQuestionStatus,
};

/**
 * A Semester object, representing a schedule semester term for the purposes of a course.
 * @param season - The season of this semester.
 * @param year - The year of this semester.
 */
interface Semester {
  season: Season;
  year: number;
}

/**
 * Represents one of the seasons in which a course can take place.
 */
export type Season = "Fall" | "Spring" | "Summer 1" | "Summer 2";

export type DesktopNotifBody = {
  endpoint: string;
  expirationTime?: Date;
  keys: {
    p256dh: string;
    auth: string;
  };
};

export type PhoneNotifBody = {
  phoneNumber: string;
};

// =================== API Route Types ===========================
// On backend, validated with https://docs.nestjs.com/techniques/validation
// API route Params and Responses

// Office Hours Response Types
export type GetProfileResponse = User;

export class UpdateProfileParams {
  @IsBoolean()
  @IsOptional()
  desktopNotifsEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  phoneNotifsEnabled?: boolean;

  @ValidateIf((o) => o.phoneNotifsEnabled)
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string;
}

// export type GetCourseResponse = Course;

export interface GetCourseResponse {
  id: number;
  name: string;
  officeHours: Array<{
    id: number;
    title: string;
    room: string;
    startTime: Date;
    endTime: Date;
  }>;
  queues: QueuePartial[];
}

export type GetQueueResponse = QueuePartial;

export type GetCourseQueuesResponse = QueuePartial[];

export type ListQuestionsResponse = Question[];

export type GetQuestionResponse = Question;

export class CreateQuestionParams {
  @IsString()
  text!: string;

  @IsEnum(QuestionType)
  questionType!: QuestionType;

  @IsInt()
  queueId!: number;

  @IsBoolean()
  @IsOptional()
  isOnline?: boolean;

  @IsString()
  @IsOptional()
  location?: string;
}
export type CreateQuestionResponse = Question;

export class UpdateQuestionParams {
  @IsString()
  @IsOptional()
  text?: string;

  @IsEnum(QuestionType)
  @IsOptional()
  questionType?: QuestionType;

  @IsInt()
  @IsOptional()
  queueId?: number;

  @IsEnum(QuestionStatusKeys)
  @IsOptional()
  status?: QuestionStatus;

  @IsBoolean()
  @IsOptional()
  isOnline?: boolean;

  @IsString()
  @IsOptional()
  location?: string;
}
export type UpdateQuestionResponse = Question;

export type TAUpdateStatusResponse = QueuePartial;
export type QueueNotePayloadType = {
  notes: string;
};

export class UpdateQueueNotesParams {
  @IsString()
  notes!: string;
}

export interface TwilioBody {
  ToCountry: string;
  ToState: string;
  SmsMessageSid: string;
  NumMedia: string;
  ToCity: string;
  FromZip: string;
  SmsSid: string;
  FromState: string;
  SmsStatus: string;
  FromCity: string;
  Body: string;
  FromCountry: string;
  To: string;
  ToZip: string;
  NumSegments: string;
  MessageSid: string;
  AccountSid: string;
  From: string;
  ApiVersion: string;
}
