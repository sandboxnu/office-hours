import { BaseEntity } from 'typeorm';
import { UserModel } from '../profile/user.entity';
export declare class PhoneNotifModel extends BaseEntity {
    id: number;
    phoneNumber: string;
    user: UserModel;
    userId: number;
    verified: boolean;
}
