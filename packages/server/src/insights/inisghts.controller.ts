import { InsightsService } from './insights.service';
import {
  Controller,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'login/jwt-auth.guard';
import { Connection } from 'typeorm';
import { Roles } from 'profile/roles.decorator';
import { Role, GetInsightsResponse, QuestionType } from '@koh/common';

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
    return [
      {
        name: 'totalStudents',
        displayName: 'Total Students',
        description: 'Gets the total number of students',
        component: 'SimpleDisplay',
        output: 188,
      },
      {
        name: 'questionTypes',
        displayName: 'question types',
        description: '',
        component: 'SimpleChart',
        output: {
          // data is the output of the query

          data: [
            { questionType: QuestionType.Bug, earnings: 13000 },
            { quarter: 2, earnings: 16500 },
            { quarter: 3, earnings: 14250 },
            { quarter: 4, earnings: 19000 },
          ],
          tickFormat: ['a', 'b', 'c', 'd'],
        },
      },
    ];
  }

  // TODO: Add update endpoint so users can show/hide or reorder thier insights
}
