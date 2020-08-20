import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UserModel } from '../profile/user.entity';
import { QuestionModel } from './question.entity';
import { QueueModel } from '../queue/queue.entity';
import { RolesGuard } from '../guards/role.guard';

@Injectable()
export class QuestionRolesGuard extends RolesGuard {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async setupData(
    request: any,
  ): Promise<{ courseId: number; user: UserModel }> {
    let queueId = request.params.queueId;

    //specific case when we are posting a new question to the queue
    if (request.params.questionId && queueId) {
      const question = await QuestionModel.findOne(request.params.questionId);
      queueId = question.queueId;
    }

    const queue = await QueueModel.findOne(queueId);

    // You cannot interact with a question in a nonexistent queue
    if (!queue) {
      throw new NotFoundException('This queue does not exist!');
    }
    const courseId = queue.courseId;
    const user = await UserModel.findOne(request.user.userId, {
      relations: ['courses'],
    });

    return { courseId, user };
  }
}
