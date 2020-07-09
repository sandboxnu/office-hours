import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Course } from './course.entity';
import { Exclude } from 'class-transformer';

@Entity('office_hour')
export class OfficeHour extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Course, (course) => course.officeHours)
  @JoinColumn({ name: 'courseId' })
  @Exclude()
  course: Course;

  @Column({ nullable: true })
  @Exclude()
  courseId: number;

  @Column('text')
  title: string;

  @Column('text')
  room: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;
}
