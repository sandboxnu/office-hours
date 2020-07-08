import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CourseModel } from "./CourseModel";
import { QuestionModel } from "./QuestionModel";

@Entity("queue_model")
export class QueueModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => CourseModel, (course) => course.queues)
  @JoinColumn({ name: "courseId" })
  course: CourseModel;

  @Column({ nullable: true })
  courseId: number;

  @Column("text")
  room: string;

  @OneToMany((type) => QuestionModel, (qm) => qm.queue)
  questions: QuestionModel[];

  @Column("text", { nullable: true })
  notes: string;

  // TODO: eventually figure out how staff get sent to FE as well
}
