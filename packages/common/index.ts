import { Type } from 'class-transformer'
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
} from 'class-validator'
import 'reflect-metadata'
import { Cache } from 'cache-manager'

export const PROD_URL = 'https://help.cosc304.ok.ubc.ca'

// Get domain. works on node and browser
const domain = (): string | false =>
  process.env.DOMAIN ||
  (typeof window !== 'undefined' && window?.location?.origin)
export const getEnv = (): 'production' | 'dev' => {
  switch (domain()) {
    case PROD_URL:
      return 'production'
    default:
      return 'dev'
  }
}
export const isProd = (): boolean => domain() === PROD_URL

// TODO: Clean this up, move it somwhere else, use moment???
// a - b, in minutes
export function timeDiffInMins(a: Date, b: Date): number {
  return (a.getTime() - b.getTime()) / (1000 * 60)
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
  id!: number
  email!: string
  firstName?: string
  lastName?: string
  name!: string
  photoURL!: string
  defaultMessage?: string
  sid?: number
  includeDefaultMessage!: boolean
  courses!: UserCourse[]
  pendingCourses?: KhouryProfCourse[]
  desktopNotifsEnabled!: boolean
  @Type(() => DesktopNotifPartial)
  desktopNotifs!: DesktopNotifPartial[]
  phoneNotifsEnabled?: boolean
  phoneNumber?: string
  insights!: string[]
  userRole!: string
  organization?: OrganizationUserPartial
  accountType!: AccountType
}

export class OrganizationResponse {
  id!: number
  name!: string
  logoUrl?: string
  bannerUrl?: string
  websiteUrl?: string
  ssoEnabled?: boolean
  legacyAuthEnabled?: boolean
  googleAuthEnabled?: boolean
  ssoUrl?: string
}

export class DesktopNotifPartial {
  id!: number
  endpoint!: string
  name?: string
  @Type(() => Date)
  createdAt!: Date
}

/**
 * Contains the partial user info needed by the frontend when nested in a response
 * @param id - The unique id of the user in our db.
 * @param name - The full name of this user: First Last.
 * @param photoURL - The URL string of this user photo. This is pulled from the admin site.
 */
export class UserPartial {
  id!: number
  email?: string
  name?: string
  photoURL?: string
  sid?: number
}

/**
 * Represents a partial course data needed on the front end when nested in a response.
 * @param id - The id number of this Course.
 * @param name - The subject and course number of this course. Ex: "CS 2500"
 */
export type CoursePartial = {
  id: number
  name: string
}

/**
 * Represents a course that a user is accociated with and their role in that course
 * @param course - The course the user accociated with.
 * @param role - The user's role in the course.
 */
export type UserCourse = {
  course: CoursePartial
  role: Role
}

export const COURSE_TIMEZONES = [
  'America/New_York',
  'America/Los_Angeles',
  'America/Chicago',
  'America/Denver',
  'America/Phoenix',
  'America/Anchorage',
  'America/Honolulu',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Australia/Sydney',
]

/**
 * Represents one of three possible user roles in a course.
 */
export enum Role {
  STUDENT = 'student',
  TA = 'ta',
  PROFESSOR = 'professor',
}

/**
 * Represents a method of authentication for a user.
 * Legacy account is an account that has been registered with user and password via sign up page.
 */
export enum AccountType {
  LEGACY = 'legacy',
  GOOGLE = 'google',
  SHIBBOLETH = 'shibboleth',
}

// chatbot questions and interactions

export class ChatbotQuestion {
  id!: number
  interactionId!: number
  questionText!: string
  responseText?: string
  timestamp!: Date
}

export class Interaction {
  id!: number
  course?: GetCourseResponse
  user!: User
  timestamp!: Date
}

export class ChatbotDocument {
  id!: number
  name!: number
  type!: string
  subDocumentIds!: string[]
}

/**
 * Represents one of two possible roles for the global account
 */
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

/**
 * Represents a user's role in an organization.
 */
export enum OrganizationRole {
  MEMBER = 'member',
  ADMIN = 'admin',
  PROFESSOR = 'professor',
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
  id: number
  course: CoursePartial
  room: string
  staffList: UserPartial[]
  questions: Question[]
  startTime?: Date
  endTime?: Date
  allowQuestions: boolean
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
  id!: number
  room!: string

  @Type(() => UserPartial)
  staffList!: UserPartial[]

  queueSize!: number
  notes?: string
  isOpen!: boolean

  isDisabled!: boolean

  @Type(() => Date)
  startTime?: Date

  @Type(() => Date)
  endTime?: Date

  allowQuestions!: boolean

  isProfessorQueue!: boolean
}

// Represents a list of office hours wait times of each hour of the week.
// The first element of the array is the wait time for the first hour of Sunday, UTC.
//   Users of the heatmap should rotate it according to their timezone.
// INVARIANT: Must have 24*7 elements
//
// Wait time = -1 represents no office hours data at that time.
export type Heatmap = Array<number>

/**
 * A Question is created when a student wants help from a TA.
 * @param id - The unique id number for a student question.
 * @param creator - The Student that has created the question.
 * @param text - The text descritipn of what he/she needs help with.
 * @param creatorId - userId of question creator
 * @param createdAt - The date string for the time that the Ticket was created. Ex: "2020-09-12T12:00:00-04:00"
 * @param helpedAt - The date string for the time that the TA began helping the Student.
 * @param closedAt - The date string for the time that the TA finished helping the Student.
 * @param questionTypes - The question types help distinguish questions for TA's and data insights.
 * @param status - The current status of the question in the queue.
 * @param position - The current position of this question in the queue.
 * @param location - The location of the particular student, to help TA's find them.
 */
export class Question {
  id!: number

  @Type(() => UserPartial)
  creator!: UserPartial

  text?: string

  creatorId?: number

  @Type(() => UserPartial)
  taHelped?: UserPartial

  @Type(() => Date)
  createdAt!: Date

  @Type(() => Date)
  helpedAt?: Date

  @Type(() => Date)
  closedAt?: Date

  questionTypes?: QuestionTypeParams[]

  status!: QuestionStatus

  groupable!: boolean

  location?: string
}

export const QuestionTypes: QuestionTypeParams[] = [
  {
    id: 1,
    cid: 1,
    name: 'Concept',
    color: '#000000',
  },
  {
    id: 2,
    cid: 2,
    name: 'Clarification',
    color: '#000000',
  },
  {
    id: 3,
    cid: 3,
    name: 'Testing',
    color: '#000000',
  },
  {
    id: 4,
    cid: 4,
    name: 'Bug',
    color: '#000000',
  },
  {
    id: 5,
    cid: 5,
    name: 'Setup',
    color: '#000000',
  },
  {
    id: 6,
    cid: 6,
    name: 'Other',
    color: '#000000',
  },
]

// Type of async question events
export enum asyncQuestionEventType {
  answered = 'answered',
  deleted = 'deleted',
  madeVisible = 'madeVisible',
  created = 'created',
}

export enum OpenQuestionStatus {
  Drafting = 'Drafting',
  Queued = 'Queued',
  Helping = 'Helping',
  PriorityQueued = 'PriorityQueued',
}

/**
 * Limbo statuses are awaiting some confirmation from the student.
 */
export enum LimboQuestionStatus {
  CantFind = 'CantFind', // represents when a student can't be found by a TA
  ReQueueing = 'ReQueueing', // represents when a TA wants to get back to a student later and give them the option to be put into the priority queue
  TADeleted = 'TADeleted', // When a TA deletes a question for a multitude of reasons
}

export enum ClosedQuestionStatus {
  Resolved = 'Resolved',
  DeletedDraft = 'DeletedDraft',
  ConfirmedDeleted = 'ConfirmedDeleted',
  Stale = 'Stale',
}

export enum asyncQuestionStatus {
  Resolved = 'Resolved',
  TADeleted = 'TADeleted',
  StudentDeleted = 'StudentDeleted',
  Waiting = 'Waiting',
}
export const StatusInQueue = [
  OpenQuestionStatus.Drafting,
  OpenQuestionStatus.Queued,
]

export const StatusInPriorityQueue = [OpenQuestionStatus.PriorityQueued]

export const StatusSentToCreator = [
  ...StatusInPriorityQueue,
  ...StatusInQueue,
  OpenQuestionStatus.Helping,
  LimboQuestionStatus.ReQueueing,
  LimboQuestionStatus.CantFind,
  LimboQuestionStatus.TADeleted,
]

// Ticket Status - Represents a given status of as student's ticket
export type QuestionStatus = keyof typeof QuestionStatusKeys
// an Enum-like constant that contains all the statuses for convenience.
export const QuestionStatusKeys = {
  ...OpenQuestionStatus,
  ...ClosedQuestionStatus,
  ...LimboQuestionStatus,
}

export class QuestionGroup {
  @IsInt()
  id!: number

  @Type(() => Question)
  questions!: Array<Question>

  @Type(() => UserPartial)
  creator!: UserPartial

  //Might want to add a list of students in group so they can be added without a question
}

/**
 * An async question is created when a student wants help from a TA.
 */
export class AsyncQuestion {
  @IsOptional()
  @IsInt()
  id?: number

  @Type(() => UserPartial)
  creator?: UserPartial

  @IsOptional()
  @IsString()
  questionText?: string

  @IsOptional()
  @IsInt()
  creatorId?: number

  @Type(() => UserPartial)
  taHelped?: UserPartial

  @Type(() => Date)
  createdAt?: Date

  @IsOptional()
  questionTypes?: QuestionTypeParams[]

  @IsOptional()
  @IsString()
  status?: asyncQuestionStatus

  @IsOptional()
  images?: Image[]

  @IsOptional()
  @IsString()
  questionAbstract?: string

  @IsOptional()
  @IsString()
  answerText?: string

  @IsOptional()
  @IsString()
  aiAnswerText?: string

  @Type(() => Date)
  closedAt?: Date

  @IsOptional()
  @IsBoolean()
  visible?: boolean
}

export class Image {
  @IsOptional()
  @IsInt()
  id?: number
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
export type Season = 'Fall' | 'Spring' | 'Summer_1' | 'Summer_2' | 'Summer_Full'

export type DesktopNotifBody = {
  endpoint: string
  expirationTime?: number
  keys: {
    p256dh: string
    auth: string
  }
  name?: string
}

export type PhoneNotifBody = {
  phoneNumber: string
}

// =================== API Route Types ===========================
// On backend, validated with https://docs.nestjs.com/techniques/validation
// API route Params and Responses

// Office Hours Response Types
export class GetProfileResponse extends User {}

export class UBCOloginParam {
  @IsString()
  email!: string
  @IsString()
  password!: string
}
export class UBCOuserParam {
  @IsString()
  email!: string

  @IsString()
  first_name!: string

  @IsString()
  password!: string

  @IsString()
  last_name!: string

  @IsInt()
  selected_course!: number

  @IsOptional()
  @IsInt()
  sid?: number

  @IsOptional()
  @IsString()
  photo_url?: string

  @IsOptional()
  @IsDefined() // TODO: use ValidateNested instead, for some reason it's crunked
  courses?: KhouryCourse[] | KhouryProfCourse[]
}
export class KhouryDataParams {
  @IsString()
  email!: string

  @IsString()
  password!: string

  @IsString()
  first_name!: string

  @IsString()
  last_name!: string

  @IsInt()
  campus!: number

  @IsOptional()
  @IsString()
  photo_url!: string

  @IsOptional()
  @IsDefined() // TODO: use ValidateNested instead, for some reason it's crunked
  courses!: KhouryCourse[] | KhouryProfCourse[]
}

export class KhouryCourse {
  @IsInt()
  crn!: number

  @IsString()
  semester!: string

  @IsEnum(String)
  role!: 'TA' | 'Student'
}

export class KhouryProfCourse {
  // List of CRN's in the section group
  @IsArray()
  crns!: number[]

  @IsString()
  semester!: string

  // Section group name
  @IsString()
  name!: string
}

export function isKhouryCourse(
  c: KhouryCourse | KhouryProfCourse,
): c is KhouryCourse {
  return (
    (c as KhouryCourse).role !== undefined &&
    (c as KhouryCourse).crn !== undefined
  )
}

export class Calendar {
  @IsString()
  title!: string

  @IsDate()
  @Type(() => Date)
  start!: Date

  @IsDate()
  @Type(() => Date)
  end!: Date

  @IsNumber()
  cid!: number

  @IsArray()
  @IsOptional()
  daysOfWeek?: string[]

  @IsBoolean()
  @IsOptional()
  allDay?: boolean
}
export class questions {
  @IsInt()
  id!: number

  @IsInt()
  queueId?: number

  @IsString()
  text?: string

  @IsArray()
  questionTypes?: QuestionTypeParams[]

  @IsDate()
  @Type(() => Date)
  createdAt!: Date

  @IsString()
  status?: string

  @IsString()
  location?: string

  @IsString()
  creatorName?: string

  @IsString()
  helpName?: string
}
export interface KhouryRedirectResponse {
  redirect: string
}

export class UpdateOrganizationUserRole {
  @IsNumber()
  @IsNotEmpty()
  userId!: number

  @IsString()
  @IsNotEmpty()
  organizationRole!: OrganizationRole
}

export class UpdateOrganizationDetailsParams {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  websiteUrl?: string
}

export class UpdateProfileParams {
  @IsBoolean()
  @IsOptional()
  desktopNotifsEnabled?: boolean

  @IsBoolean()
  @IsOptional()
  phoneNotifsEnabled?: boolean

  @ValidateIf((o) => o.phoneNotifsEnabled)
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string

  @IsString()
  @IsOptional()
  firstName?: string

  @IsInt()
  @IsOptional()
  sid?: number

  @IsString()
  @IsOptional()
  lastName?: string

  @IsString()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  defaultMessage?: string

  @IsBoolean()
  @IsOptional()
  includeDefaultMessage?: boolean
}

export class OrganizationPartial {
  id!: number
  name!: string
  logoUrl?: string
  bannerUrl?: string
  websiteUrl?: string
  ssoEnabled?: boolean
  ssoUrl?: string
}

export class OrganizationUserPartial {
  id!: number
  orgId!: number
  organizationName!: string
  organizationDescription!: string
  organizationLogoUrl!: string
  organizationBannerUrl!: string
  organizationRole!: string
}

export class GetOrganizationResponse {
  id!: number
  name!: string
  description?: string
  logoUrl?: string
  bannerUrl?: string
  websiteUrl?: string
  ssoEnabled?: boolean
  ssoUrl?: string
}

export class GetCourseResponse {
  id!: number
  name!: string

  @Type(() => QueuePartial)
  queues?: QueuePartial[]

  heatmap!: Heatmap | false
  coordinator_email!: string

  @Type(() => Number)
  crns!: number[]

  icalURL?: string

  zoomLink!: string

  questionTimer?: number

  selfEnroll!: boolean

  asyncQuestionDisplayTypes?: string[]

  timezone?: string

  semesterId?: number

  sectionGroupName?: string

  enabled?: boolean

  @Type(() => OrganizationPartial)
  organizationCourse?: OrganizationPartial
  courseInviteCode!: string
}

export class GetLimitedCourseResponse {
  id!: number
  name!: string

  @Type(() => OrganizationPartial)
  organizationCourse?: OrganizationPartial
  courseInviteCode!: string
}

export class GetCourseUserInfoResponse {
  users!: UserPartial[]
  total!: number
}

export class GetOrganizationUsersResponse {
  userId!: number
  userFirstName!: string
  userLastName!: string
  userEmail!: string
  userPhotoUrl!: string
  userOrganizationRole!: string
}

export class OrganizationUser {
  id!: number
  firstName!: string
  lastName!: string
  email!: string
  photoUrl!: string
  fullName!: string
  globalRole!: string
  sid!: number
  accountDeactivated!: boolean
}

export class OrganizationCourse {
  id!: number
  name!: string
  role!: string
}

export class GetOrganizationUserResponse {
  organizationId!: number
  organizationRole!: string
  user!: OrganizationUser
  courses!: OrganizationCourse[]
}

export class GetSelfEnrollResponse {
  courses!: CoursePartial[]
}

export class GetCourseOverridesRow {
  id!: number
  role!: string
  name!: string
  email!: string
}

export class GetCourseOverridesResponse {
  @Type(() => GetCourseOverridesRow)
  data!: GetCourseOverridesRow[]
}

export class UpdateCourseOverrideBody {
  @IsString()
  email!: string

  @IsString()
  role!: Role
}

export class InteractionParams {
  @IsInt()
  courseId!: number

  @IsInt()
  userId!: number
}

export class UpdateOrganizationCourseDetailsParams {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  coordinator_email?: string

  @IsString()
  @IsOptional()
  sectionGroupName?: string

  @IsString()
  @IsOptional()
  zoomLink?: string

  @IsString()
  @IsOptional()
  timezone?: string

  @IsInt()
  @IsOptional()
  semesterId?: number

  @IsArray()
  @IsOptional()
  profIds?: Array<number>
}

export class ChatBotQuestionParams {
  @IsInt()
  interactionId?: number

  @IsString()
  questionText?: string

  @IsString()
  responseText?: string

  @IsBoolean()
  suggested?: boolean

  @IsInt()
  userScore?: number

  @IsString()
  vectorStoreId?: string

  @IsArray()
  sourceDocuments?: {
    name: string
    type: string
    parts: string[]
  }[]
}

export class DocumentParams {
  @IsString()
  name?: string

  @IsString()
  type?: string

  @IsArray()
  subDocumentIds?: string[]
}

export class UpdateCourseOverrideResponse extends GetCourseOverridesRow {}

export class GetQueueResponse extends QueuePartial {}

export class GetCourseQueuesResponse extends Array<QueuePartial> {}

export class ListQuestionsResponse {
  @Type(() => Question)
  yourQuestion?: Question

  @Type(() => Question)
  questionsGettingHelp!: Array<Question>

  @Type(() => Question)
  queue!: Array<Question>

  @Type(() => Question)
  priorityQueue!: Array<Question>

  @Type(() => QuestionGroup)
  groups!: Array<QuestionGroup>

  @Type(() => AlertPayload)
  unresolvedAlerts?: Array<AlertPayload>
}

export class AsyncQuestionResponse {
  @Type(() => Question)
  waitingQuestions!: Array<AsyncQuestion>

  @Type(() => Question)
  helpedQuestions!: Array<AsyncQuestion>

  @Type(() => Question)
  otherQuestions!: Array<AsyncQuestion>

  @Type(() => Question)
  visibleQuestions!: Array<AsyncQuestion>
}
export class GetQuestionResponse extends Question {}

export class GetStudentQuestionResponse extends Question {
  @IsInt()
  queueId!: number
}

export class CreateQuestionParams {
  @IsString()
  text!: string

  @IsArray()
  @IsOptional()
  questionTypes?: QuestionTypeParams[]

  @IsBoolean()
  groupable!: boolean

  @IsInt()
  queueId!: number

  @IsString()
  @IsOptional()
  location?: string

  @IsBoolean()
  force!: boolean
}
export class CreateQuestionResponse extends Question {}

export class UpdateQuestionParams {
  @IsString()
  @IsOptional()
  text?: string

  @IsArray()
  @IsOptional()
  questionTypes?: QuestionTypeParams[]

  @IsBoolean()
  @IsOptional()
  groupable?: boolean

  @IsInt()
  @IsOptional()
  queueId?: number

  @IsEnum(QuestionStatusKeys)
  @IsOptional()
  status?: QuestionStatus

  @IsString()
  @IsOptional()
  location?: string
}
export class UpdateQuestionResponse extends Question {}

export class GroupQuestionsParams {
  @IsArray()
  @Type(() => Number)
  questionIds!: number[]

  @IsInt()
  queueId!: number
}

export class ResolveGroupParams {
  @IsInt()
  queueId!: number
}

export class CreateAsyncQuestions extends AsyncQuestion {}

export class UpdateAsyncQuestions extends AsyncQuestion {}

export type TAUpdateStatusResponse = QueuePartial
export type QueueNotePayloadType = {
  notes: string
}

export class TACheckoutResponse {
  // The ID of the queue we checked out of
  queueId!: number
}

export class UpdateQueueParams {
  @IsString()
  @IsOptional()
  notes?: string

  @IsBoolean()
  allowQuestions?: boolean
}

export class QuestionTypeParams {
  @IsInt()
  @IsOptional()
  id?: number

  @IsInt()
  @IsOptional()
  cid?: number

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  color?: string
}

export class TACheckinTimesResponse {
  @Type(() => TACheckinPair)
  taCheckinTimes!: TACheckinPair[]
}

export class TACheckinPair {
  @IsString()
  name!: string

  @IsDate()
  @Type(() => Date)
  checkinTime!: Date

  @IsDate()
  @Type(() => Date)
  checkoutTime?: Date

  @IsBoolean()
  forced!: boolean

  @IsBoolean()
  inProgress!: boolean

  @IsNumber()
  numHelped!: number
}

export enum AlertType {
  REPHRASE_QUESTION = 'rephraseQuestion',
}

export class AlertPayload {}

export class Alert {
  @IsEnum(AlertType)
  alertType!: AlertType

  @IsDate()
  sent!: Date

  @Type(() => AlertPayload)
  payload!: AlertPayload

  @IsInt()
  id!: number
}

export class RephraseQuestionPayload extends AlertPayload {
  @IsInt()
  questionId!: number

  @IsInt()
  queueId!: number

  @IsInt()
  courseId!: number
}

export class OrganizationCourseResponse {
  @IsInt()
  id?: number

  @IsInt()
  organizationId?: number

  @IsInt()
  courseId?: number

  course?: GetCourseResponse

  profIds?: number[]
}

export class OrganizationStatsResponse {
  @IsInt()
  members?: number

  @IsInt()
  courses?: number

  @IsInt()
  membersProfessors?: number
}

export class CreateAlertParams {
  @IsEnum(AlertType)
  alertType!: AlertType

  @IsInt()
  courseId!: number

  @IsObject()
  payload!: AlertPayload

  @IsInt()
  targetUserId!: number
}

export class CreateAlertResponse extends Alert {}

export class GetAlertsResponse {
  @Type(() => Alert)
  alerts!: Alert[]
}

export class questionTypeParam {
  @IsInt()
  cid!: number

  @IsString()
  @IsOptional()
  name!: string

  @IsInt()
  @IsOptional()
  queueId?: number
}
export class questionTypeResponse {
  @Type(() => questionTypeParam)
  questions!: questionTypeParam[]
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
  sectionGroupName!: string

  @IsString()
  name!: string

  @IsString()
  iCalURL?: string

  @IsString()
  coordinator_email!: string

  @IsString()
  timezone!: string
}

export class EditCourseInfoParams {
  @IsNumber()
  courseId?: number

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  coordinator_email?: string

  @IsString()
  @IsOptional()
  icalURL?: string

  @IsString()
  @IsOptional()
  zoomLink?: string

  @IsString()
  @IsOptional()
  timezone?: string

  @IsOptional()
  enabled?: boolean

  @IsString()
  @IsOptional()
  questionTimer?: number

  @IsArray()
  @IsOptional()
  asyncQuestionDisplayTypes?: string[]

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  crns?: number[]

  @IsString()
  @IsOptional()
  courseInviteCode?: string
}

export class SemesterPartial {
  id!: number
  season!: string
  year!: number
}

export class SSEQueueResponse {
  queue?: GetQueueResponse
  questions?: ListQuestionsResponse
}

export interface TwilioBody {
  ToCountry: string
  ToState: string
  SmsMessageSid: string
  NumMedia: string
  ToCity: string
  FromZip: string
  SmsSid: string
  FromState: string
  SmsStatus: string
  FromCity: string
  Body: string
  FromCountry: string
  To: string
  ToZip: string
  NumSegments: string
  MessageSid: string
  AccountSid: string
  From: string
  ApiVersion: string
}

export type GetInsightOutputResponse = PossibleOutputTypes

export type ListInsightsResponse = Record<string, InsightDisplayInfo>

export type InsightDisplayInfo = {
  displayName: string
  description: string
  component: InsightComponent
  size: 'small' | 'default'
}

export interface InsightObject {
  displayName: string
  description: string
  roles: Role[]
  component: InsightComponent
  size: 'default' | 'small'
  compute: (
    insightFilters: any,
    cacheManager?: Cache,
  ) => Promise<PossibleOutputTypes>
}

export enum InsightComponent {
  SimpleDisplay = 'SimpleDisplay',
  BarChart = 'BarChart',
  SimpleTable = 'SimpleTable',
}

export type PossibleOutputTypes =
  | SimpleDisplayOutputType
  | BarChartOutputType
  | SimpleTableOutputType

export type SimpleDisplayOutputType = number | string

export type BarChartOutputType = {
  data: StringMap<number>[]
  xField: string
  yField: string
  seriesField: string
  xAxisName?: string
  yAxisName?: string
}

export type SimpleTableOutputType = {
  dataSource: StringMap<string>[]
  columns: StringMap<string>[]
  totalStudents: number
}

export type StringMap<T> = {
  [key: string]: T
}

export type DateRangeType = {
  start: string
  end: string
}

export type InsightParamsType = {
  start: string
  end: string
  limit: number
  offset: number
}

export type sendEmailAsync = {
  receiver: string
  subject: string
  type: asyncQuestionEventType
}
export const ERROR_MESSAGES = {
  common: {
    pageOutOfBounds: "Can't retrieve out of bounds page.",
  },
  organizationController: {
    notEnoughDiskSpace: 'Not enough disk space to upload file',
    userAlreadyInOrganization: 'User is already in organization',
    courseAlreadyInOrganization: 'Course is already in organization',
    organizationNotFound: 'Organization not found',
    organizationNameTooShort: 'Organization name must be at least 3 characters',
    noFileUploaded: 'No file uploaded',
    organizationDescriptionTooShort:
      'Organization description must be at least 10 characters',
    organizationUrlTooShortOrInValid:
      'Organization URL must be at least 4 characters and be a valid URL',
    userNotFoundInOrganization: 'User not found in organization',
    cannotRemoveAdminRole: 'Cannot remove admin role from user',
    cannotGetAdminUser: 'Information about this user account is restricted',
  },
  courseController: {
    checkIn: {
      cannotCheckIntoMultipleQueues:
        'Cannot check into multiple queues at the same time',
    },
    invalidInviteCode: 'Invalid invite code',
    semesterNotFound: 'Semester not found',
    courseNameTooShort: 'Course name must be at least 1 character',
    coordinatorEmailTooShort: 'Coordinator email must be at least 1 character',
    sectionGroupNameTooShort: 'Section group name must be at least 1 character',
    zoomLinkTooShort: 'Zoom link must be at least 1 character',
    courseAlreadyRegistered: 'One or more of the courses is already registered',
    courseNotFound: 'The course was not found',
    sectionGroupNotFound: 'One or more of the section groups was not found',
    courseOfficeHourError: "Unable to find a course's office hours",
    courseHeatMapError: "Unable to get course's cached heatmap",
    courseCrnsError: "Unable to get course's crn numbers",
    courseModelError: 'Course Model not found',
    noUserFound: 'No user found with given email',
    noSemesterFound: 'No semester exists for the submitted course',
    updatedQueueError: 'Error updating a course queue',
    queuesNotFound: 'Queues not found',
    queueNotFound: 'Queue not found',
    queueAlreadyExists: 'Queue already exists.',
    queueNotAuthorized: 'Unable to join this professor queue as a TA',
    saveQueueError: 'Unable to save queue',
    clearQueueError: 'Unable to determine if queue can be cleared',
    createEventError: 'An error occurred while creating an event',
    icalCalendarUpdate: 'Unable to update calendar',
    checkInTime: 'Unable to get TA check in times',
    removeCourse: 'Error occurred while trying to remove a course',
    createCourse: 'Error occurred while trying to create a course',
    updateCourse: 'Error occurred while trying to update a course',
    createCourseMappings: 'Unable to create a course mappings',
    updateProfLastRegistered:
      "Unable to update professor's last registered semester",
    invalidApplyURL:
      'You are unauthorized to submit an application. Please email help@khouryofficehours.com for the correct URL.',
    crnAlreadyRegistered: (crn: number, courseId: number): string =>
      `The CRN ${crn} already exists for another course with course id ${courseId}`,
  },
  questionController: {
    createQuestion: {
      invalidQueue: 'Posted to an invalid queue',
      noNewQuestions: 'Queue not allowing new questions',
      closedQueue: 'Queue is closed',
      oneQuestionAtATime: "You can't create more than one question at a time.",
    },
    updateQuestion: {
      fsmViolation: (
        role: string,
        questionStatus: string,
        bodyStatus: string,
      ): string =>
        `${role} cannot change status from ${questionStatus} to ${bodyStatus}`,
      taOnlyEditQuestionStatus: 'TA/Professors can only edit question status',
      otherTAHelping: 'Another TA is currently helping with this question',
      otherTAResolved: 'Another TA has already resolved this question',
      taHelpingOther: 'TA is already helping someone else',
      loginUserCantEdit: 'Logged-in user does not have edit access',
    },
    groupQuestions: {
      notGroupable: 'One or more of the questions is not groupable',
    },
    saveQError: 'Unable to save a question',
    notFound: 'Question not found',
    unableToNotifyUser: 'Unable to notify user',
  },
  loginController: {
    receiveDataFromKhoury: 'Invalid request signature',
    invalidPayload: 'The decoded JWT payload is invalid',
    invalidTempJWTToken: 'Error occurred while signing a JWT token',
    addUserFromKhoury:
      'Error occurred while translating account from Khoury to Office Hours',
  },
  notificationController: {
    messageNotFromTwilio: 'Message not from Twilio',
  },
  notificationService: {
    registerPhone: 'phone number invalid',
  },
  questionRoleGuard: {
    questionNotFound: 'Question not found',
    queueOfQuestionNotFound: 'Cannot find queue of question',
    queueDoesNotExist: 'This queue does not exist!',
  },
  queueController: {
    getQueue: 'An error occurred while trying to retrieve a Queue',
    getQuestions: 'Unable to get questions from queue',
    saveQueue: 'Unable to save queue',
    cleanQueue: 'Unable to clean queue',
    cannotCloseQueue: 'Unable to close professor queue as a TA',
    missingStaffList: 'Stafflist relation not present on Queue',
  },
  queueRoleGuard: {
    queueNotFound: 'Queue not found',
  },
  insightsController: {
    insightUnathorized: 'User is not authorized to view this insight',
    insightNameNotFound: 'The insight requested was not found',
    insightsDisabled: 'Insights are currently unavailable, sorry :(',
  },
  roleGuard: {
    notLoggedIn: 'Must be logged in',
    noCourseIdFound: 'No courseid found',
    notInCourse: 'Not In This Course',
    notAuthorized: "You don't have permissions to perform this action",
    userNotInOrganization: 'User not in organization',
    mustBeRoleToAccess: (roles: string[]): string =>
      `You must have one of roles [${roles.join(
        ', ',
      )}] to access this information`,
    mustBeRoleToJoinCourse: (roles: string[]): string =>
      `You must have one of roles [${roles.join(', ')}] to access this course`,
  },
  mailService: {
    mailFailed: 'Mail was not sent to user',
  },
  profileController: {
    emailAlreadyInDb: 'Email already in database',
    sidAlreadyInDb: 'Student ID already in database',
    cannotUpdateEmail: 'Email cannot be updated',
    accountNotAvailable: 'The user account is undefined',
    userResponseNotFound: 'The user response was not found',
    accountDeactivated: 'The user account is deactivated',
    firstNameTooShort: 'First name must be at least 1 characters',
    lastNameTooShort: 'Last name must be at least 1 characters',
    emailTooShort: 'Email must be at least 1 characters',
    sidInvalid: 'Student ID must be a number and greater than 0',
    noProfilePicture: "User doesn't have a profile picture",
    noCoursesToDelete: "User doesn't have any courses to delete",
    emailInUse: 'Email is already in use',
    noDiskSpace:
      'There is no disk space left to store an image. Please immediately contact your course staff and let them know. They will contact the Khoury Office Hours team as soon as possible.',
  },
  alertController: {
    duplicateAlert: 'This alert has already been sent',
    notActiveAlert: "This is not an alert that's open for the current user",
    incorrectPayload: 'The payload provided was not of the correct type',
  },
  sseService: {
    getSubClient: 'Unable to get the redis subscriber client',
    getDBClient: 'Unable to get the redis database client',
    getPubClient: 'Unable to get publisher client',
    moduleDestroy: 'Unable to destroy the redis module',
    cleanupConnection: 'Unable to cleanup the connection',
    clientIdSubscribe: 'Client ID not found during subscribing to client',
    subscribe: 'Unable to subscribe to the client',
    unsubscribe: 'Unable to unsubscribe from the client',
    removeFromRoom: 'Error removing from redis room',
    directConnections: 'Unable to cleanup direct connections',
    roomMembers: 'Unable to get room members',
    serialize: 'Unable to serialize payload',
    publish: 'Publisher client is unable to publish',
    clientIdNotFound: 'Client ID not found during subscribing to client',
  },
  resourcesService: {
    noDiskSpace:
      'There is no disk space left to store a iCal file. Please immediately contact your course staff and let them know. They will contact the Khoury Office Hours team as soon as possible.',
    saveCalError: 'There was an error saving an iCal to disk',
  },
}
