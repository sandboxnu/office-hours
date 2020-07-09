import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OfficeHour } from './office-hour.entity';
import { Queue } from '../queue/queue.entity';
import { UserCourse } from '../profile/user-course.entity';
import { Semester } from './semester.entity';
import { Exclude } from 'class-transformer';

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
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => OfficeHour, (oh) => oh.course)
  officeHours: OfficeHour[];

  @OneToMany((type) => Queue, (q) => q.course)
  queues: Queue[];

  @Column('text')
  name: string;

  @Column('text')
  @Exclude()
  icalURL: string;

  @OneToMany((type) => UserCourse, (ucm) => ucm.course)
  @Exclude()
  userCourses: UserCourse;

  @ManyToOne((type) => Semester, (semester) => semester.courses)
  @JoinColumn({ name: 'semesterId' })
  @Exclude()
  semester: Semester;

  @Column({ nullable: true })
  @Exclude()
  // TODO: can we make these not nullable and work with TypeORM
  semesterId: number;
}
