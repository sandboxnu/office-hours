import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Course } from "../course/course.entity";
import { Question } from "../question/question.entity";

@Entity("queue_model")
export class Queue extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Course, (course) => course.queues)
  @JoinColumn({ name: "courseId" })
  course: Course;

  @Column({ nullable: true })
  courseId: number;

  @Column("text")
  room: string;

  @OneToMany((type) => Question, (qm) => qm.queue)
  questions: Question[];

  // TODO: eventually figure out how staff get sent to FE as well
}
