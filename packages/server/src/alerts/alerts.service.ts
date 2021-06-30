import {
  Alert,
  AlertPayload,
  AlertType,
  RephraseQuestionPayload,
} from '@koh/common';
import { Injectable } from '@nestjs/common';
import { QuestionModel } from 'question/question.entity';
import { Connection } from 'typeorm';
import { QueueModel } from '../queue/queue.entity';
import { AlertModel } from './alerts.entity';

@Injectable()
export class AlertsService {
  constructor(private connection: Connection) {}

  async removeStaleAlerts(alerts: AlertModel[]): Promise<Alert[]> {
    const nonStaleAlerts = [];

    for (const alert of alerts) {
      // Might be one of the few usecases for ReasonML

      switch (alert.alertType) {
        case AlertType.REPHRASE_QUESTION:
          const payload = alert.payload as RephraseQuestionPayload;
          const question = await QuestionModel.findOne(payload.questionId);

          const queue = await QueueModel.findOne(payload.queueId);
          const isQueueOpen = await queue?.checkIsOpen();
          if (question.closedAt || !isQueueOpen) {
            console.log(
              `Rephrase Question alert with id ${
                alert.id
              } expired ${isQueueOpen} ${JSON.stringify(question)}`,
            );
            if (!question.closedAt) {
              question.closedAt = new Date();
              await question.save();
            }
            alert.resolved = new Date();
            await alert.save();
          } else {
            nonStaleAlerts.push(alert);
          }
          break;
      }
    }

    return nonStaleAlerts;
  }

  assertPayloadType(alertType: AlertType, payload: AlertPayload): boolean {
    switch (alertType) {
      case AlertType.REPHRASE_QUESTION:
        const castPayload = payload as RephraseQuestionPayload;

        return (
          !!castPayload.courseId &&
          !!castPayload.questionId &&
          !!castPayload.queueId &&
          typeof castPayload.courseId === 'number' &&
          typeof castPayload.questionId === 'number' &&
          typeof castPayload.queueId === 'number'
        );
    }
  }
}
