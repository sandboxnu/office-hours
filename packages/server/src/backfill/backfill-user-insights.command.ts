import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { UserModel } from 'profile/user.entity';

@Injectable()
export class BackfillUserInsights {
  @Command({
    command: 'backfill:user-insights',
    describe: "sets a user's insights attribute to null",
    autoExit: true,
  })
  async copy(): Promise<void> {
    await UserModel.createQueryBuilder()
      .update()
      .set({ insights: null })
      .callListeners(false)
      .execute();
    console.log(`Updated ${await UserModel.count()} users`);
  }
}
