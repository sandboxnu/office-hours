import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  GetQueueResponse,
  ListQuestionsResponse,
  Role,
  UpdateQueueParams,
} from '@koh/common';
import { Response } from 'express';
import { UserId } from 'profile/user.decorator';
import { Connection } from 'typeorm';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { Roles } from '../profile/roles.decorator';
import { QueueRole } from './queue-role.decorator';
import { QueueRolesGuard } from './queue-role.guard';
import { QueueSSEService } from './queue-sse.service';
import { QueueModel } from './queue.entity';
import { QueueService } from './queue.service';
import { QueueCleanService } from './queue-clean/queue-clean.service';

@Controller('queues')
@UseGuards(JwtAuthGuard, QueueRolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class QueueController {
  constructor(
    private connection: Connection,
    private queueSSEService: QueueSSEService,
    private queueCleanService: QueueCleanService,
    private queueService: QueueService,
  ) {}

  @Get(':queueId')
  @Roles(Role.TA, Role.PROFESSOR, Role.STUDENT)
  async getQueue(@Param('queueId') queueId: number): Promise<GetQueueResponse> {
    return this.queueService.getQueue(queueId);
  }

  @Get(':queueId/questions')
  @Roles(Role.TA, Role.PROFESSOR, Role.STUDENT)
  async getQuestions(
    @Param('queueId') queueId: number,
    @QueueRole() role: Role,
    @UserId() userId: number,
  ): Promise<ListQuestionsResponse> {
    const questions = await this.queueService.getQuestions(queueId);
    return this.queueService.anonymizeQuestions(questions, userId, role);
  }

  @Patch(':queueId')
  @Roles(Role.TA, Role.PROFESSOR)
  async updateQueue(
    @Param('queueId') queueId: number,
    @Body() body: UpdateQueueParams,
  ): Promise<QueueModel> {
    const queue = await this.queueService.getQueue(queueId);
    if (queue === undefined) {
      throw new NotFoundException();
    }

    queue.notes = body.notes;
    queue.allowQuestions = body.allowQuestions;
    await queue.save();
    return queue;
  }

  @Post(':queueId/clean')
  @Roles(Role.TA, Role.PROFESSOR)
  async cleanQueue(@Param('queueId') queueId: number): Promise<void> {
    // Clean up queue if necessary
    setTimeout(async () => {
      await this.queueCleanService.cleanQueue(queueId, true);
      await this.queueSSEService.updateQueue(queueId);
    });
  }

  // Endpoint to send frontend receive server-sent events when queue changes
  @Get(':queueId/sse')
  sendEvent(
    @Param('queueId') queueId: number,
    @QueueRole() role: Role,
    @UserId() userId: number,
    @Res() res: Response,
  ): void {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
      Connection: 'keep-alive',
    });

    this.queueSSEService.subscribeClient(queueId, res, { role, userId });
  }
}
