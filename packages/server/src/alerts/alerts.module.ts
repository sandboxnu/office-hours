import { Module } from '@nestjs/common';
import { AlertsController } from './alerts.controller';

@Module({
  controllers: [AlertsController],
})
export class AlertsModule {}
