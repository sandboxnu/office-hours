import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { UserCourseModel } from "./UserCourseModel";
import { NotifBody } from "@template/common";
import { UserModel } from "./UserModel";

/*
based off of this from the web push front end 
{
  endpoint: 'https://fcm.googleapis.com/fcm/send/d_OpZBBSK4g:APA91bFPDE55-Q_-emManQ1HaoU8uMFRLCyfxIldgRHpQMr7X1bG2z6PW5RrTpu5FCCvbjOgw_VXdDmkp1h5OLYkKiWK1EM3pWiq1kGijD3ieer7cuP5Pap6NT_zqMWB1d1XehYOBrLS',
  expirationTime: null,
  keys: {
    p256dh: 'BBmo6-uI-no3F_PRuGe-zV-kw-jZh4jWH_XI0SGb2LnqcVDTY2nuaF50_5nWYufcwGqXyxy_bfVqrJ1n_3-fgfo',
  }
}
*/

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
  user: Promise<UserModel>;

  @Column({ nullable: true })
  userId: number;
}
