import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Filter, InsightInterface, INSIGHTS_MAP } from './insight-objects';
import { ListInsightsResponse } from '@koh/common';
import { UserModel } from 'profile/user.entity';

type GenerateOutputParams = {
  insight: InsightInterface,
  filters: Filter[]
}

@Injectable()
export class InsightsService {
  constructor(private connection: Connection) {}

  // Compute the output data for an insight and add it to the insight response
  async computeOutput({ insight, filters }: GenerateOutputParams): Promise<any> {
    const output = await insight.compute(filters);
    return { output, ...insight };
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
