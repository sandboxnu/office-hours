import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { UserModel } from '../profile/user.entity';

@Entity('phone_notif_model')
export class PhoneNotifModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  phoneNumber: string;

  @OneToOne((type) => UserModel, (user) => user.phoneNotif)
  @JoinColumn({ name: 'userId' })
  user: UserModel;

  @Column({ nullable: true })
  userId: number;

  @Column()
  verified: boolean;
}
