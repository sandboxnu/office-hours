import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Season } from "@template/common";
import { Course } from "./course.entity";

@Entity("semester_model")
export class Semester extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  season: Season;

  @Column()
  year: number;

  @OneToMany((type) => Course, (course) => course.semester)
  courses: Course[];
}
