import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CourseModel } from '../course/course.entity';
import { QuestionModel } from '../question/question.entity';
import { UserPartial, OpenQuestionStatus } from '@template/common';
import { Exclude, Expose } from 'class-transformer';

@Entity('queue_model')
export class QueueModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => CourseModel, (course) => course.queues)
  @JoinColumn({ name: 'courseId' })
  course: CourseModel;

  @Column({ nullable: true })
  @Exclude()
  courseId: number;

  @Column('text')
  room: string;

  @OneToMany((type) => QuestionModel, (qm) => qm.queue)
  @Exclude()
  questions: QuestionModel[];

  @Expose()
  get staffList(): UserPartial[] {
    return [
      {
        id: 54,
        name: 'Will Stenzel',
        photoURL:
          'https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=24f4b12cccbf875c7740bbfed45a993900cf0d08d11aa07c84780b3a3501f3bacca4eb33ed5effee8aa2dd195750cfbc9884dd5f2ac62c8f',
      },
      {
        id: 42,
        name: 'Grisha Zaytsev',
        photoURL:
          'https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=471f2d695fbb8a00ee740ad3ea910453986aec81ddaecf889ae98b3a1858597b12650afd0d4e59c561172f76cb1946eec217ed89bd4074c0',
      },
    ];
  }

  @Expose()
  get queueSize(): number {
    return (
      this.questions?.filter((q) => q.status in OpenQuestionStatus).length || 0
    );
  }
  // TODO: eventually figure out how staff get sent to FE as well
}
