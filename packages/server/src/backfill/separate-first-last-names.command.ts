import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { UserModel } from 'profile/user.entity';

@Injectable()
export class BackfillSeparateFirstLastNames {
  @Command({
    command: 'backfill:first-last-names',
    describe: 'change all names to first and last names',
    autoExit: true,
  })
  async fix(): Promise<void> {
    const users = await UserModel.find();
    users.forEach((user) => {
      try {
        user.firstName = user.name.split(' ')[0];
        user.lastName = user.name.split(' ').slice(1).join(' ');
      } catch (e) {
        user.firstName = user.name;
      }
    });

    await UserModel.save(users);
    const count = UserModel.count();

    console.log(`Updated names for ${count} users`);
  }
}
