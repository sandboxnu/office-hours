import "reflect-metadata";
export declare const PROD_URL = "https://khouryofficehours.com";
export declare const isProd: () => boolean;
export declare class User {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    name: string;
    photoURL: string;
    courses: UserCourse[];
    desktopNotifsEnabled: boolean;
    desktopNotifs: DesktopNotifPartial[];
    phoneNotifsEnabled: boolean;
    phoneNumber: string;
}
export declare class DesktopNotifPartial {
    id: number;
    endpoint: string;
    name?: string;
    createdAt: Date;
}
export declare class UserPartial {
    id: number;
    email?: string;
    name?: string;
    photoURL?: string;
}
export declare type CoursePartial = {
    id: number;
    name: string;
};
export declare type UserCourse = {
    course: CoursePartial;
    role: Role;
};
export declare enum Role {
    STUDENT = "student",
    TA = "ta",
    PROFESSOR = "professor"
}
declare class OfficeHourPartial {
    id: number;
    title: string;
    startTime: Date;
    endTime: Date;
}
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
export declare class QueuePartial {
    id: number;
    room: string;
    staffList: UserPartial[];
    queueSize: number;
    notes?: string;
    isOpen: boolean;
    startTime?: Date;
    endTime?: Date;
    allowQuestions: boolean;
}
export declare class Question {
    id: number;
    creator: UserPartial;
    text?: string;
    taHelped?: UserPartial;
    createdAt: Date;
    helpedAt?: Date;
    closedAt?: Date;
    questionType?: QuestionType;
    status: QuestionStatus;
    location?: string;
    isOnline?: boolean;
}
export declare enum QuestionType {
    Concept = "Concept",
    Clarification = "Clarification",
    Testing = "Testing",
    Bug = "Bug",
    Setup = "Setup",
    Other = "Other"
}
export declare enum OpenQuestionStatus {
    Drafting = "Drafting",
    Queued = "Queued",
    Helping = "Helping",
    PriorityQueued = "PriorityQueued"
}
export declare enum LimboQuestionStatus {
    CantFind = "CantFind",
    ReQueueing = "ReQueueing",
    TADeleted = "TADeleted"
}
export declare enum ClosedQuestionStatus {
    Resolved = "Resolved",
    ConfirmedDeleted = "ConfirmedDeleted",
    StudentCancelled = "StudentCancelled",
    Stale = "Stale"
}
export declare const StatusInQueue: OpenQuestionStatus[];
export declare const StatusInPriorityQueue: OpenQuestionStatus[];
export declare const StatusSentToCreator: (OpenQuestionStatus | LimboQuestionStatus)[];
export declare type QuestionStatus = keyof typeof QuestionStatusKeys;
export declare const QuestionStatusKeys: {
    CantFind: LimboQuestionStatus.CantFind;
    ReQueueing: LimboQuestionStatus.ReQueueing;
    TADeleted: LimboQuestionStatus.TADeleted;
    Resolved: ClosedQuestionStatus.Resolved;
    ConfirmedDeleted: ClosedQuestionStatus.ConfirmedDeleted;
    StudentCancelled: ClosedQuestionStatus.StudentCancelled;
    Stale: ClosedQuestionStatus.Stale;
    Drafting: OpenQuestionStatus.Drafting;
    Queued: OpenQuestionStatus.Queued;
    Helping: OpenQuestionStatus.Helping;
    PriorityQueued: OpenQuestionStatus.PriorityQueued;
};
export declare type Season = "Fall" | "Spring" | "Summer 1" | "Summer 2";
export declare type DesktopNotifBody = {
    endpoint: string;
    expirationTime?: number;
    keys: {
        p256dh: string;
        auth: string;
    };
    name?: string;
};
export declare type PhoneNotifBody = {
    phoneNumber: string;
};
export declare class GetProfileResponse extends User {
}
export declare class KhouryDataParams {
    email: string;
    first_name: string;
    last_name: string;
    campus: string;
    photo_url: string;
    courses: KhouryStudentCourse[];
    ta_courses: KhouryTACourse[];
}
export declare class KhouryStudentCourse {
    crn: number;
    course: string;
    accelerated: boolean;
    section: number;
    semester: string;
    title: string;
}
export declare class KhouryTACourse {
    course: string;
    semester: string;
}
export interface KhouryRedirectResponse {
    redirect: string;
}
export declare class UpdateProfileParams {
    desktopNotifsEnabled?: boolean;
    phoneNotifsEnabled?: boolean;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
}
export declare class GetCourseResponse {
    id: number;
    name: string;
    officeHours: Array<OfficeHourPartial>;
    queues: QueuePartial[];
}
export declare class GetQueueResponse extends QueuePartial {
}
export declare class GetCourseQueuesResponse extends Array<QueuePartial> {
}
export declare class ListQuestionsResponse {
    yourQuestion?: Question;
    questionsGettingHelp: Array<Question>;
    queue: Array<Question>;
    priorityQueue: Array<Question>;
}
export declare class GetQuestionResponse extends Question {
}
export declare class CreateQuestionParams {
    text: string;
    questionType?: QuestionType;
    queueId: number;
    isOnline?: boolean;
    location?: string;
    force: boolean;
}
export declare class CreateQuestionResponse extends Question {
}
export declare class UpdateQuestionParams {
    text?: string;
    questionType?: QuestionType;
    queueId?: number;
    status?: QuestionStatus;
    isOnline?: boolean;
    location?: string;
}
export declare class UpdateQuestionResponse extends Question {
}
export declare type TAUpdateStatusResponse = QueuePartial;
export declare type QueueNotePayloadType = {
    notes: string;
};
export declare class TACheckoutResponse {
    queueId: number;
    canClearQueue: boolean;
    nextOfficeHourTime?: Date;
}
export declare class UpdateQueueParams {
    notes?: string;
    allowQuestions?: boolean;
}
export declare class SSEQueueResponse {
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
export declare const ERROR_MESSAGES: {
    questionController: {
        createQuestion: {
            invalidQueue: string;
            noNewQuestions: string;
            closedQueue: string;
            oneQuestionAtATime: string;
        };
        updateQuestion: {
            fsmViolation: (role: string, questionStatus: string, bodyStatus: string) => string;
            taOnlyEditQuestionStatus: string;
            otherTAHelping: string;
            otherTAResolved: string;
            taHelpingOther: string;
            loginUserCantEdit: string;
        };
    };
    loginController: {
        receiveDataFromKhoury: string;
    };
    notificationController: {
        messageNotFromTwilio: string;
    };
    notificationService: {
        registerPhone: string;
    };
    questionRoleGuard: {
        questionNotFound: string;
        queueOfQuestionNotFound: string;
        queueDoesNotExist: string;
    };
    queueRoleGuard: {
        queueNotFound: string;
    };
    releaseNotesController: {
        releaseNotesTime: (e: any) => string;
    };
    roleGuard: {
        notLoggedIn: string;
        noCourseIdFound: string;
        notInCourse: string;
        mustBeRoleToJoinCourse: (roles: string[]) => string;
    };
};
export {};
