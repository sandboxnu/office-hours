import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationUserModel } from './organization-user.entity';
import { OrganizationCourseModel } from './organization-course.entity';

@Entity('organization_model')
export class OrganizationModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  logoUrl: string;

  @Column('text', { nullable: true })
  bannerUrl: string;

  @Column('text', { nullable: true })
  websiteUrl: string;

  @Column('boolean', { default: false })
  ssoEnabled: boolean;

  @Column('boolean', { default: false })
  legacyAuthEnabled: boolean;

  @Column('boolean', { default: true })
  googleAuthEnabled: boolean;

  @Column('text', { nullable: true })
  ssoUrl: string;

  @Exclude()
  @JoinColumn({ name: 'organizationId' })
  @OneToMany(
    (type) => OrganizationUserModel,
    (organizationUser) => organizationUser.organization,
  )
  @JoinColumn({ name: 'organizationId' })
  organizationUsers: OrganizationUserModel[];

  @Exclude()
  @JoinColumn({ name: 'organizationId' })
  @OneToMany(
    (type) => OrganizationCourseModel,
    (organizationCourse) => organizationCourse.organization,
  )
  organizationCourses: OrganizationCourseModel[];
}
