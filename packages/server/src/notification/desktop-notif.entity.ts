import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  AfterInsert,
  AfterLoad,
} from 'typeorm';
import { UserModel } from '../profile/user.entity';

@Entity('desktop_notif_model')
export class DesktopNotifModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  endpoint: string;

  @Column({ nullable: true })
  expirationTime: Date;

  @Column('text')
  p256dh: string;

  @Column('text')
  auth: string;

  @ManyToOne((type) => UserModel, (user) => user.desktopNotifs)
  @JoinColumn({ name: 'userId' })
  user: UserModel;

  @Column({ nullable: true })
  userId: number;
}
