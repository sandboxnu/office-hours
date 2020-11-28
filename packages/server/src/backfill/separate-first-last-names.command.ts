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
        return {
          ...user,
          name: '',
          firstName: user.name.split[0],
          lastName: user.name.split[1],
        };
      } catch (e) {
        return {
          ...user,
          name: '',
          firstName: user.name,
          lastName: '',
        };
      }
    });

    await UserModel.save(users);

    console.log(`Updated user names`);
  }
}
