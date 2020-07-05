import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Exclude } from 'class-transformer';
import { UserCourse } from "../profile/user-course.entity";
import { Queue } from "../queue/queue.entity";
import { QuestionType, QuestionStatus } from "@template/common";
import { User } from "../profile/user.entity";

@Entity("question_model")
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Queue, (q) => q.questions)
  @JoinColumn({ name: "queueId" })
  @Exclude()
  queue: Queue;

  @Column({ nullable: true })
  @Exclude()
  queueId: number;

  @Column("text")
  text: string;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "creatorId" })
  creator: User;

  @Column({ nullable: true })
  @Exclude()
  creatorId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "taHelpedId" })
  taHelped: User;

  @Column({ nullable: true })
  @Exclude()
  taHelpedId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  helpedAt: Date;

  @Column({ nullable: true })
  closedAt: Date;

  @Column("text")
  questionType: QuestionType;

  @Column("text")
  status: QuestionStatus;
}
