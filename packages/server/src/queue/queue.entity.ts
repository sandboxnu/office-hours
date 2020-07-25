import { OpenQuestionStatus } from '@template/common';
import { Exclude, Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseModel } from '../course/course.entity';
import { UserModel } from '../profile/user.entity';
import { QuestionModel } from '../question/question.entity';
import { OfficeHourModel } from '../course/office-hour.entity';

@Entity('queue_model')
export class QueueModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => CourseModel, (course) => course.queues)
  @JoinColumn({ name: 'courseId' })
  course: CourseModel;

  @Column({ nullable: true })
  @Exclude()
  courseId: number;

  @Column('text')
  room: string;

  @OneToMany((type) => QuestionModel, (qm) => qm.queue)
  @Exclude()
  questions: QuestionModel[];

  @Column('text', { nullable: true })
  notes: string;

  @ManyToMany((type) => UserModel, (user) => user.queues)
  @JoinTable()
  staffList: UserModel[];

  time?: {
    start: Date;
    end: Date;
  };

  @Exclude()
  @OneToMany((type) => OfficeHourModel, (oh) => oh.queue)
  @JoinTable()
  officeHours: OfficeHourModel[];

  isOpen(): boolean {
    if (this.staffList.length > 0) {
      return true;
    }
    const now = new Date();
    const MS_IN_MINUTE = 60000;
    return !!this.officeHours.find(
      (e) =>
        e.startTime.valueOf() - 10 * MS_IN_MINUTE < now.valueOf() &&
        e.endTime.valueOf() + 1 * MS_IN_MINUTE > now.valueOf(),
    );
  }

  @Expose()
  get queueSize(): number {
    return (
      this.questions?.filter((q) => q.status in OpenQuestionStatus).length || 0
    );
  }
  // TODO: eventually figure out how staff get sent to FE as well
}
