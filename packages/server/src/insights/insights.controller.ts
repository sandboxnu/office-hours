import { InsightsService } from './insights.service';
import {
  Controller,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'login/jwt-auth.guard';
import { Connection } from 'typeorm';
import { Roles } from 'profile/roles.decorator';
import { Role, GetInsightResponse, ERROR_MESSAGES } from '@koh/common';
import { INSIGHTS } from './insights';

@Controller('insights')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class InsightsController {
  constructor(
    private connection: Connection,
    private insightsService: InsightsService,
  ) {}

  @Get(':courseId/:insightName')
  @Roles(Role.PROFESSOR)
  async get(
    @Param('courseId') courseId: number,
    @Param('insightName') insightName: string,
    @Query() filters: any,
  ): Promise<GetInsightResponse> {
    // // TODO: Check that the current role is allowed to see the given insight
    // if (INSIGHTS[insightName].Roles.includes(role)) {
    //   throw new BadRequestException(
    //     ERROR_MESSAGES.insightsController.insightUnathorized
    //   )
    // }

    const insight = await this.insightsService.generateInsight({
      insight: INSIGHTS[insightName],
      filters: [
        {
          type: 'courseId',
          courseId,
        },
      ],
    });

    return insight;
  }
}
