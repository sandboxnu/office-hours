import { Controller, Get, Param } from '@nestjs/common';
import { pick } from 'lodash';
import { Connection } from 'typeorm';
import { Course } from './course.entity';
import { GetCourseResponse } from '@template/common';
import { Question } from '../question/question.entity';

@Controller('courses')
export class CourseController {
  constructor(private connection: Connection) {}

  @Get(':id')
  async get(@Param() params): Promise<GetCourseResponse> {
    const course = await Course.findOne(params.id, {
      relations: ['officeHours', 'queues'],
    });
    return {
      name: course.name,
      officeHours: course.officeHours.map((e) =>
        pick(e, ['id', 'title', 'room', 'startTime', 'endTime']),
      ),
      queues: await Promise.all(
        course.queues.map(async (queue: any) => ({
          id: queue.id,
          room: queue.room,
          staffList: [
            //TODO get real data
            {
              id: 54,
              name: 'Will Stenzel',
              photoURL:
                'https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=24f4b12cccbf875c7740bbfed45a993900cf0d08d11aa07c84780b3a3501f3bacca4eb33ed5effee8aa2dd195750cfbc9884dd5f2ac62c8f',
            },
            {
              id: 42,
              name: 'Grisha Zaytsev',
              photoURL:
                'https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=471f2d695fbb8a00ee740ad3ea910453986aec81ddaecf889ae98b3a1858597b12650afd0d4e59c561172f76cb1946eec217ed89bd4074c0',
            },
          ],
          queueSize: await Question.count({ where: { queueId: queue.id } }),
        })),
      ),
    };
  }
}
