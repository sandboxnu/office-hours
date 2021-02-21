import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { UserModel } from 'profile/user.entity';

@Injectable()
export class BackfillHuskyEmailsAsNortheastern {
  @Command({
    command: 'backfill:husky-emails-to-northeastern',
    describe: 'Converts @husky.neu.edu emails to @northeastern.edu emails',
    autoExit: true,
  })
  async fix(): Promise<void> {
    const users = await UserModel.find();

    const usersToBeUpdated = users.filter((user) =>
      user.email.includes('@husky.neu.edu'),
    );

    users.forEach((user) => {
      user.email = user.email.replace('@husky.neu.edu', '@northeastern.edu');
    });

    await UserModel.save(users);
    console.log(`Updated the emails of ${usersToBeUpdated.length} users`);
  }
}
