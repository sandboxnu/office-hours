import { Exclude } from 'class-transformer';
import { INSIGHTS_MAP } from '../insights/insight-objects';
import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DesktopNotifModel } from '../notification/desktop-notif.entity';
import { PhoneNotifModel } from '../notification/phone-notif.entity';
import { QueueModel } from '../queue/queue.entity';
import { EventModel } from './event-model.entity';
import { UserCourseModel } from './user-course.entity';

@Entity('user_model')
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @Column('text', { nullable: true })
  firstName: string;

  @Column('text', { nullable: true })
  lastName: string;

  @Column('text', { nullable: true })
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

  @OneToOne((type) => PhoneNotifModel, (notif) => notif.user)
  @Exclude()
  phoneNotif: PhoneNotifModel;

  @Exclude()
  @ManyToMany((type) => QueueModel, (queue) => queue.staffList)
  queues: QueueModel[];

  @Exclude()
  @OneToMany((type) => EventModel, (event) => event.user)
  events: EventModel[];

  @Exclude()
  @Column({ type: 'simple-array', nullable: true, default: [] })
  hideInsights: string[];

  insights: string[];

  @AfterLoad()
  computeInsights() {
    if (this.hideInsights) {
      const insightNames = Object.keys(INSIGHTS_MAP);
      this.insights = insightNames.filter(
        (name) => !this.hideInsights.includes(name),
      );
    }
  }

  name: string;

  @AfterLoad()
  setFullNames() {
    this.name = this.firstName + ' ' + this.lastName;
  }
}
