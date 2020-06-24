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

@Entity("office_hour")
export class OfficeHourModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => CourseModel, (course) => course.officeHours)
  @JoinColumn({ name: "courseId" })
  course: CourseModel;

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
