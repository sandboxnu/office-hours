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
import { Exclude, Expose } from 'class-transformer';
import { QueueModel } from '../queue/queue.entity';

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

  @ManyToOne((type) => QueueModel, (queue) => queue.officeHours, {
    eager: true,
  })
  @JoinColumn({ name: 'queueId' })
  @Exclude()
  queue: QueueModel;

  @Column({ nullable: true })
  @Exclude()
  queueId: number;

  @Column('text')
  title: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Expose()
  get room(): string {
    return this.queue.room;
  }
}
