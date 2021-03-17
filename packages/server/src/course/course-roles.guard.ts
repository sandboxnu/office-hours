import { Injectable, NotFoundException } from '@nestjs/common';
import { RolesGuard } from '../guards/role.guard';
import { UserModel } from '../profile/user.entity';

@Injectable()
export class CourseRolesGuard extends RolesGuard {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async setupData(
    request: any,
  ): Promise<{ courseId: number; user: UserModel }> {
    const user = await UserModel.findOne(request.user.userId, {
      relations: ['courses'],
    });

    const courseId = request.params.id;
    return { courseId, user };
  }
}
