import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { InteractionModel } from './interaction.entity';
import { ChatbotQuestionModel } from './question.entity';
import { ChatBotQuestionParams, InteractionParams } from '@koh/common';
import { question } from 'readline-sync';

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
    @Body() body: { userScore: number; suggested: boolean },
  ): Promise<ChatbotQuestionModel> {
    return await this.ChatbotService.createQuestion(body);
  }

  @Patch('question')
  async editQuestion(
    @Body()
    body: {
      data: { userScore: number; suggested: boolean };
      questionId: number;
    },
  ) {
    return await this.ChatbotService.editQuestion(body.data, body.questionId);
  }

  @Delete('question')
  async deleteQuestion(@Body() body: { questionId: number }) {
    return await this.ChatbotService.deleteQuestion(body.questionId);
  }
}
