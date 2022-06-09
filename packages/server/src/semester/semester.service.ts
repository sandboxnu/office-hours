import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { SemesterModel } from './semester.entity';
import { CourseModel } from '../course/course.entity';
import { Cron } from '@nestjs/schedule';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { TotalQuestionsAsked } from 'insights/insight-objects';
import _ from 'lodash';

@Injectable()
export class SemesterService {
  constructor(private connection: Connection) {}

  async toggleActiveSemester(
    semester: SemesterModel,
    enable: boolean,
  ): Promise<void> {
    const enableList = await CourseModel.find({
      semester: semester,
    });

    enableList.map((course) => {
      course.enabled = enable;
    });

    try {
      await CourseModel.save(enableList);
    } catch (err) {
      console.log(err);
    }
  }

  private static ABOUT_PAGE_LOC = '../../packages/app/static/about.json';
  private static EVERY_4_MONTHS = '0 0 1 */4 *';

  @Cron(SemesterService.EVERY_4_MONTHS) // Every 5th Month (01/01, 05/01, 09/01)
  async updateAboutStats(): Promise<void> {
    let data: AboutPageResource;
    if (existsSync(SemesterService.ABOUT_PAGE_LOC)) {
      data = JSON.parse(
        readFileSync(SemesterService.ABOUT_PAGE_LOC, { encoding: 'utf8' }),
      );
    } else {
      data = { lastSemesterUpdated: null, semesterData: [] };
    }
    // read the content to get the latest semester
    const new_data = await this.aggregateSemesters(data);
    writeFileSync(SemesterService.ABOUT_PAGE_LOC, new_data);
  }

  private async aggregateSemesters(
    data: AboutPageResource,
  ): Promise<AboutPageResource> {
    let { lastSemesterUpdated } = data;
    const { semesterData } = data;

    // if there is no last semester updated, choose the first semester from the db
    if (!lastSemesterUpdated) {
      lastSemesterUpdated = await SemesterModel.createQueryBuilder()
        .select('MIN(id)')
        .getRawOne();
    }

    // choose the latest disabled semester to aggregate stats for
    const updateUntil =
      (await SemesterModel.createQueryBuilder()
        .select('MAX(id)')
        .where('NOT enabled')
        .getRawOne()) + 1;

    // i want to do this but I am unsure how to deal with errors?
    const new_data = (
      await Promise.all(
        _.range(lastSemesterUpdated, updateUntil + 1).map(async (sid) => {
          return this.aggregateSemester(sid);
        }),
      )
    ).filter((sd) => sd !== null);

    return {
      lastSemesterUpdated: updateUntil + 1,
      semesterData: [...semesterData, ...new_data],
    };
  }

  private async aggregateSemester(sid: number): Promise<SemesterData | null> {
    try {
      const sem = await SemesterModel.findOne({ id: sid });
      return {
        totalQuestionsAsked: await this.totalQuestionsAsked(sem),
        totalCourses: this.totalCourses(sem),
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  private async totalQuestionsAsked(sem: SemesterModel): Promise<number> {
    const totalQuestions = sem.courses.map(async (course) => {
      return await TotalQuestionsAsked.compute([{ courseId: course.id }]);
    });

    return _.sum(await Promise.all(totalQuestions));
  }

  private totalCourses(sem: SemesterModel): number {
    return sem.courses.length;
  }
}
