import { InsightsService } from './insights.service';
import {
  Controller,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'login/jwt-auth.guard';
import { Connection } from 'typeorm';
import { Roles } from 'profile/roles.decorator';
import {
  Role,
  GetInsightsResponse,
  ListInsightsResponse,
  ERROR_MESSAGES,
} from '@koh/common';
import { INSIGHTS } from './insights';
import { UserModel } from 'profile/user.entity';
import { User } from '../profile/user.decorator';
import { CourseRole } from './course-role.decorator';

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
    @CourseRole() role: Role,
  ): Promise<GetInsightsResponse> {
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
          conditional: `"courseId" = ${courseId}`,
        },
      ],
    });

    return insight;
  }

  @Get('list')
  @Roles(Role.PROFESSOR)
  async getAllInsights(): Promise<ListInsightsResponse> {
    return Object.keys(INSIGHTS);
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
