import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity("office_hour")
export class OfficeHourModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  title: string;

  @Column("text")
  room: string;

  @Column("number")
  campusId: number;

  @Column("timestamp")
  startTime: number;

  @Column("timestamp")
  endTime: number;
}
