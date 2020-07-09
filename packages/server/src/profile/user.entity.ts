import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserCourse } from './user-course.entity';
import { DesktopNotif } from '../notification/desktop-notif.entity';
import { PhoneNotif } from '../notification/phone-notif.entity';

@Entity('user_model')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @Exclude()
  username: string;

  @Column('text')
  @Exclude()
  email: string;

  @Column('text')
  name: string;

  @Column('text')
  photoURL: string;

  @OneToMany((type) => UserCourse, (ucm) => ucm.user)
  @Exclude()
  courses: UserCourse[];

  @OneToMany((type) => DesktopNotif, (notif) => notif.user)
  @Exclude()
  desktopNotifs: DesktopNotif[];

  @OneToMany((type) => PhoneNotif, (notif) => notif.user)
  @Exclude()
  phoneNotifs: PhoneNotif[];
}
