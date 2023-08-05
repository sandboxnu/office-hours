import { Module } from '@nestjs/common';
import { SiteAdminService } from './site-admin.service';
import { SiteAdminController } from './site-admin.controller';

@Module({
  controllers: [SiteAdminController],
  imports: [],
  providers: [SiteAdminService],
})
export class SiteAdminModule {}
