import { InsightsService } from './insights.service';
import {
  Controller,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'login/jwt-auth.guard';
import { Connection } from 'typeorm';
import { GetInsightResponse, ERROR_MESSAGES } from '@koh/common';
import { User } from '../profile/user.decorator';
import { INSIGHTS_MAP } from './insights';
import { UserModel } from 'profile/user.entity';

@Controller('insights')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class InsightsController {
  constructor(
    private connection: Connection,
    private insightsService: InsightsService,
  ) {}

  @Get(':courseId/:insightName')
  async get(
    @Param('courseId') courseId: number,
    @Param('insightName') insightName: string,
    @User(['courses']) user: UserModel,
    @Query() filters: any,
  ): Promise<GetInsightResponse> {
    // Check that the insight name is valid
    const insightNames = Object.keys(INSIGHTS_MAP);
    if (!insightNames.includes(insightName)) {
      throw new BadRequestException(
        ERROR_MESSAGES.insightsController.insightNameNotFound,
      );
    }
    // Check that the current user's role has access to the given insight
    const role = user.courses.find((course) => course.courseId === courseId)
      .role;
    if (!INSIGHTS_MAP[insightName].roles.includes(role)) {
      throw new BadRequestException(
        ERROR_MESSAGES.insightsController.insightUnathorized,
      );
    }

    const insight = await this.insightsService.generateInsight({
      insight: INSIGHTS_MAP[insightName],
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
