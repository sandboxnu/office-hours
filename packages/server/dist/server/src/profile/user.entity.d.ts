import { BaseEntity } from 'typeorm';
import { DesktopNotifModel } from '../notification/desktop-notif.entity';
import { PhoneNotifModel } from '../notification/phone-notif.entity';
import { QueueModel } from '../queue/queue.entity';
import { EventModel } from './event-model.entity';
import { UserCourseModel } from './user-course.entity';
export declare class UserModel extends BaseEntity {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    photoURL: string;
    courses: UserCourseModel[];
    desktopNotifsEnabled: boolean;
    phoneNotifsEnabled: boolean;
    desktopNotifs: DesktopNotifModel[];
    phoneNotif: PhoneNotifModel;
    queues: QueueModel[];
    events: EventModel[];
    name: string;
    setFullNames(): void;
}
