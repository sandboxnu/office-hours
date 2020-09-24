
import { Module } from '@nestjs/common';
import { BackfillPhoneNotifs } from './backfill-phone-notifs.command';

@Module({
  providers: [BackfillPhoneNotifs],
})
export class BackfillModule {}
