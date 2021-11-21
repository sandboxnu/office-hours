import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { SemesterFactory } from '../../test/util/factories';
import { Season } from '@koh/common';

@Injectable()
export class SetSemesterCommand {
  constructor(private readonly courseService: CourseService) {}
  @Command({
    command: 'course:modsemeter <mode> <semester> <year>',
    describe: '',
    autoExit: true,
  })
  async create(
    @Positional({
      name: 'mode',
      describe: 'mode: either enable or disable.',
      type: 'string',
    })
    mode: string,
    @Positional({
      name: 'semester',
      describe: 'the semester to enable',
      type: 'string',
    })
    semester: string,
    @Positional({
      name: 'year',
      describe: 'year to enable',
      type: 'number',
    })
    year: number,
  ): Promise<void> {
    if (!(semester as Season)) {
      console.log('invalid season:' + semester);
      console.log(
        'pick from one of:' +
          '\n"Fall"' +
          '\n"Spring"' +
          '\n"Summer_1"' +
          '\n"Summer_2"' +
          '\n"Summer_Full"',
      );
      return;
    }

    let enOrDisable = mode === 'enable';

    switch (mode) {
      case 'enable':
        enOrDisable = true;
        break;
      case 'disable':
        enOrDisable = false;
        break;
      default:
        console.error('mode was not one of "enable" or "disable", got ' + mode);
        return;
    }

    const targetEnable = await SemesterFactory.create({
      season: semester as Season,
      year: year,
    });

    await this.courseService.setSemester(targetEnable, enOrDisable);
  }
}
