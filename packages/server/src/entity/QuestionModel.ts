import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserCourseModel } from "./UserCourseModel";
import { QueueModel } from "./QueueModel";
import { QuestionType, QuestionStatus } from "@template/common";

@Entity("question_model")
export class QuestionModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => QueueModel, (q) => q.questions)
  @JoinColumn({ name: "queueId" })
  queue: Promise<QueueModel>;

  @Column({ nullable: true })
  queueId: number;

  @Column("text")
  text: string;

  @ManyToOne((type) => UserCourseModel)
  @JoinColumn({ name: "creatorId" })
  creator: Promise<UserCourseModel>;

  @Column({ nullable: true })
  creatorId: number;

  @ManyToOne((type) => UserCourseModel)
  @JoinColumn({ name: "taHelpedId" })
  taHelped: Promise<UserCourseModel>;

  @Column({ nullable: true })
  taHelpedId: number;

  @Column()
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
