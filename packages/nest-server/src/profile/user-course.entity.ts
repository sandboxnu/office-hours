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
import { Queue } from "../queue/queue.entity";
import { QuestionType, Role } from "@template/common";
import { User } from "./user.entity";

@Entity("user_course_model")
export class UserCourse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.courses)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne((type) => Course, (course) => course.userCourses)
  @JoinColumn({ name: "courseId" })
  course: Course;

  @Column({ nullable: true })
  courseId: number;

  @Column({ type: "enum", enum: Role, default: Role.STUDENT })
  role: Role;
}
