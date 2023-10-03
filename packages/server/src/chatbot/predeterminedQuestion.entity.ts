import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// each chatbot_question links to one interaction
@Entity('predetermined_question_model')
export class PredeterminedQuestionModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  question: string;

  @Column()
  answer: string;
}
