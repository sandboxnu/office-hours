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
import { QueueModel } from "./QueueModel";
import { QuestionType, Role } from "@template/common";
import { UserModel } from "./UserModel";

@Entity("user_course_model")
export class UserCourseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => UserModel, (user) => user.courses)
  @JoinColumn({ name: "userId" })
  user: Promise<UserModel>;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne((type) => CourseModel, (course) => course.userCourses)
  @JoinColumn({ name: "courseId" })
  course: Promise<CourseModel>;

  // TODO: can we make this not nullable?
  @Column({ nullable: true })
  courseId: number;

  @Column({ type: "enum", enum: Role, default: Role.STUDENT })
  role: Role;
}
