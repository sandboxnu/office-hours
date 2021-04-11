import { ERROR_MESSAGES } from '@koh/common';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RolesGuard } from './role.guard';
import { UserModel } from '../profile/user.entity';
import { QueueModel } from '../queue/queue.entity';
import { QuestionModel } from '../question/question.entity';

@Injectable()
export class QuestionRolesGuard extends RolesGuard {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async setupData(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    request: any,
  ): Promise<{ courseId: number; user: UserModel }> {
    let queueId;

    if (request.params.questionId) {
      const question = await QuestionModel.findOne(request.params.questionId);
      if (!question) {
        throw new NotFoundException(
          ERROR_MESSAGES.questionRoleGuard.questionNotFound,
        );
      }
      queueId = question.queueId;
    } else if (request.body.queueId) {
      // If you are creating a new question
      queueId = request.body.queueId;
    } else {
      throw new BadRequestException(
        ERROR_MESSAGES.questionRoleGuard.queueOfQuestionNotFound,
      );
    }

    const queue = await QueueModel.findOne(queueId);

    // You cannot interact with a question in a nonexistent queue
    if (!queue) {
      throw new NotFoundException(
        ERROR_MESSAGES.questionRoleGuard.queueDoesNotExist,
      );
    }
    const courseId = queue.courseId;
    const user = await UserModel.findOne(request.user.userId, {
      relations: ['courses'],
    });

    return { courseId, user };
  }
}
