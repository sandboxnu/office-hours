import { Injectable } from '@nestjs/common';
import { RolesGuard } from './role.guard';
import { UserModel } from '../profile/user.entity';

@Injectable()
export class CourseRolesGuard extends RolesGuard {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async setupData(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    request: any,
  ): Promise<{ courseId: number; user: UserModel }> {
    const user = await UserModel.findOne(request.user.userId, {
      relations: ['courses'],
    });

    const courseId = request.params.id;
    return { courseId, user };
  }
}
