import { Exclude } from 'class-transformer';
import { QuestionGroupModel } from '../question/question-group.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  LessThanOrEqual,
  ManyToMany,
  ManyToOne,
  MoreThanOrEqual,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseModel } from '../course/course.entity';
import { OfficeHourModel } from '../course/office-hour.entity';
import { UserModel } from '../profile/user.entity';
import { QuestionModel } from '../question/question.entity';

interface TimeInterval {
  startTime: Date;
  endTime: Date;
}

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

  @OneToMany((type) => QuestionGroupModel, (qg) => qg.queue)
  @Exclude()
  groups: QuestionGroupModel[];

  @Column('text', { nullable: true })
  notes: string;

  @ManyToMany((type) => UserModel, (user) => user.queues)
  @JoinTable()
  staffList: UserModel[];

  @Column({ default: false })
  allowQuestions: boolean;

  @Exclude()
  @OneToMany((type) => OfficeHourModel, (oh) => oh.queue)
  @JoinTable()
  officeHours: OfficeHourModel[];

  @Column({ default: false })
  isProfessorQueue: boolean;

  startTime: Date;
  endTime: Date;

  isOpen: boolean;

  async checkIsOpen(): Promise<boolean> {
    if (this.staffList && this.staffList.length > 0) {
      this.isOpen = true;
      return true;
    }

    this.isOpen = await this.areThereOfficeHoursRightNow();
    return this.isOpen;
  }

  async areThereOfficeHoursRightNow(now = new Date()): Promise<boolean> {
    const MS_IN_MINUTE = 60000;
    const ohs = await this.getOfficeHours(now);
    return !!ohs.find(
      (e) =>
        e.startTime.getTime() - 10 * MS_IN_MINUTE < now.getTime() &&
        e.endTime.getTime() + 1 * MS_IN_MINUTE > now.getTime(),
    );
  }

  queueSize: number;

  async addQueueSize(): Promise<void> {
    this.queueSize = await QuestionModel.waitingInQueue(this.id).getCount();
  }

  public async addQueueTimes(): Promise<void> {
    const now = new Date();

    const officeHours = await this.getOfficeHours();
    const timeIntervals = this.generateMergedTimeIntervals(officeHours);
    const currTime = timeIntervals.find((group) => {
      // Find a time interval within 15 minutes of bounds to account for TA edge cases
      const lowerBound = group.startTime.getTime() - 15 * 60 * 1000;
      const upperBound = group.endTime.getTime() + 15 * 60 * 1000;
      return lowerBound <= now.getTime() && upperBound >= now.getTime();
    });

    if (currTime) {
      this.startTime = currTime.startTime;
      this.endTime = currTime.endTime;
    }
  }

  // Get Office hours in a 72hr window around now, snapped to midnight
  private async getOfficeHours(now = new Date()): Promise<OfficeHourModel[]> {
    const lowerBound = new Date(now);
    lowerBound.setUTCHours(now.getUTCHours() - 30);
    lowerBound.setUTCHours(0, 0, 0, 0);

    const upperBound = new Date(now);
    upperBound.setUTCHours(now.getUTCHours() + 30);
    upperBound.setUTCHours(0, 0, 0, 0);

    return await OfficeHourModel.find({
      where: [
        {
          queueId: this.id,
          startTime: MoreThanOrEqual(lowerBound),
          endTime: LessThanOrEqual(upperBound),
        },
      ],
      order: {
        startTime: 'ASC',
      },
    });
  }

  private generateMergedTimeIntervals(
    officeHours: OfficeHourModel[],
  ): TimeInterval[] {
    const timeIntervals: TimeInterval[] = [];
    officeHours.forEach((officeHour) => {
      if (
        timeIntervals.length == 0 ||
        officeHour.startTime > timeIntervals[timeIntervals.length - 1].endTime
      ) {
        timeIntervals.push({
          startTime: officeHour.startTime,
          endTime: officeHour.endTime,
        });
        return;
      }

      const prevGroup = timeIntervals[timeIntervals.length - 1];
      prevGroup.endTime =
        officeHour.endTime > prevGroup.endTime
          ? officeHour.endTime
          : prevGroup.endTime;
    });

    return timeIntervals;
  }

  // TODO: eventually figure out how staff get sent to FE as well
}
