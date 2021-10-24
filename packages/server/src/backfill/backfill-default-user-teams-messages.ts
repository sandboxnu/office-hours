import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'profile/user.entity';

@Injectable()
export class BackfillDefaultUserTeamsMessages {
  @Command({
    command: 'backfill:default-user-teams-messages',
    describe: 'set default Teams chat message for all users.',
    autoExit: true,
  })
  async fix(): Promise<void> {
    const users = await UserModel.find();

    users.forEach((user) => {
      user.defaultMessage = `Hello! I'm ${user.firstName}. How can I help you today?`;
    });

    await UserModel.save(users);
  }
}
