import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseModel } from '../course/course.entity';

@Entity('chatbot_document_model')
export class ChatbotDocumentModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne((type) => CourseModel, (course) => course.chatbotDocuments)
  @JoinColumn({ name: 'course' })
  course: CourseModel;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('text', { array: true })
  subDocumentIds: string[];
}
