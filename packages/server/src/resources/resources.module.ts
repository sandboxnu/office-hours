import { Module, HttpModule } from '@nestjs/common';
import { ResourcesController } from './resources.controller';

@Module({
  controllers: [ResourcesController],
  providers: [],
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
})
export class ResourcesModule {}
