import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import "reflect-metadata";

export const PROD_URL = "https://khouryofficehours.com";
export const isProd = (): boolean =>
  process.env.DOMAIN === PROD_URL ||
  (typeof window !== "undefined" && window?.location?.origin === PROD_URL);

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
 * @param desktopNotifs - list of endpoints so that frontend can figure out if device is enabled
 */
export class User {
  id!: number;
  email!: string;
  name!: string;
  photoURL!: string;
  courses!: UserCourse[];
  desktopNotifsEnabled!: boolean;

  @Type(() => DesktopNotifPartial)
  desktopNotifs!: DesktopNotifPartial[];

  phoneNotifsEnabled!: boolean;
  phoneNumber!: string;
}

export class DesktopNotifPartial {
  id!: number;
  endpoint!: string;
  name?: string;
  @Type(() => Date)
  createdAt!: Date;
}

/**
 * Contains the partial user info needed by the frontend when nested in a response
 * @param id - The unique id of the user in our db.
 * @param name - The full name of this user: First Last.
 * @param photoURL - The URL string of this user photo. This is pulled from the admin site
 */
export class UserPartial {
  id!: number;
  email?: string;
  name?: string;
  photoURL?: string;
}

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

class OfficeHourPartial {
  id!: number;
  title!: string;

  @Type(() => Date)
  startTime!: Date;

  @Type(() => Date)
  endTime!: Date;
}

/**
 * A Queue that students can join with thier tickets.
 * @param id - The unique id number for a Queue.
 * @param course - The course that this office hours queue is for.
 * @param room - The full name of the building + room # that the current office hours queue is in.
 * @param staffList - The list of TA user's that are currently helping at office hours.
 * @param questions - The list of the students questions assocaited with the queue.
 * @param startTime - The scheduled start time of this queue based on the parsed ical.
 * @param endTime - The scheduled end time of this queue.
 */
export interface Queue {
  id: number;
  course: CoursePartial;
  room: string;
  staffList: UserPartial[];
  questions: Question[];
  startTime?: Date;
  endTime?: Date;
  allowQuestions: boolean;
}

/**
 * A Queue partial to be shown on the today page.
 * @param id - The unique id number for a Queue.
 * @param room - The full name of the building + room # that the current office hours queue is in.
 * @param staffList - The list of TA user's that are currently helping at office hours.
 * @param startTime - The scheduled start time of this queue based on the parsed ical.
 * @param endTime - The scheduled end time of this queue.
 */
export class QueuePartial {
  id!: number;
  room!: string;

  @Type(() => UserPartial)
  staffList!: UserPartial[];

  queueSize!: number;
  notes?: string;
  isOpen!: boolean;

  @Type(() => Date)
  startTime?: Date;

  @Type(() => Date)
  endTime?: Date;

  allowQuestions!: boolean;
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
 * @param location - The location of the particular student, to help TA's find them
 * @param isOnline - Wether or not the question will helped online or in-person
 */
export class Question {
  id!: number;

  @Type(() => UserPartial)
  creator!: UserPartial;
  text?: string;

  @Type(() => UserPartial)
  taHelped?: UserPartial;

  @Type(() => Date)
  createdAt!: Date;

  @Type(() => Date)
  helpedAt?: Date;

  @Type(() => Date)
  closedAt?: Date;
  questionType?: QuestionType;
  status!: QuestionStatus;
  location?: string;
  isOnline?: boolean;
}

// Question Types
export enum QuestionType {
  Concept = "Concept",
  Clarification = "Clarification",
  Testing = "Testing",
  Bug = "Bug",
  Setup = "Setup",
  Other = "Other",
}

export enum OpenQuestionStatus {
  Drafting = "Drafting",
  Queued = "Queued",
  Helping = "Helping",
  CantFind = "CantFind",
  TADeleted = "TADeleted",
}

export enum ClosedQuestionStatus {
  Resolved = "Resolved",
  Deferred = "Deferred",
  ConfirmedDeleted = "ConfirmedDeleted",
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
  expirationTime?: number;
  keys: {
    p256dh: string;
    auth: string;
  };
  name?: string;
};

export type PhoneNotifBody = {
  phoneNumber: string;
};

// =================== API Route Types ===========================
// On backend, validated with https://docs.nestjs.com/techniques/validation
// API route Params and Responses

// Office Hours Response Types
export class GetProfileResponse extends User {}

export class KhouryDataParams {
  @IsString()
  email!: string;

  @IsString()
  first_name!: string;

  @IsString()
  last_name!: string;

  @IsInt()
  campus!: string;

  @IsOptional()
  @IsString()
  photo_url!: string;

  @IsOptional()
  @IsDefined() // TODO: use ValidateNested instead, for some reason it's crunked
  courses!: KhouryStudentCourse[];

  @IsOptional()
  @IsDefined() // TODO: use ValidateNested instead, for some reason it's crunked
  ta_courses!: KhouryTACourse[];
}

export class KhouryStudentCourse {
  @IsInt()
  crn!: number;

  @IsString()
  course!: string;

  @IsBoolean()
  accelerated!: boolean;

  @IsInt()
  section!: number;

  @IsString()
  semester!: string;

  @IsString()
  title!: string;
}

export class KhouryTACourse {
  @IsString()
  course!: string;

  @IsString()
  semester!: string;
}

export interface KhouryRedirectResponse {
  redirect: string;
}

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

export class GetCourseResponse {
  id!: number;
  name!: string;

  @Type(() => OfficeHourPartial)
  officeHours!: Array<OfficeHourPartial>;

  @Type(() => QueuePartial)
  queues!: QueuePartial[];
}

export class GetQueueResponse extends QueuePartial {}

export class GetCourseQueuesResponse extends Array<QueuePartial> {}

export class ListQuestionsResponse extends Array<Question> {}

export class GetQuestionResponse extends Question {}

export class CreateQuestionParams {
  @IsString()
  text!: string;

  @IsEnum(QuestionType)
  @IsOptional()
  questionType?: QuestionType;

  @IsInt()
  queueId!: number;

  @IsBoolean()
  @IsOptional()
  isOnline?: boolean;

  @IsString()
  @IsOptional()
  location?: string;

  @IsBoolean()
  force!: boolean;
}
export class CreateQuestionResponse extends Question {}

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
export class UpdateQuestionResponse extends Question {}

export type TAUpdateStatusResponse = QueuePartial;
export type QueueNotePayloadType = {
  notes: string;
};

export class UpdateQueueParams {
  @IsString()
  @IsOptional()
  notes?: string;

  @IsBoolean()
  allowQuestions?: boolean;
}

export class SSEQueueResponse {
  queue?: GetQueueResponse;
  questions?: ListQuestionsResponse;
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

export interface GetReleaseNotesResponse {
  releaseNotes: unknown;
  lastUpdatedUnixTime: number;
}
