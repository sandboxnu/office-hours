import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { UserModel } from 'profile/user.entity';

@Injectable()
export class BackfillMakeEmptyPhotoURLNull {
  @Command({
    command: 'backfill:make-empty-photoURL-null',
    describe: 'changes empty string photoURLs to null',
    autoExit: true,
  })
  async fix(): Promise<void> {
    let countOfChanged = 0;

    const users = await UserModel.find();
    users.forEach((user) => {
      if (user.photoURL === '') {
        user.photoURL = null;
        countOfChanged += 1;
      }
    });

    await UserModel.save(users);

    console.log(`Updated names for ${countOfChanged} users`);
  }
}
