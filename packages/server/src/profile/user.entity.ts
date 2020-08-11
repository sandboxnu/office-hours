import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DesktopNotifModel } from '../notification/desktop-notif.entity';
import { QueueModel } from '../queue/queue.entity';
import { UserCourseModel } from './user-course.entity';

@Entity('user_model')
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @Exclude()
  username: string;

  @Column('text')
  email: string;

  @Column('text')
  name: string;

  @Column('text')
  photoURL: string;

  @OneToMany((type) => UserCourseModel, (ucm) => ucm.user)
  @Exclude()
  courses: UserCourseModel[];

  @Column({ type: 'boolean', default: false })
  @Exclude()
  desktopNotifsEnabled: boolean; // Does user want notifications sent to their desktops?

  @Column({ type: 'boolean', default: false })
  @Exclude()
  phoneNotifsEnabled: boolean; // Does user want notifications sent to their phone?

  @OneToMany((type) => DesktopNotifModel, (notif) => notif.user)
  @Exclude()
  desktopNotifs: DesktopNotifModel[];

  @Exclude()
  @ManyToMany((type) => QueueModel, (queue) => queue.staffList)
  queues: QueueModel[];
}
