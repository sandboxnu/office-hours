import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionModel } from './question.entity';

@Entity('question_type_model')
export class QuestionTypeModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  cid: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  color: string;

  @ManyToMany(() => QuestionModel, (question) => question.questionTypes)
  questions: QuestionModel[];
}
