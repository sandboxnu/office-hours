import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { OfficeHourModel } from "./OfficeHourModel";
import { WhiteBoard } from "./WhiteBoard";

@Entity("course_model")
export class StaffModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text")
  photoUrl: string;

}
