import { OpenQuestionStatus, QuestionStatus, QuestionType } from '@koh/common';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  SelectQueryBuilder,
} from 'typeorm';
import { UserModel } from '../profile/user.entity';
import { QueueModel } from '../queue/queue.entity';

@Entity('question_model')
export class QuestionModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => QueueModel, (q) => q.questions)
  @JoinColumn({ name: 'queueId' })
  @Exclude()
  queue: QueueModel;

  @Column({ nullable: true })
  @Exclude()
  queueId: number;

  @Column('text')
  text: string;

  @ManyToOne((type) => UserModel)
  @JoinColumn({ name: 'creatorId' })
  creator: UserModel;

  @Column({ nullable: true })
  @Exclude()
  creatorId: number;

  @ManyToOne((type) => UserModel)
  @JoinColumn({ name: 'taHelpedId' })
  taHelped: UserModel;

  @Column({ nullable: true })
  @Exclude()
  taHelpedId: number;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  helpedAt: Date;

  @Column({ nullable: true })
  closedAt: Date;

  @Column('text', { nullable: true })
  questionType: QuestionType;

  @Column('text')
  status: QuestionStatus;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  isOnline: boolean;

  /**
   * Scopes
   */
  static openInQueue(queueId: number): SelectQueryBuilder<QuestionModel> {
    return this.createQueryBuilder('question')
      .where('question.queueId = :queueId', { queueId })
      .andWhere('question.status IN (:...statuses)', {
        statuses: Object.values(OpenQuestionStatus),
      })
      .orderBy('question.createdAt', 'ASC');
  }
}
