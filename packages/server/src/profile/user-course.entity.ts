import { Role } from '@koh/common';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseModel } from '../course/course.entity';
import { UserModel } from './user.entity';

@Entity('user_course_model')
export class UserCourseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => UserModel, (user) => user.courses)
  @JoinColumn({ name: 'userId' })
  user: UserModel;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne((type) => CourseModel, (course) => course.userCourses)
  @JoinColumn({ name: 'courseId' })
  course: CourseModel;

  @Column({ nullable: true })
  courseId: number;

  @Column({ type: 'enum', enum: Role, default: Role.STUDENT })
  role: Role;
}
