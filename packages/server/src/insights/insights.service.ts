import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InsightInterface } from './insights';
import { UserModel } from 'profile/user.entity';

// interface generateAllInsightsParams {
//   insights: InsightInterface<any>[];
//   filters: any;  // TODO
// }

@Injectable()
export class InsightsService {
  constructor(private connection: Connection) {}

  async generateOutput({ insight, filters }): Promise<any> {
    const queryBuilder = await insight.model
      .getRepository()
      .createQueryBuilder();

    const output = await insight.compute(queryBuilder, filters);
    return output;
  }

  async generateInsight({ insight, filters }): Promise<any> {
    const output = await this.generateOutput({ insight, filters });
    return { output, ...insight };
  }

  async generateAllInsights({ insights, filters }): Promise<any> {
    const insightsWithOutput = {};
    await Promise.all(
      insights.map(async (insight) => {
        const output = await this.generateOutput({ insight, filters });
        insightsWithOutput[insight.name] = { output, ...insight };
      }),
    );
    return insightsWithOutput;
  }

  async toggleInsightOn(user: UserModel, insightName: string): Promise<any> {
    if (user.insights === null) {
      user.insights = [];
    }
    user.insights = [insightName, ...user.insights];
    await user.save();
    return user.insights;
  }

  async toggleInsightOff(user: UserModel, insightName: string): Promise<any> {
    user.insights = user.insights?.filter((insight) => insight !== insightName);
    await user.save();
    return user.insights;
  }
}
