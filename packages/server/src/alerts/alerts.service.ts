import { Alert, AlertType, RephraseQuestionPayload } from '@koh/common';
import { Injectable } from '@nestjs/common';
import { QuestionModel } from 'question/question.entity';
import { QueueModel } from '../queue/queue.entity';
import { Connection } from 'typeorm';

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
          // QUESTION: is there a better way of detecting if the question is stale due to
          // the queue being closed and then re-opened? I think queue cleaning will
          // solve this issue, but... who knows?
          const queue = await QueueModel.findOne(payload.queueId);
          if (question.closedAt || !(await queue.checkIsOpen())) {
            console.log(`Rephrase Question alert with id ${alert.id} expired`);
          } else {
            nonStaleAlerts.push(alert);
          }
      }
    }

    return nonStaleAlerts;
  }
}
