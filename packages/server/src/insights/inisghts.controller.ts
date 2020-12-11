import { InsightsService } from "./insights.service";
import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Get } from "@nestjs/common";
import { JwtAuthGuard } from "login/jwt-auth.guard";
import { Connection } from "typeorm";
import { Roles } from "profile/roles.decorator";
import { Role, GetInsightsResponse } from "@koh/common";


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
  async get(): Promise<GetInsightsResponse> {  // TODO: In the future this should take params for filtering
      // Return all the insights that a specific user has acess to
      return [
        {
        name: 'totalStudents',
        displayName: 'Total Students',
        description: 'Gets the total number of students',
        component: 'SimpleDisplay',
        output: 188
      }
    ]
  };

  // TODO: Add update endpoint so users can show/hide or reorder thier insights
}