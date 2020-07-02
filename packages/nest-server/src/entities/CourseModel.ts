import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { OfficeHourModel } from "./OfficeHourModel";
import { QueueModel } from "./QueueModel";
import { UserCourseModel } from "./UserCourseModel";
import { SemesterModel } from "./SemesterModel";

/**
 * Represents a course in the context of office hours.
 * @param id - The id number of this Course.
 * @param name - The subject and course number of this course. Ex: "CS 2500"
 * @param semester - The semester of this course.
 */
/*interface Course {
    id: number;
    name: string;
    url: string;
    semester: Semester;
    users: UserCourse[]
}*/

@Entity("course_model")
export class CourseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => OfficeHourModel, (oh) => oh.course)
  officeHours: OfficeHourModel[];

  @OneToMany((type) => QueueModel, (q) => q.course)
  queues: QueueModel[];

  @Column("text")
  name: string;

  @Column("text")
  icalURL: string;

  @OneToMany((type) => UserCourseModel, (ucm) => ucm.course)
  userCourses: UserCourseModel;

  @ManyToOne((type) => SemesterModel, (semester) => semester.courses)
  @JoinColumn({ name: "semesterId" })
  semester: SemesterModel;

  @Column({ nullable: true })
  // TODO: can we make these not nullable and work with TypeORM
  semesterId: number;
}
