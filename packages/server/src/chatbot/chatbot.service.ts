import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InteractionModel } from './interaction.entity';
import { ChatbotQuestionModel } from './question.entity';
import { CourseModel } from 'course/course.entity';
import { UserModel } from 'profile/user.entity';
import {
  ChatBotQuestionParams,
  Interaction,
  InteractionParams,
} from '@koh/common';

@Injectable()
export class ChatbotService {
  async createInteraction(data: InteractionParams): Promise<InteractionModel> {
    const course = await CourseModel.findOne(data.courseId);
    const user = await UserModel.findOne(data.userId);

    if (!course) {
      throw new HttpException(
        'Course not found based on the provided ID.',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!user) {
      throw new HttpException(
        'User not found based on the provided ID.',
        HttpStatus.NOT_FOUND,
      );
    }

    const interaction = InteractionModel.create({
      course,
      user,
      timestamp: new Date(),
    });

    return await interaction.save();
  }

  async createQuestion(
    data: ChatBotQuestionParams,
  ): Promise<ChatbotQuestionModel> {
    const interaction = await InteractionModel.findOne(data.interactionId);
    if (!interaction) {
      throw new HttpException(
        'Interaction not found based on the provided ID.',
        HttpStatus.NOT_FOUND,
      );
    }

    const question = ChatbotQuestionModel.create({
      interaction,
      interactionId: data.interactionId,
      questionText: data.questionText,
      responseText: data.responseText,
      timestamp: new Date(),
    });

    return await question.save();
  }
}
