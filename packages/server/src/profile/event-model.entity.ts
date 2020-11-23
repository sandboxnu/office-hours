import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseModel } from '../course/course.entity';
import { UserModel } from './user.entity';

/**
 * Represents an Event in the EventModel table, used for advanced metrics.
 */
export enum EventType {
  TA_CHECKED_IN = 'taCheckedIn',
  TA_CHECKED_OUT = 'taCheckedOut',
}

@Entity('event_model')
export class EventModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @Column({ type: 'enum', enum: EventType })
  eventType: EventType;

  @ManyToOne((type) => UserModel, (user) => user.events)
  @JoinColumn({ name: 'userId' })
  user: UserModel;

  @Column({ nullable: true })
  @Exclude()
  userId: number;

  @ManyToOne((type) => CourseModel, (course) => course.events)
  @JoinColumn({ name: 'courseId' })
  course: CourseModel;

  @Column({ nullable: true })
  @Exclude()
  courseId: number;
}
