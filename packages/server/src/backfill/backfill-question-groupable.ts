import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { QuestionModel } from 'question/question.entity';

@Injectable()
export class BackfillQuestionGroupable {
  @Command({
    command: 'backfill:question-groupable',
    describe: 'Fills in groupable column for old Questions',
    autoExit: true,
  })
  async fix(): Promise<void> {
    const questions = await QuestionModel.find();

    const questionsToUpdate = questions.filter((q) => q.groupable === null);
    questionsToUpdate.forEach((q) => (q.groupable = false));

    await QuestionModel.save(questions);
    console.log(
      `Filled in groupable for ${questionsToUpdate.length} questions`,
    );
  }
}
