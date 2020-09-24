import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { DesktopNotifModel } from 'notification/desktop-notif.entity';
import { PhoneNotifModel } from 'notification/phone-notif.entity';
import { IsNull } from 'typeorm';

@Injectable()
export class BackfillPhoneNotifs {
  @Command({
    command: 'backfill:phone-notifs',
    describe:
      'delete phone notifs with no userids, delete duplicate phone notifs, and forcibly set verified on existing phonenotifs',
    autoExit: true,
  })
  async fix(): Promise<void> {
    const noUser = await PhoneNotifModel.delete({ userId: IsNull() });
    console.log(`deleted ${noUser.affected} desktopnotifmodels with no userid`);

    const dups = await PhoneNotifModel.createQueryBuilder('pnotif')
      .select([`"phoneNumber"`, 'COUNT(*)'])
      .groupBy('pnotif.phoneNumber')
      .having('COUNT(*) > 1')
      .getMany();
    console.log(`found ${dups.length} dups`);
    if (dups.length > 0) {
      await DesktopNotifModel.delete(dups.map(d => d.id));
    }

    const goodOnes = await PhoneNotifModel.createQueryBuilder('pnotif')
      .update()
      .set({ verified: true })
      .execute();
    console.log(`set verified for ${goodOnes.affected} phonenotifs`);
  }
}
