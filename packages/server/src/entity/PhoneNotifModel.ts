import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserModel } from "./UserModel";

@Entity("phone_notif_model")
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
