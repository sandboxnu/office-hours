import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  AfterInsert,
  AfterLoad,
} from "typeorm";
import { User } from "src/profile/user.entity";

@Entity("desktop_notif_model")
export class DesktopNotif extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  endpoint: string;

  @Column({ nullable: true })
  expirationTime: Date;

  @Column("text")
  p256dh: string;

  @Column("text")
  auth: string;

  @ManyToOne((type) => User, (user) => user.desktopNotifs)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @AfterInsert()
  async initialNotifyUser() {
    await desktopNotifyUser(
      this,
      "You've successfully signed up for desktop notifications!"
    );
  }

  // TODO: add functionality to notify user once they hit top of queue (probably have to make a
  // afterload listener on Queue,a nd then try to find the notifmodel of the user there, and then
  // just do something like await notifyUser(queue.user.notifs, "joe mama"))
}
