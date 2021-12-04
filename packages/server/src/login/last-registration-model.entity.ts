import { UserModel } from 'profile/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from 'typeorm';

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
