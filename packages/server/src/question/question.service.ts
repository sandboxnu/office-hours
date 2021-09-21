import {
  ClosedQuestionStatus,
  ERROR_MESSAGES,
  LimboQuestionStatus,
  OpenQuestionStatus,
  QuestionStatus,
  Role,
} from '@koh/common';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  NotificationService,
  NotifMsgs,
} from 'notification/notification.service';
import { UserModel } from 'profile/user.entity';
import { Connection } from 'typeorm';
import { QuestionModel } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    private connection: Connection,
    private notifService: NotificationService,
  ) {}

  async changeStatus(
    status: QuestionStatus,
    question: QuestionModel,
    userId: number,
  ): Promise<QuestionModel> {
    const oldStatus = question.status;
    const newStatus = status;
    // If the taHelped is already set, make sure the same ta updates the status
    if (question.taHelped?.id !== userId) {
      if (oldStatus === OpenQuestionStatus.Helping) {
        throw new UnauthorizedException(
          ERROR_MESSAGES.questionController.updateQuestion.otherTAHelping,
        );
      }
      if (oldStatus === ClosedQuestionStatus.Resolved) {
        throw new UnauthorizedException(
          ERROR_MESSAGES.questionController.updateQuestion.otherTAResolved,
        );
      }
    }

    const validTransition = question.changeStatus(newStatus, Role.TA);
    if (!validTransition) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.questionController.updateQuestion.fsmViolation(
          'TA',
          question.status,
          status,
        ),
      );
    }

    // Set TA as taHelped when the TA starts helping the student
    if (
      oldStatus !== OpenQuestionStatus.Helping &&
      newStatus === OpenQuestionStatus.Helping
    ) {
      question.taHelped = await UserModel.findOne(userId);
      question.helpedAt = new Date();

      // Set firstHelpedAt if it hasn't already
      if (!question.firstHelpedAt) {
        question.firstHelpedAt = question.helpedAt;
      }
      await this.notifService.notifyUser(
        question.creator.id,
        NotifMsgs.queue.TA_HIT_HELPED(question.taHelped.name),
      );
    }
    if (newStatus in ClosedQuestionStatus) {
      question.closedAt = new Date();
    }
    if (newStatus in LimboQuestionStatus) {
      // depends on if the question was passed in with its group preloaded
      if (question.group) question.group = null;
      else question.groupId = null;
    }
    try {
      await question.save();
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.questionController.saveQError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return question;
  }

  async validateNotHelpingOther(
    newStatus: QuestionStatus,
    userId: number,
  ): Promise<void> {
    const isAlreadyHelpingOne =
      (await QuestionModel.count({
        where: {
          taHelpedId: userId,
          status: OpenQuestionStatus.Helping,
        },
      })) === 1;
    if (isAlreadyHelpingOne && newStatus === OpenQuestionStatus.Helping) {
      throw new BadRequestException(
        ERROR_MESSAGES.questionController.updateQuestion.taHelpingOther,
      );
    }
  }
}
