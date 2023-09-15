import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { InteractionModel } from './interaction.entity';
import { ChatbotQuestionModel } from './question.entity';
import { CourseModel } from 'course/course.entity';
import { UserModel } from 'profile/user.entity';
import { ChatBotQuestionParams, InteractionParams } from '@koh/common';

@Controller('chatbot')
@UseGuards(JwtAuthGuard)
export class ChatbotController {
  constructor(private readonly ChatbotService: ChatbotService) {}

  @Post('interaction')
  async addInteraction(
    @Body() body: InteractionParams,
  ): Promise<InteractionModel> {
    return await this.ChatbotService.createInteraction(body);
  }

  @Post('question')
  async addQuestion(
    @Body() body: ChatBotQuestionParams,
  ): Promise<ChatbotQuestionModel> {
    return await this.ChatbotService.createQuestion(body);
  }
}
