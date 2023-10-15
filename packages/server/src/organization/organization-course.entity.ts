import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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
    type => OrganizationModel,
    organization => organization.organizationCourses,
  )
  organization: OrganizationModel;

  @Column({ nullable: true })
  organizationId: number;

  @Exclude()
  @OneToMany(
    type => CourseModel,
    course => course.organizationCourse,
    {
      cascade: true,
    },
  )
  course: CourseModel;

  @Column({ nullable: true })
  courseId: number;
}
