import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationUserModel } from './organization-user.entity';

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

  @Column('text', { nullable: true })
  ssoUrl: string;

  @Exclude()
  @OneToMany(
    (type) => OrganizationUserModel,
    (organizationUser) => organizationUser.organization,
  )
  organizationUsers: OrganizationUserModel[];
}
