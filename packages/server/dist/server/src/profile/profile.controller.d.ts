import { GetProfileResponse, UpdateProfileParams } from '@koh/common';
import { Connection } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { UserModel } from './user.entity';
export declare class ProfileController {
    private connection;
    private notifService;
    constructor(connection: Connection, notifService: NotificationService);
    get(user: UserModel): Promise<GetProfileResponse>;
    patch(userPatch: UpdateProfileParams, user: UserModel): Promise<GetProfileResponse>;
}
