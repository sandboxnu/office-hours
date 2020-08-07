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

  @OneToMany((type) => QuestionModel, (qm) => qm.queue, {
    eager: true,
  })
  @Exclude()
  questions: QuestionModel[];

  @Column('text', { nullable: true })
  notes: string;

  @ManyToMany((type) => UserModel, (user) => user.queues)
  @JoinTable()
  staffList: UserModel[];

  // If you need to add time to queues check out this commit: 995e82991587b2077d342b1df87a2665a21c3492

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
    if (!this.questions) {
      // if you're getting this, make sure you're loading `questions` in relations when you're getting a queue
      // or you're adding questions to your QueueModel.create as []
      throw new Error(
        "Questions weren't loaded when trying to grab queue size",
      );
    }
    return this.questions?.filter((q) => q.status in OpenQuestionStatus).length;
  }

  startTime: Date;
  endTime: Date;

  // TODO: eventually figure out how staff get sent to FE as well
}
