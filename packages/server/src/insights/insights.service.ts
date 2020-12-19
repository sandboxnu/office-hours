import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InsightInterface } from './insights';

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
}
