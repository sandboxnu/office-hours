import { RolesGuard } from './role.guard';
import { UserModel } from '../profile/user.entity';
export declare class QuestionRolesGuard extends RolesGuard {
    setupData(request: any): Promise<{
        courseId: number;
        user: UserModel;
    }>;
}
