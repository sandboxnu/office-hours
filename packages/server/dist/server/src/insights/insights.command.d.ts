import { Connection } from 'typeorm';
import { InsightsService } from './insights.service';
export declare class InsightsCommand {
    private connection;
    private insightsService;
    constructor(connection: Connection, insightsService: InsightsService);
    private generateSemesterInsights;
}
