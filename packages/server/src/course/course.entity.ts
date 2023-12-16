import { Heatmap } from '@koh/common';
import { AsyncQuestionModel } from '../asyncQuestion/asyncQuestion.entity';
import { Exclude } from 'class-transformer';
import { QuestionTypeModel } from 'question/question-type.entity';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlertModel } from '../alerts/alerts.entity';
import { EventModel } from '../profile/event-model.entity';
import { UserCourseModel } from '../profile/user-course.entity';
import { QueueModel } from '../queue/queue.entity';
import { SemesterModel } from '../semester/semester.entity';
import { OrganizationCourseModel } from '../organization/organization-course.entity';
import { ChatbotDocumentModel } from 'chatbot/chatbotDocument.entity';
@Entity('course_model')
export class CourseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => QueueModel, (q) => q.course)
  queues: QueueModel[];

  @Column('text')
  name: string; // display name entered by Prof

  @Column('text')
  sectionGroupName: string; // from admin

  @Column('text', { nullable: true })
  coordinator_email: string;

  @Column('text', { nullable: true })
  @Exclude()
  icalURL: string;

  @Column('text', { nullable: true })
  @Exclude()
  zoomLink: string;

  @Column('integer', { nullable: true })
  @Exclude()
  questionTimer: number;

  @OneToMany((type) => ChatbotDocumentModel, (document) => document.course)
  @JoinColumn({ name: 'course' })
  chatbotDocuments: ChatbotDocumentModel[];

  @OneToMany((type) => UserCourseModel, (ucm) => ucm.course)
  @Exclude()
  userCourses: UserCourseModel[];

  @ManyToOne((type) => SemesterModel, (semester) => semester.courses)
  @JoinColumn({ name: 'semesterId' })
  @Exclude()
  semester: SemesterModel;

  @Column({ nullable: true })
  @Exclude()
  // TODO: can we make these not nullable and work with TypeORM
  semesterId: number;

  @Column('boolean', { nullable: true })
  enabled: boolean; // Set to true if the given the course is using our app

  // The heatmap is false when there havent been any questions asked yet or there havent been any office hours
  heatmap: Heatmap | false;

  // The IANA string representing the timezone the course is centered around. This is important for any time based events for a course
  @Column('text', { nullable: true })
  timezone: string;

  @OneToMany((type) => EventModel, (event) => event.course)
  @Exclude()
  events: EventModel[];

  @OneToMany((type) => AlertModel, (alert) => alert.course)
  @Exclude()
  alerts: AlertModel[];

  // Whether or not students are allowed to self-enroll in the class
  // WARNING: THIS SHOULD ONLY BE USED AS A TEMPORARY MEASURE WHEN THINGS LIKE BANNER ARE DOWN
  @Column('boolean', { nullable: true, default: false })
  selfEnroll: boolean;

  @OneToMany(
    (type) => AsyncQuestionModel,
    (asyncQuestion) => asyncQuestion.course,
  )
  @Exclude()
  images: AsyncQuestionModel[];

  @Column('text', { array: true, nullable: true, default: [] })
  asyncQuestionDisplayTypes: string[];

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToOne(
    (type) => OrganizationCourseModel,
    (organizationCourse) => organizationCourse.course,
  )
  organizationCourse: OrganizationCourseModel;

  @Column('text', { nullable: true })
  courseInviteCode: string;
}
