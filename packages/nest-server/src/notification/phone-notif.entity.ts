import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../profile/user.entity";

@Entity("phone_notif_model")
export class PhoneNotif extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  phoneNumber: string;

  @ManyToOne((type) => User, (user) => user.phoneNotifs)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: true })
  userId: number;
}
