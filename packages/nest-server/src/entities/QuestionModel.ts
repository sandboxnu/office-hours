import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { UserCourseModel } from "./UserCourseModel";
import { QueueModel } from "./QueueModel";
import { QuestionType, QuestionStatus } from "@template/common";
import { UserModel } from "./UserModel";

@Entity("question_model")
export class QuestionModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => QueueModel, (q) => q.questions)
  @JoinColumn({ name: "queueId" })
  queue: QueueModel;

  @Column({ nullable: true })
  queueId: number;

  @Column("text")
  text: string;

  @ManyToOne((type) => UserModel)
  @JoinColumn({ name: "creatorId" })
  creator: UserModel;

  @Column({ nullable: true })
  creatorId: number;

  @ManyToOne((type) => UserModel)
  @JoinColumn({ name: "taHelpedId" })
  taHelped: UserModel;

  @Column({ nullable: true })
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
