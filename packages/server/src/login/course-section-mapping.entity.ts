/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CourseModel } from '../course/course.entity';

@Entity('course_section_mapping_model')
export class CourseSectionMappingModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // This is the course name that is sent to us from the khoury amin backend
  @Column()
  genericCourseName: string;

  @Column()
  section: number;

  // Represents the course that this maps to
  @ManyToOne((type) => CourseModel)
  @JoinColumn({ name: 'courseId' })
  course: CourseModel;

  @Column({ nullable: true })
  courseId: number;
}
