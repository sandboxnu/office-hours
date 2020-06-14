import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Season } from "@template/common";
import { CourseModel } from "./CourseModel";

@Entity("semester_model")
export class SemesterModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  season: Season;

  @Column()
  year: number;

  @OneToMany((type) => CourseModel, (course) => course.semester)
  courses: Promise<CourseModel[]>;
}
