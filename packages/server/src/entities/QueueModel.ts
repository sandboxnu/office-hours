import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { CourseModel } from "./CourseModel";
import { QuestionModel } from "./QuestionModel";

@Entity("queue_model")
export class QueueModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => CourseModel, (course) => course.queues)
  @JoinColumn({ name: "courseId" })
  course: Promise<CourseModel>;

  @Column({ nullable: true })
  courseId: number;

  @Column("text")
  room: string;

  @OneToMany((type) => QuestionModel, (qm) => qm.queue)
  questions: Promise<QuestionModel[]>;

  // TODO: eventually figure out how staff get sent to FE as well
}
