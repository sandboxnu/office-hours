import {
  Controller,
  UseGuards,
  Get,
  InternalServerErrorException,
  HttpService,
} from '@nestjs/common';
import { JwtAuthGuard } from 'login/jwt-auth.guard';
import { Connection } from 'typeorm';
import { GetReleaseNotesResponse } from '@koh/common';

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
        data['beae2a02-249e-4b61-9bfc-81258d93f20d']?.value?.properties
          ?.title[0][0];
      response.lastUpdatedUnixTime = timeText.split('Unix ')[1] * 1000;
    } catch (e) {
      throw new InternalServerErrorException(
        'Error Parsing release notes time: ' + e,
      );
    }
    // Remove the time block and page link block from page
    data['beae2a02-249e-4b61-9bfc-81258d93f20d'].value.properties.title = [];
    data['4d25f393-e570-4cd5-ad66-b278a0924225'].value.properties.title = [];
    response.releaseNotes = data;
    return response;
  }
}
