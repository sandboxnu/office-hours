import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { UserCourseModel } from "./UserCourseModel";
import { NotifModel } from "./NotifModel";

@Entity("user_model")
export class UserModel extends BaseEntity {
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

  @OneToMany((type) => UserCourseModel, (ucm) => ucm.user)
  courses: UserCourseModel[];

  @OneToMany((type) => NotifModel, (notif) => notif.user)
  notifs: NotifModel[];
}
