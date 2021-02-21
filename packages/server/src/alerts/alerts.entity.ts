import { AlertType, Heatmap } from '@koh/common';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from '../profile/user.entity';
import { CourseModel } from '../course/course.entity';
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

@Entity('alert_model')
export class AlertModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AlertType })
  alertType: AlertType;

  @Column()
  sent: Date;

  @Column({ nullable: true })
  resolved: Date;

  @ManyToOne((type) => UserModel, (user) => user.alerts)
  @JoinColumn({ name: 'userId' })
  user: UserModel;

  @Column({ nullable: true })
  @Exclude()
  userId: number;

  @ManyToOne((type) => CourseModel, (course) => course.alerts)
  @JoinColumn({ name: 'courseId' })
  course: CourseModel;

  @Column({ nullable: true })
  @Exclude()
  courseId: number;
}
