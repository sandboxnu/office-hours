import { EventType } from '@koh/common';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserCourseModel } from './user-course.entity';

@Entity('user_course_model')
export class EventModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @Column({ type: 'enum', enum: EventType })
  eventType: EventType;

  @ManyToOne((type) => UserCourseModel, (ucm) => ucm.events)
  @JoinColumn({ name: 'userCourseId' })
  user: UserCourseModel;

  @Column({ nullable: true })
  userCourseId: number;
}
