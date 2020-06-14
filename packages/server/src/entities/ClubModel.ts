import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("club")
export class ClubModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column()
  rating: number;
}
