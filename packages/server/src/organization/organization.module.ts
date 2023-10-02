import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Module({
  imports: [],
  controllers: [],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
