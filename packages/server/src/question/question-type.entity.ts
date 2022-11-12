import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseModel } from '../course/course.entity';

@Entity('question_type_model')
export class QuestionTypeModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  cid: number;

  @Column({ type: 'text', nullable: true })
  question: string;
}
