import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  GetQueueResponse,
  ListQuestionsResponse,
  Role,
  UpdateQueueNotesParams,
} from '@template/common';
import { Response } from 'express';
import { Connection } from 'typeorm';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { Roles } from '../profile/roles.decorator';
import { QueueRolesGuard } from './queue-role.guard';
import { QueueSSEService } from './queue-sse.service';
import { QueueModel } from './queue.entity';
import { QueueService } from './queue.service';

@Controller('queues')
@UseGuards(JwtAuthGuard, QueueRolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class QueueController {
  constructor(
    private connection: Connection,
    private queueSSEService: QueueSSEService,
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
  ): Promise<ListQuestionsResponse> {
    return this.queueService.getQuestions(queueId);
  }

  @Patch(':queueId')
  @Roles(Role.TA, Role.PROFESSOR)
  async updateQueue(
    @Param('queueId') queueId: number,
    @Body() body: UpdateQueueNotesParams,
  ): Promise<QueueModel> {
    const queue = await QueueModel.findOne({
      where: { id: queueId },
    });
    if (queue === undefined) {
      throw new NotFoundException();
    }

    queue.notes = body.notes;
    await queue.save();
    return queue;
  }

  // Endpoint to send frontend receive server-sent events when queue changes
  @Get(':queueId/sse')
  sendEvent(@Param('queueId') queueId: number, @Res() res: Response): void {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    this.queueSSEService.subscribeClient(queueId, res);
  }

  @Patch(':queueId/toggleQueue')
  async toggleQueue(@Param('queueId') qid: number): Promise<boolean> {
    const queue = await QueueModel.findOne(qid);
    queue.allowQuestions = !queue.allowQuestions;
    return queue.allowQuestions;
  }
}
