import { Alert, AlertType, RephraseQuestionPayload } from '@koh/common';
import { Injectable } from '@nestjs/common';
import { QuestionModel } from 'question/question.entity';
import { Connection } from 'typeorm';
import { QueueModel } from '../queue/queue.entity';

@Injectable()
export class AlertsService {
  constructor(private connection: Connection) {}

  async removeStaleAlerts(alerts: Alert[]): Promise<Alert[]> {
    const nonStaleAlerts = [];

    for (const alert of alerts) {
      // Might be one of the few usecases for ReasonML

      switch (alert.alertType) {
        case AlertType.REPHRASE_QUESTION:
          const payload = alert.payload as RephraseQuestionPayload;
          const question = await QuestionModel.findOne(payload.questionId);

          const queue = await QueueModel.findOne(payload.queueId);
          if (question.closedAt || !(await queue.checkIsOpen())) {
            console.log(`Rephrase Question alert with id ${alert.id} expired`);
            if (!question.closedAt) {
              question.closedAt = new Date();
              await question.save();
            }
          } else {
            nonStaleAlerts.push(alert);
          }
      }
    }

    return nonStaleAlerts;
  }
}
