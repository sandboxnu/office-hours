import {
  BaseEntity, Column, Entity,





  OneToMany, PrimaryGeneratedColumn
} from "typeorm";
import { NotifModel } from "./NotifModel";
import { UserCourseModel } from "./UserCourseModel";

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
  notifs: Promise<NotifModel[]>;
}
