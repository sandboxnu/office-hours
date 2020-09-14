import {
  Injectable,
  NotFoundException,
  BadRequestException,
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
    let queueId;

    if (request.params.questionId) {
      const question = await QuestionModel.findOne(request.params.questionId);
      if (!question) {
        throw new NotFoundException('Question not found');
      }
      queueId = question.queueId;
    } else if (request.body.queueId) {
      // If you are creating a new question
      queueId = request.body.queueId;
    } else {
      throw new BadRequestException('Cannot find queue of question');
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
