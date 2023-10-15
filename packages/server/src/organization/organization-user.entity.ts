import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationModel } from './organization.entity';
import { Exclude } from 'class-transformer';
import { UserModel } from '../profile/user.entity';
import { OrganizationRole } from '@koh/common';

@Entity('organization_user_model')
export class OrganizationUserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @ManyToOne(
    type => OrganizationModel,
    organization => organization.organizationUsers,
  )
  organization: OrganizationModel;

  @Exclude()
  @OneToOne(
    type => UserModel,
    user => user.organizationUser,
  )
  organizationUser: UserModel;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  organizationId: number;

  @Column({
    type: 'enum',
    enum: OrganizationRole,
    default: OrganizationRole.MEMBER,
  })
  role: OrganizationRole;
}
