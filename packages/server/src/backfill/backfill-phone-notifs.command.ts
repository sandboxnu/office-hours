import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { PhoneNotifModel } from 'notification/phone-notif.entity';
import { IsNull } from 'typeorm';
import { TwilioService } from 'notification/twilio/twilio.service';
import { UserModel } from 'profile/user.entity';

@Injectable()
export class BackfillPhoneNotifs {
  constructor(private twilioService: TwilioService) {}
  @Command({
    command: 'backfill:phone-notifs',
    describe:
      'delete phone notifs with no userids, delete duplicate phone notifs, and forcibly set verified on existing phonenotifs',
    autoExit: true,
  })
  async fix(): Promise<void> {
    // Delete those without userids associated
    const noUser = await PhoneNotifModel.delete({ userId: IsNull() });
    console.log(`deleted ${noUser.affected} desktopnotifmodels with no userid`);

    // delete at once
    const toDelete: PhoneNotifModel[] = [];

    // Delete duplicates
    const dups = await PhoneNotifModel.createQueryBuilder('pnotif')
      .select([`"phoneNumber"`, 'COUNT(*)'])
      .groupBy('pnotif.phoneNumber')
      .having('COUNT(*) > 1')
      .getRawMany();
    console.log(`found ${dups.length} dups`);
    toDelete.push(...dups);

    const valid = [];
    let changedNum = 0;
    // change to real number
    const all = await PhoneNotifModel.find({ relations: ['user'] });
    for (const p of all) {
      const number = await this.twilioService.getFullPhoneNumber(p.phoneNumber);
      if (number) {
        if (number !== p.phoneNumber) {
          changedNum += 1;
        }
        p.phoneNumber = number;
        p.verified = true;
        valid.push(p);
      } else {
        toDelete.push(p);
      }
    }
    console.log(`Twilio changed ${changedNum} phone numbers to full num`);
    await PhoneNotifModel.save(valid);

    // Delete and make sure to disable phonenotif for user
    console.log(
      'deleting phone notifs: ',
      toDelete.map((d) => d.phoneNumber),
    );
    if (toDelete.length) {
      await PhoneNotifModel.delete(toDelete.map((d) => d.id));
    }

    const usersToDisable = (
      await UserModel.find({
        where: { phoneNotifsEnabled: true },
        relations: ['phoneNotif'],
      })
    ).filter((u) => !u.phoneNotif);
    usersToDisable.forEach((u) => (u.phoneNotifsEnabled = false));

    await UserModel.save(usersToDisable);
    console.log(`disabled phonenotifs for ${usersToDisable.length} users`);
  }
}
