import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InsightInterface } from './insights';

// interface generateInsightsForParams {
//   insights: InsightInterface<any>[];
//   filters: any;  // TODO
// }

@Injectable()
export class InsightsService {
  constructor(private connection: Connection) {}
  // Outputs all the data insight output values for a given list of strings
  async generateInsightsFor({ insights, filters }): Promise<any> {
    const insightsWithOutput = {};
    await Promise.all(
      insights.map(async (insight) => {
        const queryBuilder = await insight.model
          .getRepository()
          .createQueryBuilder();

        const output = await insight.compute(queryBuilder, filters);
        insightsWithOutput[insight.name] = { output, ...insight };
      }),
    );
    return insightsWithOutput;
  }
}
