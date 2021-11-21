import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { SemesterFactory } from '../../test/util/factories';
import { Season } from '@koh/common';
import { SemesterService } from './semester.service';

@Injectable()
export class SetSemesterCommand {
  constructor(private readonly semService: SemesterService) {}
  @Command({
    command: 'semester:modsemester <mode> <semester> <year>',
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

    let enOrDisable = mode === 'enable';

    switch (mode) {
      case 'enable':
        enOrDisable = true;
        break;
      case 'disable':
        enOrDisable = false;
        break;
      default:
        console.error(
          'Mode must be one of "enable" or "disable", got "' + mode + '".',
        );
        return;
    }

    const targetEnable = await SemesterFactory.create({
      season: sem,
      year: year,
    });

    await this.semService.setSemester(targetEnable, enOrDisable);
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
}
