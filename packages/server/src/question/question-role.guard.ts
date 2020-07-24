import { Injectable } from '@nestjs/common';
import { UserModel } from '../profile/user.entity';
import { RolesGuard } from 'guards/role.guard';
import { QuestionModel } from './question.entity';
import { QueueModel } from 'queue/queue.entity';

@Injectable()
export class QuestionRolesGuard extends RolesGuard {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async setupData(
    request: any,
  ): Promise<{ courseId: number; user: UserModel }> {
    const question = await QuestionModel.findOne(request.params.questionId);
    const queue = await QueueModel.findOne(question.queueId);
    const courseId = queue.courseId;
    const user = await UserModel.findOne(request.user.userId, {
      relations: ['courses'],
    });
    return { courseId, user };
  }
}
