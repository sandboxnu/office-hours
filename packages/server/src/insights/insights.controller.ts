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
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'login/jwt-auth.guard';
import { Connection } from 'typeorm';
import {
  GetInsightResponse,
  ERROR_MESSAGES,
  ListInsightsResponse,
  Role,
} from '@koh/common';
import { User } from '../profile/user.decorator';
import { INSIGHTS_MAP } from './insights';
import { UserModel } from 'profile/user.entity';
import { Roles } from 'profile/roles.decorator';

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

  @Get('list')
  @Roles(Role.PROFESSOR)
  async getAllInsights(): Promise<ListInsightsResponse> {
    return Object.keys(INSIGHTS_MAP);
  }

  @Patch('')
  @Roles(Role.PROFESSOR)
  async toggleInsightOn(
    @Body() body: { insightName: string },
    @User() user: UserModel,
  ): Promise<ListInsightsResponse> {
    const updatedInsights = await this.insightsService.toggleInsightOn(
      user,
      body.insightName,
    );
    return updatedInsights;
  }

  @Delete('')
  @Roles(Role.PROFESSOR)
  async toggleInsightOff(
    @Body() body: { insightName: string },
    @User() user: UserModel,
  ): Promise<ListInsightsResponse> {
    const updatedInsights = await this.insightsService.toggleInsightOff(
      user,
      body.insightName,
    );
    return updatedInsights;
  }
}
