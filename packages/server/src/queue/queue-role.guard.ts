import { Injectable } from '@nestjs/common';
import { UserModel } from '../profile/user.entity';
import { RolesGuard } from 'guards/role.guard';
import { QueueModel } from './queue.entity';

@Injectable()
export class QueueRolesGuard extends RolesGuard {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async setupData(
    request: any,
  ): Promise<{ courseId: number; user: UserModel }> {
    const queue = await QueueModel.findOne(request.params.queueId);
    const courseId = queue.courseId;
    const user = await UserModel.findOne(request.user.userId, {
      relations: ['courses'],
    });
    return { courseId, user };
  }
}
