import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../profile/user.entity";

@Entity("notif_model")
export class Notif extends BaseEntity {
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

  @ManyToOne((type) => User, (user) => user.notifs)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: true })
  userId: number;
}
