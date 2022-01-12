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

  @Column({ nullable: true })
  crn: number;

  // Represents the course that this maps to
  @ManyToOne((type) => CourseModel)
  @JoinColumn({ name: 'courseId' })
  course: CourseModel;

  @Column({ nullable: true })
  courseId: number;
}
