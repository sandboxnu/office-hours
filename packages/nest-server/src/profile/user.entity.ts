import {
  BaseEntity, Column, Entity,
  OneToMany, PrimaryGeneratedColumn
} from "typeorm";
import { UserCourse } from "./user-course.entity";
import { DesktopNotif } from "src/notification/desktop-notif.entity";
import { PhoneNotif } from "src/notification/phone-notif.entity";

@Entity("user_model")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  username: string;

  @Column("text")
  email: string;

  @Column("text")
  name: string;

  @Column("text")
  photoURL: string;

  @OneToMany((type) => UserCourse, (ucm) => ucm.user)
  courses: UserCourse[];

  @OneToMany((type) => DesktopNotif, (notif) => notif.user)
  desktopNotifs: DesktopNotif[];

  @OneToMany((type) => PhoneNotif, (notif) => notif.user)
  phoneNotifs: PhoneNotif[];
}
