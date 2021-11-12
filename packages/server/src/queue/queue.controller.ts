import {
  ERROR_MESSAGES,
  GetQueueResponse,
  ListQuestionsResponse,
  Role,
  UpdateQueueParams,
} from '@koh/common';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { UserId } from 'decorators/user.decorator';
import { Connection } from 'typeorm';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { QueueCleanService } from './queue-clean/queue-clean.service';
import { QueueRole } from '../decorators/queue-role.decorator';
import { QueueRolesGuard } from '../guards/queue-role.guard';
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
    private queueCleanService: QueueCleanService,
    private queueService: QueueService,
  ) {}

  @Get(':queueId')
  @Roles(Role.TA, Role.PROFESSOR, Role.STUDENT)
  async getQueue(@Param('queueId') queueId: number): Promise<GetQueueResponse> {
    try {
      return this.queueService.getQueue(queueId);
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.queueController.getQueue,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get(':queueId/questions')
  @Roles(Role.TA, Role.PROFESSOR, Role.STUDENT)
  async getQuestions(
    @Param('queueId') queueId: number,
    @QueueRole() role: Role,
    @UserId() userId: number,
  ): Promise<ListQuestionsResponse> {
    try {
      const questions = await this.queueService.getQuestions(queueId);
      return await this.queueService.personalizeQuestions(
        queueId,
        questions,
        userId,
        role,
      );
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.queueController.getQuestions,
        HttpStatus.NOT_FOUND,
      );
    }
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
    try {
      await queue.save();
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.queueController.saveQueue,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return queue;
  }

  @Post(':queueId/clean')
  @Roles(Role.TA, Role.PROFESSOR)
  async cleanQueue(@Param('queueId') queueId: number): Promise<void> {
    // Clean up queue if necessary
    try {
      setTimeout(async () => {
        await this.queueCleanService.cleanQueue(queueId, true);
        await this.queueSSEService.updateQueue(queueId);
      });
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.queueController.cleanQueue,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

    try {
      this.queueSSEService.subscribeClient(queueId, res, { role, userId });
    } catch (err) {
      console.error(err);
    }
  }

  @Delete(':queueId')
  @Roles(Role.TA, Role.PROFESSOR)
  async disableQueue(
    @Param('queueId') queueId: number,
    @QueueRole() role: Role,
  ): Promise<void> {
    // disable a queue
    const queue = await this.queueService.getQueue(queueId);
    if (queue === undefined) {
      throw new NotFoundException();
    }

    if (queue.isProfessorQueue) {
      if (role == Role.TA) {
        throw new HttpException(
          ERROR_MESSAGES.queueController.cannotCloseQueue,
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    queue.isDisabled = true;

    try {
      // try to save queue
      await queue.save();
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.queueController.saveQueue,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
