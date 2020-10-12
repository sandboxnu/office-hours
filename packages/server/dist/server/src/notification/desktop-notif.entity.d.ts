import { BaseEntity } from 'typeorm';
import { UserModel } from '../profile/user.entity';
export declare class DesktopNotifModel extends BaseEntity {
    id: number;
    endpoint: string;
    expirationTime: Date;
    p256dh: string;
    auth: string;
    user: UserModel;
    userId: number;
    createdAt: Date;
    name: string;
}
