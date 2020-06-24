import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserModel } from "./UserModel";

@Entity("notif_model")
export class NotifModel extends BaseEntity {
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

  @ManyToOne((type) => UserModel, (user) => user.notifs)
  @JoinColumn({ name: "userId" })
  user: UserModel;

  @Column({ nullable: true })
  userId: number;
}
