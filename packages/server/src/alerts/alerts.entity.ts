import { AlertPayload, AlertType } from '@koh/common';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  SelectQueryBuilder,
} from 'typeorm';
import { CourseModel } from '../course/course.entity';
import { UserModel } from '../profile/user.entity';

@Entity('alert_model')
export class AlertModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AlertType })
  alertType: AlertType;

  @Column()
  sent: Date;

  @Column({ nullable: true })
  resolved: Date;

  @ManyToOne((type) => UserModel, (user) => user.alerts)
  @JoinColumn({ name: 'userId' })
  user: UserModel;

  @Column({ nullable: true })
  @Exclude()
  userId: number;

  @ManyToOne((type) => CourseModel, (course) => course.alerts)
  @JoinColumn({ name: 'courseId' })
  course: CourseModel;

  @Column({ nullable: true })
  @Exclude()
  courseId: number;

  @Column({ type: 'json' })
  payload: AlertPayload;

  static unresolvedRephraseQuestionAlert(
    queueId: number,
  ): SelectQueryBuilder<AlertModel> {
    return this.createQueryBuilder('alert')
      .where('alert.resolved IS NULL')
      .andWhere('alert.alertType::text = ' + AlertType.REPHRASE_QUESTION)
      .andWhere("(alert.payload ->> 'queueId')::INTEGER = :queueId ", {
        queueId,
      });
  }
}
