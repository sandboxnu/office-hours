import { ERROR_MESSAGES } from '@koh/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RolesGuard } from './role.guard';
import { UserModel } from '../profile/user.entity';
import { QueueModel } from '../queue/queue.entity';

@Injectable()
export class QueueRolesGuard extends RolesGuard {
  async setupData(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    request: any,
  ): Promise<{ courseId: number; user: UserModel }> {
    const queue = await QueueModel.findOne(request.params.queueId);
    if (!queue) {
      throw new NotFoundException(ERROR_MESSAGES.queueRoleGuard.queueNotFound);
    }
    const courseId = queue.courseId;
    const user = await UserModel.findOne(request.user.userId, {
      relations: ['courses'],
    });

    return { courseId, user };
  }
}
