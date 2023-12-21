//got rid of questiontype
import { asyncQuestionStatus } from '@koh/common';
import { Exclude } from 'class-transformer';
import { CourseModel } from '../course/course.entity';
import { ImageModel } from '../images/image.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from '../profile/user.entity';

@Entity('async_question_model')
export class AsyncQuestionModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => CourseModel)
  @JoinColumn({ name: 'courseId' })
  @Exclude()
  course: CourseModel;

  @OneToMany((type) => ImageModel, (image) => image.asyncQuestion)
  @Exclude()
  images: ImageModel[];

  @Column({ nullable: true })
  @Exclude()
  courseId: number;

  @Column('text')
  questionAbstract: string;

  @Column('text', { nullable: true })
  questionText: string;

  @Column('text', { nullable: true })
  answerText: string;

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

  // When the question was last helped (getting help again on priority queue overwrites)
  @Column({ nullable: true })
  closedAt: Date;

  // change questionType to string
  @Column('text', { nullable: true })
  questionType: string;

  @Column('text')
  status: asyncQuestionStatus;

  @Column('boolean', { nullable: true })
  visible: boolean;
}
