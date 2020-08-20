import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from '../profile/user.entity';
import { RolesGuard } from '../guards/role.guard';

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
