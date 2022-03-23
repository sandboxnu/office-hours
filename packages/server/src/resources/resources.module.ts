import { Module, HttpModule, CacheModule } from '@nestjs/common';
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
    CacheModule.register(),
  ],
})
export class ResourcesModule {}
