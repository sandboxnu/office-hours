import { InsightsService } from "./insights.service";
import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Get } from "@nestjs/common";
import { JwtAuthGuard } from "login/jwt-auth.guard";
import { Connection } from "typeorm";
import { Roles } from "profile/roles.decorator";
import { Role, GetInsightsResponse, ListInsightsResponse } from "@koh/common";
import { INSIGHTS } from "./insights";

@Controller('insights')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class InsightsController {
  constructor(
    private connection: Connection,
    private insightsService: InsightsService,
  ) {}

  @Get('')
  @Roles(Role.PROFESSOR)
  async get(): Promise<GetInsightsResponse> {
    // TODO: In the future this should take params for filtering
    // Return all the insights that a specific user has acess to
    return await this.insightsService.generateInsightsFor({
      insights: [INSIGHTS.totalUsers, INSIGHTS.questionTypeBreakdown],
      filters: [],
    });
  }

  @Get('list')
  @Roles(Role.PROFESSOR)
  async getAllInsights(): Promise<ListInsightsResponse> {
    return Object.keys(INSIGHTS)
  }
}
