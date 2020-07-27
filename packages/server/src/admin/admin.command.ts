import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AdminUserModel } from './admin-user.entity';
import {createInterface} from 'readline';

@Injectable()
export class AdminCommand {
  // autoExit defaults to `true`, but you can use `autoExit: false` if you need more control
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
    console.log('Password: ');
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const it = rl[Symbol.asyncIterator]();
    const password = await it.next();
    const user = await AdminUserModel.createFromPassword({
      username,
      password: password.value,
    }).save();
    console.log(`created user ${user.username}`);
  }
}
