import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisModule } from 'nestjs-redis';
import * as iCal from 'node-ical';
import { mocked } from 'ts-jest/utils';
import { Connection } from 'typeorm';
import { CourseFactory, SemesterFactory } from '../../test/util/factories';
import { TestTypeOrmModule } from '../../test/util/testUtils';
import { QueueModel } from '../queue/queue.entity';
import { CourseModel } from './course.entity';
import { IcalService } from './ical.service';
import { SemesterModel } from '../semester/semester.entity';
const { parseICS } = jest.requireActual('node-ical');

const mkCal = (events: string) =>
  parseICS(`BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:CS 2510 - office hours
X-WR-TIMEZONE:America/New_York
X-WR-CALDESC:Office hours for instructors\\, tutors\\, and TAs for CS2510 - F
 undamentals of Computer Science II
BEGIN:VTIMEZONE
TZID:America/New_York
X-LIC-LOCATION:America/New_York
BEGIN:DAYLIGHT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
TZNAME:EDT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
TZNAME:EST
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE
${events}
END:VCALENDAR`);

jest.mock('node-ical');
const mockedICal = mocked(iCal, true);

const VEVENT_NOROOM = `
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20200914T130000
DTEND;TZID=America/New_York:20200914T150000
DTSTAMP:20200919T220522Z
UID:1e6mva12gktah0506vdko3vjd7@google.com
CREATED:20200913T180615Z
DESCRIPTION:
LAST-MODIFIED:20200513T180615Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Online OH: Elaina
TRANSP:OPAQUE
END:VEVENT`;

const VEVENT_ROOM = `
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20200912T170000
DTEND;TZID=America/New_York:20200912T190000
DTSTAMP:20200518T220522Z
UID:6l8vlk6bfr18lkgdqpm4m76ff2@google.com
CREATED:20200512T192938Z
DESCRIPTION:
LAST-MODIFIED:20200515T190535Z
LOCATION:308b WVH
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Online OH: Ameya\\, Julia
TRANSP:OPAQUE
END:VEVENT`;

const VEVENT_NOTIME = `
BEGIN:VEVENT
DTSTART:20180303T020000Z
DTSTAMP:20200518T220522Z
UID:52vu28jp6puscplvjoqn2ugvsb@google.com
CREATED:20180226T150314Z
DESCRIPTION:
LAST-MODIFIED:20180226T150314Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:HW 7 P2 DUE
TRANSP:OPAQUE
END:VEVENT`;

const VEVENT_OUTLOOK_CET = `
BEGIN:VEVENT
DESCRIPTION:\n
EXDATE;TZID=Romance Standard Time:20201012T120000
UID:040000008200E00074C5B7101A82E00800000000FFA4A795B686D601000000000000000
 010000000B0F0238BEEA75243B42D6F11B2111977
SUMMARY:Online OH CS3700 - Ishan
DTSTART;TZID=Romance Standard Time:20201114T120000
DTEND;TZID=Romance Standard Time:20201114T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20200911T140704Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:
X-MICROSOFT-CDO-APPT-SEQUENCE:1
X-MICROSOFT-CDO-BUSYSTATUS:BUSY
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:1
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
END:VEVENT`;

// CEST instead of CET
const VEVENT_OUTLOOK_CEST = `
BEGIN:VEVENT
DESCRIPTION:\n
EXDATE;TZID=Romance Standard Time:20201012T120000
UID:040000008200E00074C5B7101A82E00800000000FFA4A795B686D601000000000000000
 010000000B0F0238BEEA75243B42D6F11B2111977
SUMMARY:Online OH CS3700 - Ishan
DTSTART;TZID=Romance Standard Time:20200914T120000
DTEND;TZID=Romance Standard Time:20200914T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20200911T140704Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:
END:VEVENT`;

const VEVENT_RRULE = `
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20200918T201500
DTEND;TZID=America/New_York:20200918T211500
RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20201000T045959Z;BYDAY=FR
DTSTAMP:20200918T211006Z
UID:0egrkm14ka82ucdsd47jt4fbbr@google.com
CREATED:20200918T062635Z
DESCRIPTION:
LAST-MODIFIED:20200918T063438Z
LOCATION:
SEQUENCE:2
STATUS:CONFIRMED
SUMMARY:Online OH
TRANSP:OPAQUE
END:VEVENT
`;

const VEVENT_RRULE_OUTLOOK = `
BEGIN:VEVENT
DESCRIPTION:\n
RRULE:FREQ=WEEKLY;UNTIL=20200922T170000Z;INTERVAL=1;BYDAY=MO;WKST=SU
EXDATE;TZID=Romance Standard Time:20201012T120000
UID:040000008200E00074C5B7101A82E00800000000FFA4A795B686D601000000000000000
 010000000B0F0238BEEA75243B42D6F11B2111977
SUMMARY:Online OH CS3700 - Ishan
DTSTART;TZID=Romance Standard Time:20200914T120000
DTEND;TZID=Romance Standard Time:20200914T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20200911T140704Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:
END:VEVENT`;

// Event is every 2 days, forever
const VEVENT_RRULE_FOREVER = `
BEGIN:VEVENT
DESCRIPTION:\n
RRULE:FREQ=DAILY;INTERVAL=2
EXDATE;TZID=Romance Standard Time:20201012T120000
SUMMARY:Online OH forever
DTSTART;TZID=Romance Standard Time:20200914T120000
DTEND;TZID=Romance Standard Time:20200914T150000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20200911T140704Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:1
LOCATION:
END:VEVENT`;

const VEVENT_RRULE_MULTI_DAY = `
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20200921T100000
DTEND;TZID=America/New_York:20200921T120000
RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20201212T045959Z;BYDAY=MO,TH
DTSTAMP:20200930T000127Z
UID:2l78nihhi7j3pd00v3u5o7vsfq@google.com
CREATED:20200921T140232Z
DESCRIPTION:
LAST-MODIFIED:20200921T140232Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Online OH- Amit Shesh
TRANSP:OPAQUE
END:VEVENT`;

const VEVENT_RRULE_MULTI_DAY_8PM = `
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20200921T200000
DTEND;TZID=America/New_York:20200921T220000
RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20201212T045959Z;BYDAY=MO,TH
DTSTAMP:20200930T000127Z
UID:2l78nihhi7j3pd00v3u5o7vsfq@google.com
CREATED:20200921T140232Z
DESCRIPTION:
LAST-MODIFIED:20200921T140232Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Online OH- Cole Stansbury
TRANSP:OPAQUE
END:VEVENT`;

const VEVENT_RRULE_MULTI_DAY_EXDATE = `
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20200921T100000
DTEND;TZID=America/New_York:20200921T120000
RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20201212T045959Z;BYDAY=MO,TH
EXDATE;TZID=America/New_York:20200928T100000
EXDATE;TZID=America/New_York:20200924T100000
DTSTAMP:20200930T014722Z
UID:2l78nihhi7j3pd00v3u5o7vsfq@google.com
CREATED:20200921T140232Z
DESCRIPTION:
LAST-MODIFIED:20200921T140232Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Online OH- Amit Shesh
TRANSP:OPAQUE
END:VEVENT`;

const VEVENT_RRULE_MULTI_DAY_EXDATE_DST = `
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20201022T100000
DTEND;TZID=America/New_York:20201022T120000
RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20201113T045959Z;BYDAY=TH
EXDATE;TZID=America/New_York:20201029T100000
EXDATE;TZID=America/New_York:20201105T100000
DTSTAMP:20200930T014722Z
UID:2l78nihhi7j3pd00v3u5o7vsfq@google.com
CREATED:20200921T140232Z
DESCRIPTION:
LAST-MODIFIED:20200921T140232Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Online OH- Amit Shesh
TRANSP:OPAQUE
END:VEVENT`;

const VEVENT_RRULE_OUTLOOK_EXDATE = `
BEGIN:VEVENT
RRULE:FREQ=WEEKLY;UNTIL=20201019T170000Z;INTERVAL=1;BYDAY=MO;WKST=SU
EXDATE;TZID=Eastern Standard Time:20201012T120000
UID:040000008200E00074C5B7101A82E0080000000015AA42D4B686D601000000000000000
 010000000103558E135B36F4089C2D45B6001924E
SUMMARY:Online OH CS3700 - Ashwin
DTSTART;TZID=Eastern Standard Time:20200928T120000
DTEND;TZID=Eastern Standard Time:20200928T140000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20201012T184435Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:
END:VEVENT
`;

const VEVENT_DAYLIGHT_SAVINGS_FALL_BACK = `
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20200913T150000
DTEND;TZID=America/New_York:20200913T170000
RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20201207T045959Z;BYDAY=SU
DTSTAMP:20201101T205139Z
UID:2s1c10e3ti5s47i9t81pp01i8u@google.com
CREATED:20200910T202032Z
DESCRIPTION:
LAST-MODIFIED:20200910T202032Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Online OH: Anurag
TRANSP:OPAQUE
END:VEVENT
`;

const VEVENT_DAYLIGHT_SAVINGS_SPRING_FORWARD = `
BEGIN:VEVENT
RRULE:FREQ=WEEKLY;UNTIL=20200315T210000Z;INTERVAL=1;BYDAY=SA;WKST=SU
EXDATE;TZID=America/New_York:20200306T210000
UID:040000008200E00074C5B7101A82E0080000000015AA42D4B686D601000000000000000
 010000000103558E135B36F4089C2D45B6001924E
SUMMARY:Online OH CS3700 - Ashwin
DTSTART;TZID=America/New_York:20200307T210000
DTEND;TZID=America/New_York:20200307T230000
DTSTAMP:20201012T184435Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:
END:VEVENT
`;

const VEVENT_DAYLIGHT_SAVINGS_SPRING_FORWARD_OUTLOOK = `
BEGIN:VEVENT
RRULE:FREQ=WEEKLY;UNTIL=20210321T110000Z;INTERVAL=1;BYDAY=MO;WKST=SU
EXDATE;TZID=Eastern Standard Time:20210307T110000
UID:040000008200E00074C5B7101A82E0080000000015AA42D4B686D601000000000000000
 010000000103558E135B36F4089C2D45B6001924E
SUMMARY:Online OH CS3700 - Ashwin
DTSTART;TZID=Eastern Standard Time:20210308T110000
DTEND;TZID=Eastern Standard Time:20210308T130000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20201012T184435Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:
END:VEVENT
`;

// Give time on Monday, but late enough that in some timezones it becomes Tuesday, potentially breaking the BYDAY=MO
const VEVENT_OUTLOOK_SPILLOVER = `
BEGIN:VEVENT
RRULE:FREQ=WEEKLY;UNTIL=20210221T210000Z;INTERVAL=1;BYDAY=MO;WKST=SU
EXDATE;TZID=Alaskan Standard Time:20210207T210000
UID:040000008200E00074C5B7101A82E0080000000015AA42D4B686D601000000000000000
 010000000103558E135B36F4089C2D45B6001924E
SUMMARY:Online OH CS3700 - Ashwin
DTSTART;TZID=Alaskan Standard Time:20210208T210000
DTEND;TZID=Alaskan Standard Time:20210208T230000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20201012T184435Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:
END:VEVENT
`;

// time is on monday, but running in timezone makes it tuesday. also daylight savings threshold
const VEVENT_OUTLOOK_SPILLOVER_DST = `
BEGIN:VEVENT
RRULE:FREQ=WEEKLY;UNTIL=20210321T210000Z;INTERVAL=1;BYDAY=MO;WKST=SU
EXDATE;TZID=Alaskan Standard Time:20210307T210000
UID:040000008200E00074C5B7101A82E0080000000015AA42D4B686D601000000000000000
 010000000103558E135B36F4089C2D45B6001924E
SUMMARY:Online OH CS3700 - Ashwin
DTSTART;TZID=Alaskan Standard Time:20210308T210000
DTEND;TZID=Alaskan Standard Time:20210308T230000
CLASS:PUBLIC
PRIORITY:5
DTSTAMP:20201012T184435Z
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION:
END:VEVENT
`;

const VEVENT_WITH_RECURRING_PROFESSOR = `
BEGIN:VEVENT
RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20210215T045959Z;BYDAY=MO
UID:2ans373bjq4h1chekolpdmafcq@google.com
SUMMARY:Professor Gamburg's Hours
DTSTART;TZID=America/New_York:20201228T090000
DTEND;TZID=America/New_York:20201228T100000
CLASS: PUBLIC
PRIORITY: 5
DTSTAMP:20201229T003037Z
LOCATION:
SEQUENCE:1
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT
`;

const VEVENT_WITH_TWO_PROFESSORS = `
BEGIN:VEVENT
DTSTART:20201228T140000Z
DTEND:20201228T150000Z
DTSTAMP:20201229T014021Z
UID:2ans373bjq4h1chekolpdmafcq@google.com
CREATED:20201229T002002Z
DESCRIPTION:
LAST-MODIFIED:20201229T013946Z
LOCATION:
SEQUENCE:2
STATUS:CONFIRMED
SUMMARY:Professor Gamburg's Hours
TRANSP:OPAQUE
END:VEVENT
BEGIN:VEVENT
DTSTART:20201228T160000Z
DTEND:20201228T170000Z
DTSTAMP:20201229T014021Z
UID:1188djun11fm229tk07kkufdgu@google.com
CREATED:20201229T014011Z
DESCRIPTION:
LAST-MODIFIED:20201229T014011Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Prof Usyvatsky's Hours
TRANSP:OPAQUE
END:VEVENT
`;

const ex_norecur = (st: string, end: string, name: string) => `BEGIN:VEVENT
DTSTART;TZID=America/New_York:${st}
DTEND;TZID=America/New_York:${end}
DTSTAMP:${st}
UID:${st}${end}${name}@google.com
CREATED:20190913T180615Z
DESCRIPTION:
LAST-MODIFIED:20190513T180615Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Online OH: ${name}
TRANSP:OPAQUE
END:VEVENT
`;

const ex_recur = (st: string, end: string, until: string, name: string) => `
BEGIN:VEVENT
DTSTART;TZID=America/New_York:${st}
DTEND;TZID=America/New_York:${end}
RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=${until};BYDAY=FR
DTSTAMP:20190918T211006Z
UID:${end}${until}${name}@google.com
CREATED:20190918T062635Z
DESCRIPTION:
LAST-MODIFIED:20190918T063438Z
LOCATION:
SEQUENCE:2
STATUS:CONFIRMED
SUMMARY:Online OH: ${name}
TRANSP:OPAQUE
END:VEVENT
`;

const VEVENT_F2019_NORECUR = ex_norecur(
  '20190903T130000',
  '20190903T150000',
  'TA2019',
);
const VEVENT_F2019_RECUR = ex_recur(
  '20190918T201500',
  '20190918T211500',
  '20191101T045959Z',
  'TA2019R',
);

const VEVENT_S2020_NORECUR = ex_norecur(
  '20200103T130000',
  '20200103T150000',
  'TA2020Spring',
);
const VEVENT_S2020_RECUR = ex_recur(
  '20200118T201500',
  '20200118T211500',
  '20200401T045959Z',
  'TA2020SpringR',
);

const VEVENT_Su2020_NORECUR = ex_norecur(
  '20200503T130000',
  '20200503T150000',
  'TA2020Sum',
);
const VEVENT_Su2020_RECUR = ex_recur(
  '20200518T201500',
  '20200518T211500',
  '20200801T045959Z',
  'TA2020Sum',
);

const VEVENT_Su12020_NORECUR = ex_norecur(
  '20200503T130000',
  '20200503T150000',
  'TA2020Sum1',
);
const VEVENT_Su12020_RECUR = ex_recur(
  '20200518T201500',
  '20200518T211500',
  '20200715T045959Z',
  'TA2020Sum1',
);

const VEVENT_Su22020_NORECUR = ex_norecur(
  '20200803T130000',
  '20200803T150000',
  'TA2020Sum2',
);
const VEVENT_Su22020_RECUR = ex_recur(
  '20200818T201500',
  '20200818T211500',
  '20200901T045959Z',
  'TA2020Sum2',
);

const VEVENT_F2020_NORECUR = ex_norecur(
  '20200903T130000',
  '20200903T150000',
  'TA2020',
);
const VEVENT_F2020_RECUR = ex_recur(
  '20200918T201500',
  '20200918T211500',
  '20201101T045959Z',
  'TA2020R',
);

const VEVENT_2021_NORECUR = ex_norecur(
  '20210103T130000',
  '20210103T150000',
  'TA2021',
);
const VEVENT_2021_RECUR = ex_recur(
  '20210118T201500',
  '20210118T211500',
  '20210401T045959Z',
  'TA2021',
);

// for testing different semesters
// (combine them into one huge calendar, and test different season filters.
const seasonTest = mkCal(
  VEVENT_F2019_NORECUR +
    VEVENT_F2019_RECUR +
    VEVENT_S2020_NORECUR +
    VEVENT_S2020_RECUR +
    VEVENT_Su2020_NORECUR +
    VEVENT_Su2020_RECUR +
    VEVENT_Su12020_NORECUR +
    VEVENT_Su12020_RECUR +
    VEVENT_Su22020_NORECUR +
    VEVENT_Su22020_RECUR +
    VEVENT_F2020_NORECUR +
    VEVENT_F2020_RECUR +
    VEVENT_2021_NORECUR +
    VEVENT_2021_NORECUR,
);

describe('IcalService', () => {
  let service: IcalService;
  let conn: Connection;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestTypeOrmModule,
        RedisModule.register([
          { name: 'pub' },
          { name: 'sub' },
          { name: 'db' },
        ]),
      ],
      providers: [IcalService],
    }).compile();

    service = module.get<IcalService>(IcalService);
    conn = module.get<Connection>(Connection);
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await conn.close();
  });

  describe('parseIcal', () => {
    // NO DB NEEDED
    it('handles a pre-generated subset of CS 2510 classes', () => {
      const parsedICS = mkCal(VEVENT_ROOM + VEVENT_NOROOM);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date(1599418800000),
        new Date(1600635600000),
      );
      // Note that the lecture event has been filtered out
      expect(endData).toStrictEqual([
        {
          title: 'Online OH: Ameya, Julia',
          courseId: 123,
          room: '308b WVH',
          startTime: new Date('2020-09-12 17:00:00'),
          endTime: new Date('2020-09-12 19:00:00'),
        },
        {
          title: 'Online OH: Elaina',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-14 13:00:00'),
          endTime: new Date('2020-09-14 15:00:00'),
        },
      ]);
    });

    it('ignores events with no start/end time', () => {
      const parsedICS = mkCal(VEVENT_NOTIME);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date(1589317200000),
        new Date(1589317900000),
      );
      expect(endData).toStrictEqual([]);
    });

    it('converts Outlook time zones', () => {
      const parsedICS = mkCal(VEVENT_OUTLOOK_CET);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2020-11-14T11:00:00+0000'),
        new Date('2020-11-14T14:00:00+0000'),
      );
      expect(endData).toStrictEqual([
        {
          title: 'Online OH CS3700 - Ishan',
          courseId: 123,
          room: '',
          startTime: new Date('2020-11-14T11:00:00+0000'),
          endTime: new Date('2020-11-14T14:00:00+0000'),
        },
      ]);
    });

    it('converts Outlook time zones during summer/daylight saving time', () => {
      // 2 hour offset from UTC
      const parsedICS = mkCal(VEVENT_OUTLOOK_CEST);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2020-09-14T10:00:00+0000'),
        new Date('2020-09-14T13:00:00+0000'),
      );
      expect(endData).toStrictEqual([
        {
          title: 'Online OH CS3700 - Ishan',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-14T10:00:00+0000'),
          endTime: new Date('2020-09-14T13:00:00+0000'),
        },
      ]);
    });

    it('correctly excludes exdate with Outlook time zones', () => {
      const parsedICS = mkCal(VEVENT_RRULE_OUTLOOK_EXDATE);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2020-09-28T12:00:00-0400'),
        new Date('2020-10-19T14:00:00-0400'),
      );
      expect(endData).not;
      expect(endData).toStrictEqual([
        {
          title: 'Online OH CS3700 - Ashwin',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-28T12:00:00-0400'),
          endTime: new Date('2020-09-28T14:00:00-0400'),
        },
        {
          title: 'Online OH CS3700 - Ashwin',
          courseId: 123,
          room: '',
          startTime: new Date('2020-10-05T12:00:00-0400'),
          endTime: new Date('2020-10-05T14:00:00-0400'),
        },
        {
          title: 'Online OH CS3700 - Ashwin',
          courseId: 123,
          room: '',
          startTime: new Date('2020-10-19T12:00:00-0400'),
          endTime: new Date('2020-10-19T14:00:00-0400'),
        },
      ]);
    });

    it('creates multiple when there is an rrule', () => {
      const parsedICS = mkCal(VEVENT_RRULE);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2020-09-18T20:15:00-0400'),
        new Date('2020-09-25T21:15:00-0400'),
      );
      expect(endData).toStrictEqual([
        {
          title: 'Online OH',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-18T20:15:00-0400'),
          endTime: new Date('2020-09-18T21:15:00-0400'),
        },
        {
          title: 'Online OH',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-25T20:15:00-0400'),
          endTime: new Date('2020-09-25T21:15:00-0400'),
        },
      ]);
    });

    it('creates all events in a week when there is a multi day rrule', () => {
      const parsedICS = mkCal(VEVENT_RRULE_MULTI_DAY);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2020-09-21T10:00:00-0400'),
        new Date('2020-10-01T12:00:00-0400'),
      );
      endData.length = 4;
      expect(endData).toStrictEqual([
        {
          title: 'Online OH- Amit Shesh',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-21T10:00:00-0400'),
          endTime: new Date('2020-09-21T12:00:00-0400'),
        },
        {
          title: 'Online OH- Amit Shesh',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-24T10:00:00-0400'),
          endTime: new Date('2020-09-24T12:00:00-0400'),
        },
        {
          title: 'Online OH- Amit Shesh',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-28T10:00:00-0400'),
          endTime: new Date('2020-09-28T12:00:00-0400'),
        },
        {
          title: 'Online OH- Amit Shesh',
          courseId: 123,
          room: '',
          startTime: new Date('2020-10-01T10:00:00-0400'),
          endTime: new Date('2020-10-01T12:00:00-0400'),
        },
      ]);
    });

    it('creates all events in a week with a multi day rrule at UTC midnight', () => {
      const parsedICS = mkCal(VEVENT_RRULE_MULTI_DAY_8PM);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2020-09-21T20:00:00-0400'),
        new Date('2020-10-01T22:00:00-0400'),
      );
      endData.length = 4;
      expect(endData).toStrictEqual([
        {
          title: 'Online OH- Cole Stansbury',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-21T20:00:00-0400'),
          endTime: new Date('2020-09-21T22:00:00-0400'),
        },
        {
          title: 'Online OH- Cole Stansbury',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-24T20:00:00-0400'),
          endTime: new Date('2020-09-24T22:00:00-0400'),
        },
        {
          title: 'Online OH- Cole Stansbury',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-28T20:00:00-0400'),
          endTime: new Date('2020-09-28T22:00:00-0400'),
        },
        {
          title: 'Online OH- Cole Stansbury',
          courseId: 123,
          room: '',
          startTime: new Date('2020-10-01T20:00:00-0400'),
          endTime: new Date('2020-10-01T22:00:00-0400'),
        },
      ]);
    });

    it('excludes deleted date in rrule', () => {
      const parsedICS = mkCal(VEVENT_RRULE_MULTI_DAY_EXDATE);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2020-09-21T10:00:00-0400'),
        new Date('2020-10-05T12:00:00-0400'),
      );
      endData.length = 3;
      expect(endData).toStrictEqual([
        {
          title: 'Online OH- Amit Shesh',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-21T10:00:00-0400'),
          endTime: new Date('2020-09-21T12:00:00-0400'),
        },
        {
          title: 'Online OH- Amit Shesh',
          courseId: 123,
          room: '',
          startTime: new Date('2020-10-01T10:00:00-0400'),
          endTime: new Date('2020-10-01T12:00:00-0400'),
        },
        {
          title: 'Online OH- Amit Shesh',
          courseId: 123,
          room: '',
          startTime: new Date('2020-10-05T10:00:00-0400'),
          endTime: new Date('2020-10-05T12:00:00-0400'),
        },
      ]);
    });

    it('excludes deleted date in rrule crossing dst', () => {
      const parsedICS = mkCal(VEVENT_RRULE_MULTI_DAY_EXDATE_DST);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2020-10-22T10:00:00-0400'),
        new Date('2020-11-12T13:00:00-0400'),
      );
      expect(endData).toStrictEqual([
        {
          title: 'Online OH- Amit Shesh',
          courseId: 123,
          room: '',
          startTime: new Date('2020-10-22T10:00:00-0400'),
          endTime: new Date('2020-10-22T12:00:00-0400'),
        },
        {
          title: 'Online OH- Amit Shesh',
          courseId: 123,
          room: '',
          startTime: new Date('2020-11-12T11:00:00-0400'),
          endTime: new Date('2020-11-12T13:00:00-0400'),
        },
      ]);
    });

    it('creates multiple while converting Outlook timezone', () => {
      // 2 hour offset from UTC
      const parsedICS = mkCal(VEVENT_RRULE_OUTLOOK);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2020-09-14T10:00:00+0000'),
        new Date('2020-09-21T13:00:00+0000'),
      );
      expect(endData).toStrictEqual([
        {
          title: 'Online OH CS3700 - Ishan',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-14T10:00:00+0000'),
          endTime: new Date('2020-09-14T13:00:00+0000'),
        },
        {
          title: 'Online OH CS3700 - Ishan',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-21T10:00:00+0000'),
          endTime: new Date('2020-09-21T13:00:00+0000'),
        },
      ]);
    });

    it('generates 10 weeks of events when rrule has no UNTIL date', () => {
      const parsedICS = mkCal(VEVENT_RRULE_FOREVER);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2020-05-14T10:00:00+0000'),
        new Date('2021-05-14T10:00:00+0000'),
      );
      expect(endData).toContainEqual({
        title: 'Online OH forever',
        courseId: 123,
        room: '',
        startTime: new Date('2020-09-14T10:00:00+0000'),
        endTime: new Date('2020-09-14T13:00:00+0000'),
      });
      expect(endData).toContainEqual({
        title: 'Online OH forever',
        courseId: 123,
        room: '',
        startTime: new Date('2020-09-16T10:00:00+0000'),
        endTime: new Date('2020-09-16T13:00:00+0000'),
      });
      expect(endData.length).toEqual((10 * 7) / 2 - 1);
    });

    it('correct times after daylight savings', () => {
      const parsedICS = mkCal(VEVENT_DAYLIGHT_SAVINGS_FALL_BACK);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2020-09-25T19:00:00+0000'),
        new Date('2020-12-01T22:00:00+0000'),
      );
      expect(endData).toContainEqual({
        title: 'Online OH: Anurag',
        courseId: 123,
        room: '',
        startTime: new Date('2020-10-25T19:00:00+0000'),
        endTime: new Date('2020-10-25T21:00:00+0000'),
      });
      expect(endData).toContainEqual({
        title: 'Online OH: Anurag',
        courseId: 123,
        room: '',
        startTime: new Date('2020-11-01T20:00:00+0000'),
        endTime: new Date('2020-11-01T22:00:00+0000'),
      });
    });

    it('correct times after daylight savings spring forward', () => {
      const parsedICS = mkCal(VEVENT_DAYLIGHT_SAVINGS_SPRING_FORWARD);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2020-03-08T02:00:00+0000'),
        new Date('2020-03-15T03:00:00+0000'),
      );
      expect(endData).toContainEqual({
        title: 'Online OH CS3700 - Ashwin',
        courseId: 123,
        room: '',
        startTime: new Date('2020-03-08T02:00:00+0000'),
        endTime: new Date('2020-03-08T04:00:00+0000'),
      });
      expect(endData).toContainEqual({
        title: 'Online OH CS3700 - Ashwin',
        courseId: 123,
        room: '',
        startTime: new Date('2020-03-15T01:00:00+0000'),
        endTime: new Date('2020-03-15T03:00:00+0000'),
      });
    });

    it('correct times after daylight savings spring forward outlook', () => {
      const parsedICS = mkCal(VEVENT_DAYLIGHT_SAVINGS_SPRING_FORWARD_OUTLOOK);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2021-03-08T16:00:00+0000'),
        new Date('2021-03-15T17:00:00+0000'),
      );
      expect(endData).toContainEqual({
        title: 'Online OH CS3700 - Ashwin',
        courseId: 123,
        room: '',
        startTime: new Date('2021-03-08T16:00:00+0000'),
        endTime: new Date('2021-03-08T18:00:00+0000'),
      });
      expect(endData).toContainEqual({
        title: 'Online OH CS3700 - Ashwin',
        courseId: 123,
        room: '',
        startTime: new Date('2021-03-15T15:00:00+0000'),
        endTime: new Date('2021-03-15T17:00:00+0000'),
      });
    });

    it('correct times in outlook with timezone spillover', () => {
      const parsedICS = mkCal(VEVENT_OUTLOOK_SPILLOVER);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2021-02-09T06:00:00+0000'),
        new Date('2021-02-16T08:00:00+0000'),
      );
      expect(endData).toContainEqual({
        title: 'Online OH CS3700 - Ashwin',
        courseId: 123,
        room: '',
        startTime: new Date('2021-02-09T06:00:00+0000'),
        endTime: new Date('2021-02-09T08:00:00+0000'),
      });
      expect(endData).toContainEqual({
        title: 'Online OH CS3700 - Ashwin',
        courseId: 123,
        room: '',
        startTime: new Date('2021-02-16T06:00:00+0000'),
        endTime: new Date('2021-02-16T08:00:00+0000'),
      });
    });

    it('correct times in outlook with timezone spillover, across DST', () => {
      const parsedICS = mkCal(VEVENT_OUTLOOK_SPILLOVER_DST);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2021-03-09T06:00:00+0000'),
        new Date('2021-03-16T07:00:00+0000'),
      );
      expect(endData).toContainEqual({
        title: 'Online OH CS3700 - Ashwin',
        courseId: 123,
        room: '',
        startTime: new Date('2021-03-09T06:00:00+0000'),
        endTime: new Date('2021-03-09T08:00:00+0000'),
      });
      expect(endData).toContainEqual({
        title: 'Online OH CS3700 - Ashwin',
        courseId: 123,
        room: '',
        startTime: new Date('2021-03-16T05:00:00+0000'),
        endTime: new Date('2021-03-16T07:00:00+0000'),
      });
    });

    it('generates some professor office hours based on recurrence', () => {
      const parsedICS = mkCal(VEVENT_WITH_RECURRING_PROFESSOR);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2021-01-11T14:00:00.000Z'),
        new Date('2021-02-08T15:00:00.000Z'),
        /\b^(Prof|Professor)/,
      );
      expect(endData).toContainEqual({
        title: "Professor Gamburg's Hours",
        courseId: 123,
        room: '',
        startTime: new Date('2021-01-11T14:00:00.000Z'),
        endTime: new Date('2021-01-11T15:00:00.000Z'),
      });
      expect(endData).toContainEqual({
        title: "Professor Gamburg's Hours",
        courseId: 123,
        room: '',
        startTime: new Date('2021-02-08T14:00:00.000Z'),
        endTime: new Date('2021-02-08T15:00:00.000Z'),
      });
    });

    it('generates two sets of professor office hours', () => {
      const parsedICS = mkCal(VEVENT_WITH_TWO_PROFESSORS);
      const endData = service.parseIcal(
        parsedICS,
        123,
        new Date('2020-12-28T14:00:00.000Z'),
        new Date('2020-12-28T17:00:00.000Z'),
        /\b^(Prof|Professor)/,
      );
      expect(endData).toEqual([
        {
          title: "Professor Gamburg's Hours",
          courseId: 123,
          room: '',
          startTime: new Date('2020-12-28T14:00:00.000Z'),
          endTime: new Date('2020-12-28T15:00:00.000Z'),
        },
        {
          title: "Prof Usyvatsky's Hours",
          courseId: 123,
          room: '',
          startTime: new Date('2020-12-28T16:00:00.000Z'),
          endTime: new Date('2020-12-28T17:00:00.000Z'),
        },
      ]);
    });

    describe('updateCalendarForCourse', () => {
      beforeEach(async () => {
        await conn.synchronize(true);
      });
      it('creates officehours', async () => {
        const course = await CourseFactory.create({ id: 123 });
        const parsedICS = mkCal(
          VEVENT_ROOM + VEVENT_NOROOM + VEVENT_WITH_TWO_PROFESSORS,
        );

        mockedICal.fromURL.mockReturnValue(Promise.resolve(parsedICS));

        await service.updateCalendarForCourse(course);

        const queue = await QueueModel.findOne({
          courseId: course.id,
          room: 'Online',
        });

        const gamburgQueue = await QueueModel.findOne({
          courseId: course.id,
          room: "Professor Gamburg's Hours",
          isProfessorQueue: true,
        });

        const shortQueue = await QueueModel.findOne({
          courseId: course.id,
          room: "Prof Usyvatsky's Hours",
          isProfessorQueue: true,
        });
        expect(
          (await CourseModel.findOne(course.id, { relations: ['officeHours'] }))
            .officeHours,
        ).toMatchObject([
          {
            title: 'Online OH: Ameya, Julia',
            courseId: course.id,
            startTime: new Date('2020-09-12 17:00:00'),
            endTime: new Date('2020-09-12 19:00:00'),
            queueId: queue.id,
          },
          {
            title: 'Online OH: Elaina',
            courseId: course.id,
            startTime: new Date('2020-09-14 13:00:00'),
            endTime: new Date('2020-09-14 15:00:00'),
            queueId: queue.id,
          },
          {
            title: "Professor Gamburg's Hours",
            courseId: course.id,
            startTime: new Date('2020-12-28T14:00:00.000Z'),
            endTime: new Date('2020-12-28T15:00:00.000Z'),
            queueId: gamburgQueue.id,
            room: "Professor Gamburg's Hours",
          },
          {
            title: "Prof Usyvatsky's Hours",
            courseId: course.id,
            startTime: new Date('2020-12-28T16:00:00.000Z'),
            endTime: new Date('2020-12-28T17:00:00.000Z'),
            queueId: shortQueue.id,
            room: "Prof Usyvatsky's Hours",
          },
        ]);
      });

      it('creates FALL 2019 officehours ', async () => {
        mockedICal.fromURL.mockReturnValue(Promise.resolve(seasonTest));
        const semF2019 = await SemesterModel.create({
          season: 'Fall',
          year: 2019,
        });
        const courseYr19 = await CourseFactory.create({
          id: 15,
          semester: semF2019,
        });
        await service.updateCalendarForCourse(courseYr19);

        const cm = await CourseModel.findOne(courseYr19.id, {
          relations: ['officeHours'],
        });

        const ohDates = cm.officeHours.map((oh) => oh.startTime);

        // only generates OH in 2019
        ohDates.map((date) => expect(date.getFullYear()).toBe(2019));
        // 8 is september, 12 is max
        ohDates.map((date) => expect(date.getMonth() >= 8).toBe(true));
        ohDates.map((date) => expect(date.getMonth() <= 12).toBe(true));
      });
    });

    it('creates SPRING 2020 officehours ', async () => {
      mockedICal.fromURL.mockReturnValue(Promise.resolve(seasonTest));
      const semS2020 = await SemesterModel.create({
        season: 'Spring',
        year: 2020,
      });
      const courseSp = await CourseFactory.create({
        id: 11,
        semester: semS2020,
      });

      await service.updateCalendarForCourse(courseSp);

      const cm = await CourseModel.findOne(courseSp.id, {
        relations: ['officeHours'],
      });

      const ohDates = cm.officeHours.map((oh) => oh.startTime);
      // only generates OH in 2020
      ohDates.map((date) => expect(date.getFullYear()).toBe(2020));
      // 0 is jan, 4 is may (max)
      ohDates.map((date) => expect(date.getMonth() >= 0).toBe(true));
      ohDates.map((date) => expect(date.getMonth() <= 4).toBe(true));
    });

    it('creates FALL 2020 officehours', async () => {
      mockedICal.fromURL.mockReturnValue(Promise.resolve(seasonTest));
      const semF2020 = await SemesterModel.create({
        season: 'Fall',
        year: 2020,
      });
      const courseFall = await CourseFactory.create({
        id: 11,
        semester: semF2020,
      });

      await service.updateCalendarForCourse(courseFall);

      const cm = await CourseModel.findOne(courseFall.id, {
        relations: ['officeHours'],
      });

      const ohDates = cm.officeHours.map((oh) => oh.startTime);
      // only generates OH in 2020
      ohDates.map((date) => expect(date.getFullYear()).toBe(2020));
      // only generates OH from September (8) to December (11)
      ohDates.map((date) => expect(date.getMonth() >= 8).toBe(true));
      ohDates.map((date) => expect(date.getMonth() <= 11).toBe(true));
      // generates the expected number of OH events
      expect(ohDates.length).toEqual(8);
    });

    it('creates Summer_FULL 2020 officehours ', async () => {
      mockedICal.fromURL.mockReturnValue(Promise.resolve(seasonTest));
      const semS2020 = await SemesterModel.create({
        season: 'Summer_Full',
        year: 2020,
      });
      const course = await CourseFactory.create({
        id: 11,
        semester: semS2020,
      });

      await service.updateCalendarForCourse(course);

      const cm = await CourseModel.findOne(course.id, {
        relations: ['officeHours'],
      });

      const ohDates = cm.officeHours.map((oh) => oh.startTime);
      // only generates OH in 2020
      ohDates.map((date) => expect(date.getFullYear()).toBe(2020));
      // 4 is may, 8 is sept (max)
      ohDates.map((date) => expect(date.getMonth() >= 4).toBe(true));
      ohDates.map((date) => expect(date.getMonth() <= 8).toBe(true));
    });

    it('creates Summer 1 2020 officehours ', async () => {
      mockedICal.fromURL.mockReturnValue(Promise.resolve(seasonTest));
      const semSu12020 = await SemesterModel.create({
        season: 'Summer_1',
        year: 2020,
      });
      const course = await CourseFactory.create({
        id: 15,
        semester: semSu12020,
      });

      await service.updateCalendarForCourse(course);

      const cm = await CourseModel.findOne(course.id, {
        relations: ['officeHours'],
      });

      const ohDates = cm.officeHours.map((oh) => oh.startTime);
      // only generates OH in 2020
      ohDates.map((date) => expect(date.getFullYear()).toBe(2020));
      // 4 is may, 6 is july (max)

      ohDates.map((date) => expect(date.getMonth() >= 4).toBe(true));
      ohDates.map((date) => expect(date.getMonth() <= 6).toBe(true));
    });

    it('creates Summer 2 2020 officehours ', async () => {
      mockedICal.fromURL.mockReturnValue(Promise.resolve(seasonTest));
      const semSu22020 = await SemesterModel.create({
        season: 'Summer_2',
        year: 2020,
      });
      const course = await CourseFactory.create({
        id: 18,
        semester: semSu22020,
      });
      await service.updateCalendarForCourse(course);
      const cm = await CourseModel.findOne(course.id, {
        relations: ['officeHours'],
      });
      const ohDates = cm.officeHours.map((oh) => oh.startTime);
      // only generates OH in 2020
      ohDates.map((date) => expect(date.getFullYear()).toBe(2020));
      // 6 is july, 8 is september (max)

      ohDates.map((date) => expect(date.getMonth() >= 6).toBe(true));
      ohDates.map((date) => expect(date.getMonth() <= 8).toBe(true));
    });
  });
});
