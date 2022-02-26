import { UserModel } from '../profile/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Season } from '@koh/common';

@Entity('last_registration_model')
export class LastRegistrationModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => UserModel)
  @JoinColumn({ name: 'profId' })
  prof: UserModel;

  @Column()
  profId: number;

  @Column('text')
  lastRegisteredSemester: string; // same format as what's passed by Admin
}

export const khourySemesterCodes: Record<Season, string> = {
  Fall: '10',
  Spring: '30',
  Summer_1: '40',
  Summer_Full: '50',
  Summer_2: '60',
};
