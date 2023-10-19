import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CourseModel } from 'course/course.entity';
import { UserModel } from 'profile/user.entity';

@Entity('chatbot_interactions_model')
export class InteractionModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: Date;

  @ManyToOne(() => CourseModel)
  @JoinColumn({ name: 'course' })
  course: CourseModel;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user' })
  user: UserModel;
}
