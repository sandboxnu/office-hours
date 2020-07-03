import {
  BaseEntity, Column, Entity,
  OneToMany, PrimaryGeneratedColumn
} from "typeorm";
import { Notif } from "../notification/notif.entity";
import { UserCourse } from "./user-course.entity";

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

  @OneToMany((type) => Notif, (notif) => notif.user)
  notifs: Notif[];
}
