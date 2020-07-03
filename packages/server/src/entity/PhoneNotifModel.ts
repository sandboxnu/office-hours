import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from "typeorm";
import { UserModel } from "./UserModel";

@Entity("phone_notif_model")
@Unique("phone_notif_model", ["phoneNumber", "userId"])
export class PhoneNotifModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  phoneNumber: string;

  @ManyToOne((type) => UserModel, (user) => user.phoneNotifs)
  @JoinColumn({ name: "userId" })
  user: UserModel;

  @Column({ nullable: true })
  userId: number;
}
