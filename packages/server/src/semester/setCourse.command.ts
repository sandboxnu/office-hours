import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Season } from '@koh/common';
import { SemesterService } from './semester.service';
import { SemesterModel } from './semester.entity';

@Injectable()
export class SetSemesterCommand {
  constructor(private readonly semService: SemesterService) {}
  @Command({
    command: 'semester:toggleActiveSemester  <mode> <semester> <year>',
    describe: '(disable or enable) all the classes in a given semester',
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
    if (Number.isNaN(year)) {
      console.log('Invalid year: Please provide the year as a number.');
      return;
    }

    const sem = this.validateSemester(semester);
    if (!sem) {
      console.log('Invalid season: "' + semester + '"');
      console.log(
        'Pick from one of:' +
          '\n-  "Fall"' +
          '\n-  "Spring"' +
          '\n-  "Summer_1"' +
          '\n-  "Summer_2"' +
          '\n-  "Summer_Full"',
      );
      return;
    }

    const isEnable = this.enableOrDisable(mode);

    if (isEnable === null) {
      console.error(
        'Mode must be one of "enable" or "disable", got "' + mode + '".',
      );
      return;
    }

    const targetEnable = await this.getSemester(sem, year);
    if (!targetEnable) {
      console.log('semester is not bound to any courses, exiting');
      return;
    }

    await this.semService.toggleActiveSemester(targetEnable, isEnable);
    console.log('done');
  }

  validateSemester(sem: string): Season {
    switch (sem) {
      case 'Fall':
      case 'Spring':
      case 'Summer_1':
      case 'Summer_2':
      case 'Summer_Full':
        return sem;
      default:
        return null;
    }
  }

  enableOrDisable(mode: string): boolean {
    switch (mode) {
      case 'enable':
        return true;
      case 'disable':
        return false;
      default:
        return null;
    }
  }

  async getSemester(sea: Season, year: number) {
    // we need to some id matching
    return await SemesterModel.findOne({
      season: sea,
      year: year,
    });
  }
}
