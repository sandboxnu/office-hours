import { Exclude } from 'class-transformer';
import { UserModel } from '../profile/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AsyncQuestionModel } from './asyncQuestion.entity';

@Entity('async_question_votes_model')
export class AsyncQuestionVotesModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => UserModel)
  @JoinColumn({ name: 'userId' })
  user: UserModel;

  @Column({ nullable: true })
  @Exclude()
  userId: number;

  @ManyToOne((type) => AsyncQuestionModel)
  @JoinColumn({ name: 'questionId' })
  question: AsyncQuestionModel;

  @Column({ nullable: true })
  @Exclude()
  questionId: number;

  @Column({ nullable: false })
  vote: number;
}
