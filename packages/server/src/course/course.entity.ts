import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OfficeHourModel } from './office-hour.entity';
import { QueueModel } from '../queue/queue.entity';
import { UserCourseModel } from '../profile/user-course.entity';
import { SemesterModel } from './semester.entity';
import { Exclude } from 'class-transformer';
import { Heatmap } from '@koh/common';

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

@Entity('course_model')
export class CourseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => OfficeHourModel, (oh) => oh.course)
  officeHours: OfficeHourModel[];

  @OneToMany((type) => QueueModel, (q) => q.course)
  queues: QueueModel[];

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  @Exclude()
  icalURL: string;

  @OneToMany((type) => UserCourseModel, (ucm) => ucm.course)
  @Exclude()
  userCourses: UserCourseModel;

  @ManyToOne((type) => SemesterModel, (semester) => semester.courses)
  @JoinColumn({ name: 'semesterId' })
  @Exclude()
  semester: SemesterModel;

  @Column({ nullable: true })
  @Exclude()
  // TODO: can we make these not nullable and work with TypeORM
  semesterId: number;

  @Column('boolean', { nullable: true })
  enabled: boolean; // Set to true if the given the course is using our app

  // The heatmap is false when there havent been any questions asked yet or there havent been any office hours
  heatmap: Heatmap | false;
}
