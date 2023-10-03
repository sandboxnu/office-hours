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
    @Body() body: ChatBotQuestionParams,
  ): Promise<ChatbotQuestionModel> {
    return await this.ChatbotService.createQuestion(body);
  }

  @Post('feedback')
  async addFeedback(@Body() body: { questionId: number; userScore: number }) {
    return await this.ChatbotService.addFeedback(
      body.questionId,
      body.userScore,
    );
  }

  @Post('predeterminedQuestion')
  async createPredeterminedQuestion(
    @Body() body: { question: string; answer: string },
  ) {
    return await this.ChatbotService.createPredeterminedQuestion({
      question: body.question,
      answer: body.answer,
    });
  }

  @Patch('predeterminedQuestion')
  async editPredeterminedQuestion(
    @Body()
    body: {
      predeterminedQuestionId: number;
      question: string;
      answer: string;
    },
  ) {
    return await this.ChatbotService.editPredeterminedQuestion({
      predeterminedQuestionId: body.predeterminedQuestionId,
      question: body.question,
      answer: body.answer,
    });
  }

  @Delete('predeterminedQuestion')
  async deletePredeterminedQuestion(
    @Body() body: { predeterminedQuestionId: number },
  ) {
    return await this.ChatbotService.deletePredeterminedQuestion({
      predeterminedQuestionId: body.predeterminedQuestionId,
    });
  }
}
