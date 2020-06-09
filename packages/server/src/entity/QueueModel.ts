import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CourseModel } from "./CourseModel";

@Entity("queue")
export class QueueModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => CourseModel, (course) => course.whiteBoard)
  @JoinColumn({ name: "courseId" })
  course: Promise<CourseModel>;

  @Column({ nullable: true })
  courseId: number;

  @Column("text")
  room: string;

  // TODO: implement questions to be on this
}
