import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Filter, INSIGHTS_MAP } from './insight-objects';
import {
  PossibleOutputTypes,
  InsightObject,
  ListInsightsResponse,
} from '@koh/common';
import { UserModel } from 'profile/user.entity';
import { Cache } from 'cache-manager';

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
  constructor(
    private connection: Connection,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // Compute the output data for an insight and add it to the insight response
  async computeOutput({
    insight,
    filters,
  }: ComputeOutputParams): Promise<PossibleOutputTypes> {
    const output = await insight.compute(filters, this.cacheManager);
    return output;
  }

  async generateAllInsights({
    insights,
    filters,
  }: GenerateAllInsightParams): Promise<PossibleOutputTypes[]> {
    return await Promise.all(
      insights.map(
        async (insight) => await this.computeOutput({ insight, filters }),
      ),
    );
  }

  convertToInsightsListResponse(insightNames: string[]): ListInsightsResponse {
    return insightNames.reduce((obj, insightName) => {
      const { displayName, description, component, size } =
        INSIGHTS_MAP[insightName];
      return {
        ...obj,
        [insightName]: {
          displayName,
          description,
          component,
          size,
        },
      };
    }, {});
  }

  async toggleInsightOn(
    user: UserModel,
    insightName: string,
  ): Promise<string[]> {
    user.hideInsights = user.hideInsights?.filter(
      (insight) => insight !== insightName,
    );
    await user.save();
    return;
  }

  async toggleInsightOff(user: UserModel, insightName: string): Promise<void> {
    if (user.hideInsights === null) {
      user.hideInsights = [];
    }
    user.hideInsights = [insightName, ...user.hideInsights];
    await user.save();
    return;
  }
}
