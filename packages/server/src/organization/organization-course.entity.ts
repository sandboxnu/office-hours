import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationModel } from './organization.entity';
import { CourseModel } from '../course/course.entity';

@Entity('organization_course_model')
export class OrganizationCourseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @ManyToOne(
    (type) => OrganizationModel,
    (organization) => organization.organizationCourses,
  )
  organization: OrganizationModel;

  @Column({ nullable: true })
  organizationId: number;

  @Exclude()
  @OneToOne((type) => CourseModel, (course) => course.organizationCourse, {
    cascade: true,
  })
  @JoinColumn({ name: 'courseId' })
  course: CourseModel;

  @Column({ nullable: true })
  courseId: number;
}
