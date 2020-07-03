import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Course } from "./course.entity";

@Entity("office_hour")
export class OfficeHour extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Course, (course) => course.officeHours)
  @JoinColumn({ name: "courseId" })
  course: Course;

  @Column({ nullable: true })
  courseId: number;

  @Column("text")
  title: string;

  @Column("text")
  room: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;
}
