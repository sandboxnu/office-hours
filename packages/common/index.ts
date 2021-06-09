import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import "reflect-metadata";

export const PROD_URL = "https://officehours.khoury.northeastern.edu";
export const STAGING_URL = "https://staging.khouryofficehours.com";
export const KHOURY_ADMIN_OAUTH_API_URL =
  "https://admin-alpha.khoury.northeastern.edu/api/oauth";
export const KHOURY_ADMIN_OAUTH_URL =
  "https://admin-alpha.khoury.northeastern.edu/oauth";
export const OAUTH_CLIENT_ID = "08a26d0c2c7ae8c4e166";
export const OAUTH_CLIENT_SECRET = "0WY0L7CCD6NN9PX5";
export const OAUTH_REDIRECT_URI = "http://localhost:3000/oauth";
export const OAUTH_SCOPES =
  "scopes=user.info&scopes=ta.info&scopes=student.info&scopes=student.courses&scopes=instructor.courses";

//export const OAUTH_USER_INFO_URI = "";
// Get domain. works on node and browser
const domain = (): string | false =>
  process.env.DOMAIN ||
  (typeof window !== "undefined" && window?.location?.origin);
export const getEnv = (): "production" | "staging" | "dev" => {
  switch (domain()) {
    case PROD_URL:
      return "production";
    case STAGING_URL:
      return "staging";
    default:
      return "dev";
  }
};
export const isProd = (): boolean => domain() === PROD_URL;

// TODO: Clean this up, move it somwhere else, use moment???
// a - b, in minutes
export function timeDiffInMins(a: Date, b: Date): number {
  return (a.getTime() - b.getTime()) / (1000 * 60);
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
 * @param desktopNotifs - list of endpoints so that frontend can figure out if device is enabled
 */
export class User {
  id!: number;
  email!: string;
  firstName?: string;
  lastName?: string;
  name!: string;
  photoURL!: string;
  courses!: UserCourse[];
  desktopNotifsEnabled!: boolean;
  @Type(() => DesktopNotifPartial)
  desktopNotifs!: DesktopNotifPartial[];
  phoneNotifsEnabled!: boolean;
  phoneNumber!: string;
  insights!: string[];
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

  isProfessorQueue!: boolean;
}

// Represents a list of office hours wait times of each hour of the week.
// The first element of the array is the wait time for the first hour of Sunday, UTC.
//   Users of the heatmap should rotate it according to their timezone.
// INVARIANT: Must have 24*7 elements
//
// Wait time = -1 represents no office hours data at that time.
export type Heatmap = Array<number>;

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
  PriorityQueued = "PriorityQueued",
}

/**
 * Limbo statuses are awaiting some confirmation from the student
 */
export enum LimboQuestionStatus {
  CantFind = "CantFind", // represents when a student can't be found by a TA
  ReQueueing = "ReQueueing", // represents when a TA wants to get back to a student later and give them the option to be put into the priority queue
  TADeleted = "TADeleted", // When a TA deletes a question for a multitude of reasons
}

export enum ClosedQuestionStatus {
  Resolved = "Resolved",
  DeletedDraft = "DeletedDraft",
  ConfirmedDeleted = "ConfirmedDeleted",
  Stale = "Stale",
}

export const StatusInQueue = [
  OpenQuestionStatus.Drafting,
  OpenQuestionStatus.Queued,
];

export const StatusInPriorityQueue = [OpenQuestionStatus.PriorityQueued];

export const StatusSentToCreator = [
  ...StatusInPriorityQueue,
  ...StatusInQueue,
  OpenQuestionStatus.Helping,
  LimboQuestionStatus.ReQueueing,
  LimboQuestionStatus.CantFind,
  LimboQuestionStatus.TADeleted,
];

// Ticket Status - Represents a given status of as student's ticket
export type QuestionStatus = keyof typeof QuestionStatusKeys;
// an Enum-like constant that contains all the statuses for convenience.
export const QuestionStatusKeys = {
  ...OpenQuestionStatus,
  ...ClosedQuestionStatus,
  ...LimboQuestionStatus,
};

// /**
//  * A Semester object, representing a schedule semester term for the purposes of a course.
//  * @param season - The season of this semester.
//  * @param year - The year of this semester.
//  */
// interface Semester {
//   season: Season;
//   year: number;
// }

/**
 * Represents one of the seasons in which a course can take place.
 */
export type Season =
  | "Fall"
  | "Spring"
  | "Summer_1"
  | "Summer_2"
  | "Summer_Full";

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

/**
 * @param access - represents an access token that can be used to get data from the Khoury Admin OAuth routes
 * @param refresh - represents a refresh token that can be used to get new access tokens once the access token expires
 */
export class OAuthAccessTokensResponse {
  @IsString()
  access!: string;

  @IsString()
  refresh!: string;
}

/**
 * @param access - represents an access token that can be used to get data from the Khoury Admin OAuth routes
 */
export class AccessToken {
  @IsString()
  access!: string;
}

/**
 * @param refresh - represents a refresh token that can be used to get new access tokens once the access token expires
 */
export class RefreshToken {
  @IsString()
  refresh!: string;
}

/**
 * @param code - represents the authorization code that can be used to request access/refresh tokens for a user from the OAuth server
 * @param verifier - represents the SHA-256 verifier that was passed in the initial OAuth flow
 */
export class OAuthAccessTokensRequest {
  @IsString()
  code!: string;

  @IsString()
  verifier!: string;
}

// TODO: Remove this model
export class OAuthUserInfoResponse {
  @IsString()
  firstName!: string;
  @IsString()
  lastName!: string;
  @IsString()
  email!: string;
  @IsInt()
  campus!: number;
  @IsArray()
  accountType!: string[];
  // add photo url
}

// TODO: Remove this model
export class OAuthTACourseModel {
  @IsString()
  course!: string;

  @IsString()
  semester!: string;

  @IsString()
  campus!: string;
}

// TODO: Remove this model
export class OAuthTaInfoResponse {
  @IsBoolean()
  isTa!: boolean;

  @IsArray()
  courses!: [OAuthTACourseModel];
}

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

  @IsString()
  @IsOptional()
  campus!: string;
}

export class KhouryTACourse {
  @IsString()
  course!: string;

  @IsString()
  semester!: string;

  @IsInt()
  @IsOptional()
  instructor!: number;
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

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}

export class GetCourseResponse {
  id!: number;
  name!: string;

  @Type(() => OfficeHourPartial)
  officeHours!: Array<OfficeHourPartial>;

  @Type(() => QueuePartial)
  queues!: QueuePartial[];

  heatmap!: Heatmap | false;
}

export class GetCourseOverridesRow {
  id!: number;
  role!: string;
  name!: string;
  email!: string;
}

export class GetCourseOverridesResponse {
  @Type(() => GetCourseOverridesRow)
  data!: GetCourseOverridesRow[];
}

export class UpdateCourseOverrideBody {
  @IsString()
  email!: string;

  @IsString()
  role!: Role;
}

export class UpdateCourseOverrideResponse extends GetCourseOverridesRow {}

export class GetQueueResponse extends QueuePartial {}

export class GetCourseQueuesResponse extends Array<QueuePartial> {}

export class ListQuestionsResponse {
  @Type(() => Question)
  yourQuestion?: Question;

  @Type(() => Question)
  questionsGettingHelp!: Array<Question>;

  @Type(() => Question)
  queue!: Array<Question>;

  @Type(() => Question)
  priorityQueue!: Array<Question>;
}

export class GetQuestionResponse extends Question {}

export class GetStudentQuestionResponse extends Question {
  @IsInt()
  queueId!: number;
}

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

export class TACheckoutResponse {
  // The ID of the queue we checked out of
  queueId!: number;
  canClearQueue!: boolean;

  @Type(() => Date)
  nextOfficeHourTime?: Date;
}

export class UpdateQueueParams {
  @IsString()
  @IsOptional()
  notes?: string;

  @IsBoolean()
  allowQuestions?: boolean;
}

export class TACheckinTimesResponse {
  @Type(() => TACheckinPair)
  taCheckinTimes!: TACheckinPair[];
}

export class TACheckinPair {
  @IsString()
  name!: string;

  @IsDate()
  @Type(() => Date)
  checkinTime!: Date;

  @IsDate()
  @Type(() => Date)
  checkoutTime?: Date;

  @IsBoolean()
  forced!: boolean;

  @IsBoolean()
  inProgress!: boolean;

  @IsNumber()
  numHelped!: number;
}

export enum AlertType {
  REPHRASE_QUESTION = "rephraseQuestion",
}

export class AlertPayload {}

export class Alert {
  @IsEnum(AlertType)
  alertType!: AlertType;

  @IsDate()
  sent!: Date;

  @Type(() => AlertPayload)
  payload!: AlertPayload;

  @IsInt()
  id!: number;
}

export class RephraseQuestionPayload extends AlertPayload {
  @IsInt()
  questionId!: number;

  @IsInt()
  queueId!: number;

  @IsInt()
  courseId!: number;
}

export class CreateAlertParams {
  @IsEnum(AlertType)
  alertType!: AlertType;

  @IsInt()
  courseId!: number;

  @IsObject()
  payload!: AlertPayload;

  @IsInt()
  targetUserId!: number;
}

export class CreateAlertResponse extends Alert {}

export class GetAlertsResponse {
  @Type(() => Alert)
  alerts!: Alert[];
}

export class SubmitCourseParams {
  @IsString()
  coordinator_email!: string;

  @IsString()
  name!: string;

  @IsArray()
  sections!: number[];

  @IsString()
  semester!: string;

  @IsString()
  timezone!: string;

  @IsString()
  icalURL!: string;

  @IsString()
  password!: string;
}

export class SemesterPartial {
  id!: number;
  season!: string;
  year!: number;
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

export type GetInsightOutputResponse = PossibleOutputTypes;

export type ListInsightsResponse = Record<string, InsightDisplayInfo>;

export type InsightDisplayInfo = {
  displayName: string;
  description: string;
  component: InsightComponent;
  size: "small" | "default";
};

export interface InsightObject {
  displayName: string;
  description: string;
  roles: Role[];
  component: InsightComponent;
  size: "default" | "small";
  compute: (insightFilters: any) => Promise<PossibleOutputTypes>;
}

export enum InsightComponent {
  SimpleDisplay = "SimpleDisplay",
  BarChart = "BarChart",
  SimpleTable = "SimpleTable",
}

export type PossibleOutputTypes =
  | SimpleDisplayOutputType
  | BarChartOutputType
  | SimpleTableOutputType;

export type SimpleDisplayOutputType = number | string;

export type BarChartOutputType = {
  data: StringMap<number>[];
  xField: string;
  yField: string;
  seriesField: string;
  xAxisName?: string;
  yAxisName?: string;
};

export type SimpleTableOutputType = {
  dataSource: StringMap<string>[];
  columns: StringMap<string>[];
};

export type StringMap<T> = {
  [key: string]: T;
};

export type DateRangeType = {
  start: string;
  end: string;
};

export const ERROR_MESSAGES = {
  courseController: {
    checkIn: {
      cannotCreateNewQueueIfNotProfessor:
        "You can't create a new queue if you're not a professor",
      cannotCheckIntoMultipleQueues:
        "Cannot check into multiple queues at the same time",
    },
    noUserFound: "No user found with given email",
    noSemesterFound: "No semester exists for the submitted course",
    invalidApplyURL:
      "You are unauthorized to submit an application. Please email help@khouryofficehours.com for the correct URL.",
  },
  questionController: {
    createQuestion: {
      invalidQueue: "Posted to an invalid queue",
      noNewQuestions: "Queue not allowing new questions",
      closedQueue: "Queue is closed",
      oneQuestionAtATime: "You can't create more than one question at a time.",
    },
    updateQuestion: {
      fsmViolation: (
        role: string,
        questionStatus: string,
        bodyStatus: string
      ): string =>
        `${role} cannot change status from ${questionStatus} to ${bodyStatus}`,
      taOnlyEditQuestionStatus: "TA/Professors can only edit question status",
      otherTAHelping: "Another TA is currently helping with this question",
      otherTAResolved: "Another TA has already resolved this question",
      taHelpingOther: "TA is already helping someone else",
      loginUserCantEdit: "Logged-in user does not have edit access",
    },
  },
  loginController: {
    receiveDataFromKhoury: "Invalid request signature",
    unableToGetAccessToken: "Unable to retrieve access token",
    unabletoRefreshAccessToken: "Unable to refresh access token",
    unabletToGetUserInfo: "Unable to get user data",
    unableToGetTaInfo: "Unable to get TA data",
    unableToGetInstructorCourses: "Unable to get instructor courses",
    unableToGetStudentCourses: "Unable to get student courses",
    officeHourUserDataError: "Unable to get a user's office hour account",
  },
  notificationController: {
    messageNotFromTwilio: "Message not from Twilio",
  },
  notificationService: {
    registerPhone: "phone number invalid",
  },
  questionRoleGuard: {
    questionNotFound: "Question not found",
    queueOfQuestionNotFound: "Cannot find queue of question",
    queueDoesNotExist: "This queue does not exist!",
  },
  queueRoleGuard: {
    queueNotFound: "Queue not found",
  },
  releaseNotesController: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    releaseNotesTime: (e: any): string =>
      "Error Parsing release notes time: " + e,
  },
  insightsController: {
    insightUnathorized: "User is not authorized to view this insight",
    insightNameNotFound: "The insight requested was not found",
  },
  roleGuard: {
    notLoggedIn: "Must be logged in",
    noCourseIdFound: "No courseid found",
    notInCourse: "Not In This Course",
    mustBeRoleToJoinCourse: (roles: string[]): string =>
      `You must have one of roles [${roles.join(", ")}] to access this course`,
  },
  profileController: {
    noDiskSpace:
      "There is no disk space left to store an image. Please immediately contact your course staff and let them know. They will contact the Khoury Office Hours team as soon as possible.",
  },
  alertController: {
    duplicateAlert: "This alert has already been sent",
    notActiveAlert: "This is not an alert that's open for the current user",
  },
};
