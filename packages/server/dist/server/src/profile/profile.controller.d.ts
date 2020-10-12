import { Connection } from 'typeorm';
import { UserModel } from './user.entity';
import { GetProfileResponse, UpdateProfileParams } from '@koh/common';
import { NotificationService } from '../notification/notification.service';
export declare class ProfileController {
    private connection;
    private notifService;
    constructor(connection: Connection, notifService: NotificationService);
    get(user: UserModel): Promise<GetProfileResponse>;
    patch(userPatch: UpdateProfileParams, user: UserModel): Promise<GetProfileResponse>;
}
