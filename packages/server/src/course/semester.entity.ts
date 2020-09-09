import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Season } from '@koh/common';
import { CourseModel } from './course.entity';

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
