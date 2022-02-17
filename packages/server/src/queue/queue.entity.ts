import { Exclude } from 'class-transformer';
import { QuestionGroupModel } from '../question/question-group.entity';
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

  @OneToMany((type) => QuestionGroupModel, (qg) => qg.queue)
  @Exclude()
  groups: QuestionGroupModel[];

  @Column('text', { nullable: true })
  notes: string;

  @ManyToMany((type) => UserModel, (user) => user.queues)
  @JoinTable()
  staffList: UserModel[];

  @Column({ default: false })
  allowQuestions: boolean;

  @Column({ default: false })
  isProfessorQueue: boolean;

  @Column({ default: false })
  isDisabled: boolean;

  startTime: Date;
  endTime: Date;

  isOpen: boolean;

  async checkIsOpen(): Promise<boolean> {
    this.isOpen =
      this.staffList && this.staffList.length > 0 && !this.isDisabled;
    return this.isOpen;
  }

  queueSize: number;

  async addQueueSize(): Promise<void> {
    this.queueSize = await QuestionModel.waitingInQueue(this.id).getCount();
  }

  // TODO: eventually figure out how staff get sent to FE as well
}
