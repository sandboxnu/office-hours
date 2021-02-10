import { BaseEntity } from 'typeorm';
import { CourseModel } from '../course/course.entity';
import { OfficeHourModel } from '../course/office-hour.entity';
import { UserModel } from '../profile/user.entity';
import { QuestionModel } from '../question/question.entity';
export declare class QueueModel extends BaseEntity {
    id: number;
    course: CourseModel;
    courseId: number;
    room: string;
    questions: QuestionModel[];
    notes: string;
    staffList: UserModel[];
    allowQuestions: boolean;
    officeHours: OfficeHourModel[];
    isProfessorQueue: boolean;
    startTime: Date;
    endTime: Date;
    isOpen: boolean;
    checkIsOpen(): Promise<boolean>;
    areThereOfficeHoursRightNow(now?: Date): Promise<boolean>;
    queueSize: number;
    addQueueSize(): Promise<void>;
    addQueueTimes(): Promise<void>;
    private getOfficeHours;
    private generateMergedTimeIntervals;
}
