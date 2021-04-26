import { Season } from '@koh/common';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseModel } from '../course/course.entity';

@Entity('semester_model')
export class SemesterModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  season: Season;

  @Column()
  year: number;

  @OneToMany((type) => CourseModel, (course) => course.semester)
  courses: CourseModel[];
}
