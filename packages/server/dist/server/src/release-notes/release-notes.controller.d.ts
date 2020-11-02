import { HttpService } from "@nestjs/common";
import { Connection } from "typeorm";
import { GetReleaseNotesResponse } from "@koh/common";
export declare class ReleaseNotesController {
    private connection;
    private httpService;
    constructor(connection: Connection, httpService: HttpService);
    getReleaseNotes(): Promise<GetReleaseNotesResponse>;
}
