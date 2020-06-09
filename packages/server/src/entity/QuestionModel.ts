import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CourseModel } from "./CourseModel";
import { QueueModel } from "./QueueModel";
import { QuestionType } from "@template/common";

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

  // TODO: users :)
  //@Column()
  //creator: UserCourseModel;

  //@Column()
  //taHelped: UserCourseModel;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  helpedAt: Date;

  @Column({ nullable: true })
  closedAt: Date;

  @Column("text")
  questionType: QuestionType;

  @Column("text")
  status: string; //TODO: whenever QuestionStatus gets figured out, we should make this one
}
