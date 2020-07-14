import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CourseModel } from './course.entity';
import { Exclude } from 'class-transformer';

@Entity('office_hour')
export class OfficeHourModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => CourseModel, (course) => course.officeHours)
  @JoinColumn({ name: 'courseId' })
  @Exclude()
  course: CourseModel;

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
