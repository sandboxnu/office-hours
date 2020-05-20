import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { OfficeHourModel } from "./OfficeHourModel";

@Entity("club")
export class ClubModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column()
  rating: number;
}
