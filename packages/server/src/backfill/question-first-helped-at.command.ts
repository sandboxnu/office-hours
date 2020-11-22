import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { QuestionModel } from 'question/question.entity';
import { IsNull } from 'typeorm';

@Injectable()
export class BackfillQuestionFirstHelpedAt {
  @Command({
    command: 'backfill:question-first-helped-at',
    describe: 'copy all existing helpedAt to firstHelpedAt',
    autoExit: true,
  })
  async copy(): Promise<void> {
    await QuestionModel.createQueryBuilder()
      .update()
      .set({ firstHelpedAt: () => '"helpedAt"' })
      .where({ firstHelpedAt: IsNull() })
      .callListeners(false)
      .execute();
    console.log(
      `Updated ${await QuestionModel.createQueryBuilder()
        .select()
        .where({ firstHelpedAt: IsNull() })
        .getCount()} records`,
    );
  }
}
