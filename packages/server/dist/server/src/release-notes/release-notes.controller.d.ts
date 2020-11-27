import { GetReleaseNotesResponse } from '@koh/common';
import { HttpService } from '@nestjs/common';
import { Connection } from 'typeorm';
export declare class ReleaseNotesController {
    private connection;
    private httpService;
    constructor(connection: Connection, httpService: HttpService);
    getReleaseNotes(): Promise<GetReleaseNotesResponse>;
}
