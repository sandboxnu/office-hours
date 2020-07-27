import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import {hashSync} from 'bcrypt';

/**
 * Admin users are totally separate from regular users and can only be created from command line.
 * `yarn cli admin:create`
 */
@Entity('admin_user_model')
export class AdminUserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  static createFromPassword({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): AdminUserModel {
    const passwordHash = hashSync(password, 5);
    return AdminUserModel.create({ username, passwordHash });
  }

  @Column({ length: 128, unique: true, nullable: false })
  username: string;

  @Column({ length: 128, nullable: false })
  passwordHash: string;
}
