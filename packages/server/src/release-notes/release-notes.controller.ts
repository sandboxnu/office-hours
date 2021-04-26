import { ERROR_MESSAGES, GetReleaseNotesResponse } from '@koh/common';
import {
  Controller,
  Get,
  HttpService,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import { Connection } from 'typeorm';

@Controller('release_notes')
@UseGuards(JwtAuthGuard)
export class ReleaseNotesController {
  constructor(
    private connection: Connection,
    private httpService: HttpService,
  ) {}

  @Get()
  async getReleaseNotes(): Promise<GetReleaseNotesResponse> {
    const response: GetReleaseNotesResponse = {
      lastUpdatedUnixTime: null,
      releaseNotes: null,
    };
    const request = await this.httpService
      .get(
        'https://notion-api.splitbee.io/v1/page/abba246bfa0847baa2706ab30d0c6c7d',
      )
      .toPromise();
    const data = request.data;
    try {
      const timeText =
        data[process.env.RELEASE_NOTE_TIMESTAMP_ID]?.value?.properties
          ?.title[0][0];
      response.lastUpdatedUnixTime = timeText.split('Unix ')[1] * 1000;
    } catch (e) {
      throw new InternalServerErrorException(
        ERROR_MESSAGES.releaseNotesController.releaseNotesTime(e),
      );
    }
    // Remove the time block and page link block from page
    data[process.env.RELEASE_NOTE_TIMESTAMP_ID].value.properties.title = [];
    data[process.env.WANT_TO_SEE_MORE_ID].value.properties.title = [];
    response.releaseNotes = data;
    return response;
  }
}
