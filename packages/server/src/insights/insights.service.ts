import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Filter, INSIGHTS_MAP } from './insight-objects';
import { Insight, InsightObject, ListInsightsResponse } from '@koh/common';
import { UserModel } from 'profile/user.entity';

type ComputeOutputParams = {
  insight: InsightObject;
  filters: Filter[];
};

type GenerateAllInsightParams = {
  insights: InsightObject[];
  filters: Filter[];
};

@Injectable()
export class InsightsService {
  constructor(private connection: Connection) {}

  // Compute the output data for an insight and add it to the insight response
  async computeOutput({
    insight,
    filters,
  }: ComputeOutputParams): Promise<Insight> {
    const output = await insight.compute(filters);
    return { output, ...insight };
  }

  async generateAllInsights({
    insights,
    filters,
  }: GenerateAllInsightParams): Promise<any> {
    return await Promise.all(
      insights.map(
        async (insight) => await this.computeOutput({ insight, filters }),
      ),
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
