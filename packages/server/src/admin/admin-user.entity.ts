import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
} from 'typeorm';

@Entity('admin_user_model')
export class AdminUserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ length: 128, unique: true, nullable: false })
  username: string

  @Column({ length: 128, nullable: false })
  passwordHash: string
}
