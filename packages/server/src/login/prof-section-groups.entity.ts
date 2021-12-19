import { KhouryProfCourse } from '@koh/common';
import { UserModel } from '../profile/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('prof_section_groups_model')
export class ProfSectionGroupsModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => UserModel)
  @JoinColumn({ name: 'profId' })
  prof: UserModel;

  @Column()
  profId: number;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  sectionGroups: KhouryProfCourse[];
}
