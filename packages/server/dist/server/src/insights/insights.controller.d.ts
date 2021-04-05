import { InsightsService } from './insights.service';
import { Connection } from 'typeorm';
import { GetInsightOutputResponse, ListInsightsResponse, Role } from '@koh/common';
import { UserModel } from 'profile/user.entity';
export declare class InsightsController {
    private connection;
    private insightsService;
    constructor(connection: Connection, insightsService: InsightsService);
    get(role: Role, courseId: number, insightName: string, start: string, end: string): Promise<GetInsightOutputResponse>;
    getAllInsights(): Promise<ListInsightsResponse>;
    toggleInsightOn(body: {
        insightName: string;
    }, user: UserModel): Promise<void>;
    toggleInsightOff(body: {
        insightName: string;
    }, user: UserModel): Promise<void>;
}
