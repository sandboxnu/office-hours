import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Delete,
  Param,
  Query,
  Get,
} from '@nestjs/common';
import { ChatDocument, ChatQuestion, ChatbotService } from './chatbot.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { InteractionModel } from './interaction.entity';
import { ChatbotQuestionModel } from './question.entity';
import { ChatBotQuestionParams, InteractionParams } from '@koh/common';
import { question } from 'readline-sync';
import { ChatbotDocumentModel } from './chatbotDocument.entity';

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

  @Get('question')
  async getQuestions(
    @Query('questionText') questionText: string,
    @Query('pageSize') pageSize: number,
    @Query('currentPage') currentPage: number,
  ): Promise<{ chatQuestions: ChatQuestion[]; total: number }> {
    return await this.ChatbotService.getQuestions(
      questionText,
      pageSize,
      currentPage,
    );
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

  @Get(':courseId/document')
  async getDocuments(
    @Param('courseId') courseId: number,
    @Query('searchText') searchText: string,
    @Query('pageSize') pageSize: number,
    @Query('currentPage') currentPage: number,
  ): Promise<{ chatDocuments: ChatDocument[]; total: number }> {
    return await this.ChatbotService.getDocuments(
      courseId,
      searchText,
      pageSize,
      currentPage,
    );
  }

  @Post('document')
  async addDocument(
    @Body() body: any, //ChatbotQuestionParams
  ): Promise<ChatbotDocumentModel> {
    return await this.ChatbotService.addDocument(body.data, body.courseId);
  }

  @Delete('document')
  async deleteDocument(@Body() body: { documentId: number }) {
    return await this.ChatbotService.deleteDocument(body.documentId);
  }
}
