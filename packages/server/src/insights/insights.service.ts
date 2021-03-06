import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InsightInterface, INSIGHTS_MAP } from './insight-classes';
import { InsightPartial, ListInsightsResponse } from '@koh/common';
import { UserModel } from 'profile/user.entity';

// interface generateAllInsightsParams {
//   insights: InsightInterface<any>[];
//   filters: any;  // TODO
// }

@Injectable()
export class InsightsService {
  constructor(private connection: Connection) {}

  // Generate the output data for an insight by calling its compute function
  async generateOutput({ insight, filters }): Promise<any> {
    const output = await insight.compute(filters);
    return output;
  }

  // Compute the output data for an insight and add it to the insight object
  async generateInsight({ insight, filters }): Promise<any> {
    const output = await this.generateOutput({ insight, filters });
    return { output, ...insight };
  }

  // Generate a map of insights that where the output has been computed
  async generateAllInsights({ insights, filters }): Promise<any> {
    return await Promise.all(
      insights.map(async (insight) => {
        const output = await this.generateOutput({ insight, filters });
        return { output, ...insight };
      }),
    );
  }

  convertToInsightsListResponse(insightNames: string[]): ListInsightsResponse {
    return insightNames.reduce(
      (obj, insightName) => ({
        ...obj,
        [insightName]: {
          displayName: INSIGHTS_MAP[insightName].displayName,
          size: INSIGHTS_MAP[insightName].size,
        },
      }),
      {},
    );
  }

  async toggleInsightOn(
    user: UserModel,
    insightName: string,
  ): Promise<string[]> {
    if (user.insights === null) {
      user.insights = [];
    }
    user.insights = [insightName, ...user.insights];
    await user.save();
    return;
  }

  async toggleInsightOff(user: UserModel, insightName: string): Promise<void> {
    user.insights = user.insights?.filter((insight) => insight !== insightName);
    await user.save();
    return;
  }
}
