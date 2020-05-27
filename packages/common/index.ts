export enum WSMessageType {
  Count = "count",
  Refresh = "ref",
}

// API base data types
export type Club = { name: string; rating: number; id: number };

// API route Params and Responses
export type GetClubResponse = Club[];

export type CreateClubParams = { name: string; rating: number };
export type CreateClubResponse = Club;

/**
 * A User model.
 * @param id - The unique id of the user in our db.
 * @param ldapId - This should be consistent with the one in the ldap user pool for all khoury students.
 * @param email - The email string of the user if they provide it
 * @param name - The full name of this user: First Last.
 * @param photoURL - The URL string of this user photo. This can be pulled from the admin site
 * @param courses - The list of courses that the user is accociated with (as either a 'student', 'ta' or 'professor')
 */
export interface User {
  id: number;
  ldapId: number;
  email: string;
  name: string;
  photoURL: string;
  courses: UserCourse[];
}

/*
 * many to many join table between user and course
 */
interface UserCourse {
  user: User;
  course: Course;
  role: "student" | "ta" | "professor";
}

/**
 * Represents a course in the context of office hours.
 * @param id - The id number of this Course.
 * @param name - The subject and course number of this course. Ex: "CS 2500"
 * @param semester - The semester of this course.
 * @param users - The users that are related with a given course (as either a 'student', 'ta' or 'professor')
 */
export interface Course {
  id: number;
  name: string;
  icalUrl: string;
  semester: Semester;
  users: UserCourse[];
}

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
type Season = "Fall" | "Spring" | "Summer 1" | "Summer 2";

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
interface Queue {
  id: number;
  course: Course;
  room: string;
  createdAt: string;
  closedAt: string;
  staffList: UserCourse[];
  questions: Question[];
}

/**
 * A Question is created when a student wants help from a TA.
 * @param id - The unique id number for a student question.
 * @param creator - The Student that has created the question.
 * @param text - The text descritipn of what he/she needs help with.
 * @param queue - The queue that this question is accosiated with.
 * @param createdAt - The date string for the time that the Ticket was created. Ex: "2020-09-12T12:00:00-04:00"
 * @param helpedAt - The date string for the time that the TA began helping the Student.
 * @param closedAt - The date string for the time that the TA finished helping the Student.
 * @param status - The current status of the question in the queue.
 * @param questionType - The question type to help distinguish question for TA's and data insights
 */
interface Question {
  id: number;
  creator: User;
  text: string;
  queue: Queue;
  taHelped: UserCourse;
  createdAt: string;
  helpedAt: string;
  closedAt: string;
  status: TicketStatus;
  questionType: QuestionType;
}

// Question types
export enum QuestionType {
  Concept = "Concept",
  Testing = "Testing",
  Bug = "Bug",
  Setup = "Setup",
  Other = "Other",
}

/**
 * Represents a given status of as student's ticket.
 */
type TicketStatus =
  | "Queued"
  | "Helping"
  | "Resolved"
  | "Deferred"
  | "No Show"
  | "Deleted";
