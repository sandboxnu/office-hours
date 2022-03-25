import { Exclude, Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QueueModel } from '../queue/queue.entity';

@Entity('office_hour')
export class OfficeHourModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Exclude()
  courseId: number;

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
    return this.queue?.room;
  }
}
