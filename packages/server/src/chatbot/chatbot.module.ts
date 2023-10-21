import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
