import { CourseModel } from '../course/course.entity';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('calendar_model')
export class CalendarModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  title: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column('text', { array: true, nullable: true, default: null })
  daysOfWeek: string[];

  @Column({ nullable: true })
  allDay: boolean;

  @ManyToOne((type) => CourseModel)
  @JoinColumn({ name: 'course' })
  @Exclude()
  course: CourseModel;
}
