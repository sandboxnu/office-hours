import { AsyncQuestionModel } from '../asyncQuestion/asyncQuestion.entity';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('image_model')
export class ImageModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  filename: string;

  @Column({ nullable: true })
  visible: number;

  @ManyToOne((type) => AsyncQuestionModel)
  @JoinColumn({ name: 'AsyncQuestion' })
  @Exclude()
  asyncQuestion: AsyncQuestionModel;

  @Column({
    type: 'bytea',
  })
  data: Uint8Array;
}
