import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserCourseModel } from '../profile/user-course.entity';
import { QueueModel } from '../queue/queue.entity';
import { QuestionModel } from './question.entity';

@Entity('question_group_model')
export class QuestionGroupModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => QuestionModel, (q) => q.group)
  questions: QuestionModel[];

  @ManyToOne((type) => UserCourseModel)
  @JoinColumn({ name: 'creatorId' })
  creator: UserCourseModel;

  @Column()
  creatorId: number;

  @ManyToOne((type) => QueueModel, (q) => q.groups)
  @JoinColumn({ name: 'queueId' })
  queue: QueueModel;

  @Column({ nullable: true })
  queueId: number;
}
