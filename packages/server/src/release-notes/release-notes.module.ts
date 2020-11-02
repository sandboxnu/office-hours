import { Module, HttpModule } from '@nestjs/common';
import { ReleaseNotesController } from './release-notes.controller';

@Module({
  controllers: [ReleaseNotesController],
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
export class ReleaseNotesModule {}
