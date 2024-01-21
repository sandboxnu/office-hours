import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { InteractionModel } from './interaction.entity';
import { QuestionDocumentModel } from './questionDocument.entity';
// each chatbot_question links to one interaction
@Entity('chatbot_questions_model')
export class ChatbotQuestionModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true }) // If vectorstore gets reset
  vectorStoreId: string;

  @ManyToOne(() => InteractionModel)
  @JoinColumn({ name: 'interaction' })
  interaction: InteractionModel;

  @Column({ nullable: true })
  interactionId: number;

  @Column()
  questionText: string;

  @Column()
  responseText: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ default: 0 })
  userScore: number;

  @Column({ default: false })
  suggested: boolean;

  @OneToMany((type) => QuestionDocumentModel, (document) => document.question)
  @JoinColumn({ name: 'question' })
  sourceDocuments: QuestionDocumentModel[];
}
