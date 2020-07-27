import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AdminUserModel } from './admin-user.entity';
import { question, keyInYN } from 'readline-sync';

@Injectable()
export class AdminCommand {
  @Command({
    command: 'create:admin <username>',
    describe: 'create an admin user',
    autoExit: true,
  })
  async create(
    @Positional({
      name: 'username',
      describe: 'the admin username',
      type: 'string',
    })
    username: string,
  ): Promise<void> {
    let user = await AdminUserModel.findOne({ username });
    if (user) {
      const changePassword = keyInYN(
        `User ${username} already exists. Do you want to change their password?`,
      );
      if (!changePassword) {
        return;
      }
    } else {
      user = AdminUserModel.create({ username });
    }
    const password: string = question('Password: ', {
      hideEchoBack: true,
    });
    user.setPassword(password);
    await user.save();
    console.log(`Created user: ${user.username}`);
  }
}
