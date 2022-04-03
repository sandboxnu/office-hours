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
  ValidateIf
} from "class-validator";
import "reflect-metadata";

export const PROD_URL = "https://officehours.khoury.northeastern.edu";
export const STAGING_URL = "https://staging.khouryofficehours.com";
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
  defaultMessage?: string;
  includeDefaultMessage!: boolean;
  courses!: UserCourse[];
  pendingCourses?: KhouryProfCourse[];
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
 * @param photoURL - The URL string of this user photo. This is pulled from the admin site.
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
  PROFESSOR = "professor"
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

  isDisabled!: boolean;

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
 * @param location - The location of the particular student, to help TA's find them.
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
  groupable!: boolean;
  status!: QuestionStatus;
  location?: string;
}

// Question Types
export enum QuestionType {
  Concept = "Concept",
  Clarification = "Clarification",
  Testing = "Testing",
  Bug = "Bug",
  Setup = "Setup",
  Other = "Other"
}

export enum OpenQuestionStatus {
  Drafting = "Drafting",
  Queued = "Queued",
  Helping = "Helping",
  PriorityQueued = "PriorityQueued"
}

/**
 * Limbo statuses are awaiting some confirmation from the student.
 */
export enum LimboQuestionStatus {
  CantFind = "CantFind", // represents when a student can't be found by a TA
  ReQueueing = "ReQueueing", // represents when a TA wants to get back to a student later and give them the option to be put into the priority queue
  TADeleted = "TADeleted" // When a TA deletes a question for a multitude of reasons
}

export enum ClosedQuestionStatus {
  Resolved = "Resolved",
  DeletedDraft = "DeletedDraft",
  ConfirmedDeleted = "ConfirmedDeleted",
  Stale = "Stale"
}

export const StatusInQueue = [
  OpenQuestionStatus.Drafting,
  OpenQuestionStatus.Queued
];

export const StatusInPriorityQueue = [OpenQuestionStatus.PriorityQueued];

export const StatusSentToCreator = [
  ...StatusInPriorityQueue,
  ...StatusInQueue,
  OpenQuestionStatus.Helping,
  LimboQuestionStatus.ReQueueing,
  LimboQuestionStatus.CantFind,
  LimboQuestionStatus.TADeleted
];

// Ticket Status - Represents a given status of as student's ticket
export type QuestionStatus = keyof typeof QuestionStatusKeys;
// an Enum-like constant that contains all the statuses for convenience.
export const QuestionStatusKeys = {
  ...OpenQuestionStatus,
  ...ClosedQuestionStatus,
  ...LimboQuestionStatus
};

export class QuestionGroup {
  @IsInt()
  id!: number;

  @Type(() => Question)
  questions!: Array<Question>;

  @Type(() => UserPartial)
  creator!: UserPartial;

  //Might want to add a list of students in group so they can be added without a question
}

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

export class KhouryDataParams {
  @IsString()
  email!: string;

  @IsString()
  first_name!: string;

  @IsString()
  last_name!: string;

  @IsInt()
  campus!: number;

  @IsOptional()
  @IsString()
  photo_url!: string;

  @IsOptional()
  @IsDefined() // TODO: use ValidateNested instead, for some reason it's crunked
  courses!: KhouryCourse[] | KhouryProfCourse[];
}

export class KhouryCourse {
  @IsInt()
  crn!: number;

  @IsString()
  semester!: string;

  @IsEnum(String)
  role!: "TA" | "Student";
}

export class KhouryProfCourse {
  // List of CRN's in the section group
  @IsArray()
  crns!: number[];

  @IsString()
  semester!: string;

  // Section group name
  @IsString()
  name!: string;
}

export function isKhouryCourse(
  c: KhouryCourse | KhouryProfCourse
): c is KhouryCourse {
  return (
    (c as KhouryCourse).role !== undefined &&
    (c as KhouryCourse).crn !== undefined
  );
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

  @ValidateIf(o => o.phoneNotifsEnabled)
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  defaultMessage?: string;

  @IsBoolean()
  @IsOptional()
  includeDefaultMessage?: boolean;
}

export class GetCourseResponse {
  id!: number;
  name!: string;

  @Type(() => OfficeHourPartial)
  officeHours!: Array<OfficeHourPartial>;

  @Type(() => QueuePartial)
  queues!: QueuePartial[];

  heatmap!: false; // TODO: Add this back in after queue refactor is done => Heatmap | false;
  coordinator_email!: string;

  selfEnroll!: boolean;
}

export class GetSelfEnrollResponse {
  courses!: CoursePartial[];
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

  @Type(() => QuestionGroup)
  groups!: Array<QuestionGroup>;

  @Type(() => AlertPayload)
  unresolvedAlerts?: Array<AlertPayload>;
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

  @IsBoolean()
  groupable!: boolean;

  @IsInt()
  queueId!: number;

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

  @IsBoolean()
  @IsOptional()
  groupable?: boolean;

  @IsInt()
  @IsOptional()
  queueId?: number;

  @IsEnum(QuestionStatusKeys)
  @IsOptional()
  status?: QuestionStatus;

  @IsString()
  @IsOptional()
  location?: string;
}
export class UpdateQuestionResponse extends Question {}

export class GroupQuestionsParams {
  @IsArray()
  @Type(() => Number)
  questionIds!: number[];

  @IsInt()
  queueId!: number;
}

export class ResolveGroupParams {
  @IsInt()
  queueId!: number;
}

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
  REPHRASE_QUESTION = "rephraseQuestion"
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

/**
 * Represents the parameters for a course being registered for register_courses endpoint.
 * @param sectionGroupName - The name of the section group.
 * @param name - user friendly display name entered by Prof
 * @param semester - The name of the semester.
 * @param iCalURL - The URL for the iCal calendar.
 * @param coordinator_email - The email for the course coordinator.
 * @param timezone - The timezone derived from the Campus field on the form.
 */
export class RegisterCourseParams {
  @IsString()
  sectionGroupName!: string;

  @IsString()
  name!: string;

  @IsString()
  iCalURL!: string;

  @IsString()
  coordinator_email!: string;

  @IsString()
  timezone!: string;
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
  SimpleTable = "SimpleTable"
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
      cannotCheckIntoMultipleQueues:
        "Cannot check into multiple queues at the same time"
    },
    courseAlreadyRegistered: "One or more of the courses is already registered",
    courseNotFound: "The course was not found",
    sectionGroupNotFound: "One or more of the section groups was not found",
    courseOfficeHourError: "Unable to find a course's office hours",
    courseHeatMapError: "Unable to get course's cached heatmap",
    courseModelError: "Course Model not found",
    noUserFound: "No user found with given email",
    noSemesterFound: "No semester exists for the submitted course",
    updatedQueueError: "Error updating a course queue",
    queuesNotFound: "Queues not found",
    queueNotFound: "Queue not found",
    queueAlreadyExists: "Queue already exists.",
    queueNotAuthorized: "Unable to join this professor queue as a TA",
    saveQueueError: "Unable to save queue",
    clearQueueError: "Unable to determine if queue can be cleared",
    createEventError: "An error occurred while creating an event",
    icalCalendarUpdate: "Unable to update calendar",
    checkInTime: "Unable to get TA check in times",
    removeCourse: "Error occurred while trying to remove a course",
    createCourse: "Error occurred while trying to create a course",
    updateCourse: "Error occurred while trying to update a course",
    createCourseMappings: "Unable to create a course mappings",
    updateProfLastRegistered:
      "Unable to update professor's last registered semester",
    invalidApplyURL:
      "You are unauthorized to submit an application. Please email help@khouryofficehours.com for the correct URL."
  },
  questionController: {
    createQuestion: {
      invalidQueue: "Posted to an invalid queue",
      noNewQuestions: "Queue not allowing new questions",
      closedQueue: "Queue is closed",
      oneQuestionAtATime: "You can't create more than one question at a time."
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
      loginUserCantEdit: "Logged-in user does not have edit access"
    },
    groupQuestions: {
      notGroupable: "One or more of the questions is not groupable"
    },
    saveQError: "Unable to save a question",
    notFound: "Question not found",
    unableToNotifyUser: "Unable to notify user"
  },
  loginController: {
    receiveDataFromKhoury: "Invalid request signature",
    invalidPayload: "The decoded JWT payload is invalid",
    invalidTempJWTToken: "Error occurred while signing a JWT token",
    addUserFromKhoury:
      "Error occurred while translating account from Khoury to Office Hours"
  },
  notificationController: {
    messageNotFromTwilio: "Message not from Twilio"
  },
  notificationService: {
    registerPhone: "phone number invalid"
  },
  questionRoleGuard: {
    questionNotFound: "Question not found",
    queueOfQuestionNotFound: "Cannot find queue of question",
    queueDoesNotExist: "This queue does not exist!"
  },
  queueController: {
    getQueue: "An error occurred while trying to retrieve a Queue",
    getQuestions: "Unable to get questions from queue",
    saveQueue: "Unable to save queue",
    cleanQueue: "Unable to clean queue",
    cannotCloseQueue: "Unable to close professor queue as a TA",
    missingStaffList: "Stafflist relation not present on Queue"
  },
  queueRoleGuard: {
    queueNotFound: "Queue not found"
  },
  releaseNotesController: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    releaseNotesTime: (e: any): string =>
      "Error Parsing release notes time: " + e
  },
  insightsController: {
    insightUnathorized: "User is not authorized to view this insight",
    insightNameNotFound: "The insight requested was not found",
    insightsDisabled: "Insights are currently unavailable, sorry :("
  },
  roleGuard: {
    notLoggedIn: "Must be logged in",
    noCourseIdFound: "No courseid found",
    notInCourse: "Not In This Course",
    mustBeRoleToJoinCourse: (roles: string[]): string =>
      `You must have one of roles [${roles.join(", ")}] to access this course`
  },
  profileController: {
    accountNotAvailable: "The user account is undefined",
    userResponseNotFound: "The user response was not found",
    noDiskSpace:
      "There is no disk space left to store an image. Please immediately contact your course staff and let them know. They will contact the Khoury Office Hours team as soon as possible."
  },
  alertController: {
    duplicateAlert: "This alert has already been sent",
    notActiveAlert: "This is not an alert that's open for the current user",
    incorrectPayload: "The payload provided was not of the correct type"
  },
  sseService: {
    getSubClient: "Unable to get the redis subscriber client",
    getDBClient: "Unable to get the redis database client",
    getPubClient: "Unable to get publisher client",
    moduleDestroy: "Unable to destroy the redis module",
    cleanupConnection: "Unable to cleanup the connection",
    clientIdSubscribe: "Client ID not found during subscribing to client",
    subscribe: "Unable to subscribe to the client",
    unsubscribe: "Unable to unsubscribe from the client",
    removeFromRoom: "Error removing from redis room",
    directConnections: "Unable to cleanup direct connections",
    roomMembers: "Unable to get room members",
    serialize: "Unable to serialize payload",
    publish: "Publisher client is unable to publish",
    clientIdNotFound: "Client ID not found during subscribing to client"
  },
  resourcesService: {
    noDiskSpace:
      "There is no disk space left to store a iCal file. Please immediately contact your course staff and let them know. They will contact the Khoury Office Hours team as soon as possible.",
    saveCalError: "There was an error saving an iCal to disk"
  }
};
