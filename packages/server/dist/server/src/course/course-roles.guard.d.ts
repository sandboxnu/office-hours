import { RolesGuard } from '../guards/role.guard';
import { UserModel } from '../profile/user.entity';
export declare class CourseRolesGuard extends RolesGuard {
    setupData(request: any): Promise<{
        courseId: number;
        user: UserModel;
    }>;
}
