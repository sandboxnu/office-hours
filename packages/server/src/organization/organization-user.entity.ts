import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationModel } from './organization.entity';
import { UserModel } from '../profile/user.entity';
import { OrganizationRole } from '@koh/common';

@Entity('organization_user_model')
export class OrganizationUserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    (type) => OrganizationModel,
    (organization) => organization.organizationUsers,
  )
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationModel;

  @OneToOne((type) => UserModel, (user) => user.organizationUser)
  @JoinColumn({ name: 'userId' })
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
