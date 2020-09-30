import { Test, TestingModule } from '@nestjs/testing';
import { IcalService } from './ical.service';
import * as iCal from 'node-ical';
import { TestTypeOrmModule } from '../../test/util/testUtils';
import { CourseFactory } from '../../test/util/factories';
import { QueueModel } from '../queue/queue.entity';
import { CalendarResponse } from 'node-ical';
import { Connection } from 'typeorm';
import { CourseModel } from './course.entity';

const mkCal = (events: string) =>
  iCal.parseICS(`BEGIN:VCALENDAR
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

const VEVENT_NOROOM = `
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20200514T130000
DTEND;TZID=America/New_York:20200514T150000
DTSTAMP:20200519T220522Z
UID:1e6mva12gktah0506vdko3vjd7@google.com
CREATED:20200513T180615Z
DESCRIPTION:
LAST-MODIFIED:20200513T180615Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:OH: Elaina
TRANSP:OPAQUE
END:VEVENT`;

const VEVENT_ROOM = `
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20200512T170000
DTEND;TZID=America/New_York:20200512T190000
DTSTAMP:20200518T220522Z
UID:6l8vlk6bfr18lkgdqpm4m76ff2@google.com
CREATED:20200512T192938Z
DESCRIPTION:
LAST-MODIFIED:20200515T190535Z
LOCATION:308b WVH
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:OH: Ameya\\, Julia
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
SUMMARY:Hours CS3700 - Ishan
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
SUMMARY:Hours CS3700 - Ishan
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
SUMMARY:Hours
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
SUMMARY:Hours CS3700 - Ishan
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
SUMMARY:Hours forever
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
SUMMARY:OH- Amit Shesh
TRANSP:OPAQUE
END:VEVENT`;

describe('IcalService', () => {
  let service: IcalService;
  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule],
      providers: [IcalService],
    }).compile();

    service = module.get<IcalService>(IcalService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  describe('parseIcal', () => {
    // NO DB NEEDED
    it('handles a pre-generated subset of CS 2510 classes', () => {
      const parsedICS = mkCal(VEVENT_ROOM + VEVENT_NOROOM);
      const endData = service.parseIcal(parsedICS, 123);
      // Note that the lecture event has been filtered out
      expect(endData).toStrictEqual([
        {
          title: 'OH: Ameya, Julia',
          courseId: 123,
          room: '308b WVH',
          startTime: new Date(1589317200000),
          endTime: new Date(1589324400000),
        },
        {
          title: 'OH: Elaina',
          courseId: 123,
          room: '',
          startTime: new Date(1589475600000),
          endTime: new Date(1589482800000),
        },
      ]);
    });

    it('ignores events with no start/end time', () => {
      const parsedICS = mkCal(VEVENT_NOTIME);
      const endData = service.parseIcal(parsedICS, 123);
      expect(endData).toStrictEqual([]);
    });

    it('converts Outlook time zones', () => {
      const parsedICS = mkCal(VEVENT_OUTLOOK_CET);
      const endData = service.parseIcal(parsedICS, 123);
      expect(endData).toStrictEqual([
        {
          title: 'Hours CS3700 - Ishan',
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
      const endData = service.parseIcal(parsedICS, 123);
      expect(endData).toStrictEqual([
        {
          title: 'Hours CS3700 - Ishan',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-14T10:00:00+0000'),
          endTime: new Date('2020-09-14T13:00:00+0000'),
        },
      ]);
    });

    it('creates multiple when there is an rrule', () => {
      const parsedICS = mkCal(VEVENT_RRULE);
      const endData = service.parseIcal(parsedICS, 123);
      expect(endData).toStrictEqual([
        {
          title: 'Hours',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-18T20:15:00-0400'),
          endTime: new Date('2020-09-18T21:15:00-0400'),
        },
        {
          title: 'Hours',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-25T20:15:00-0400'),
          endTime: new Date('2020-09-25T21:15:00-0400'),
        },
      ]);
    });

    it.only('creates all events in a week when there is a multi day rrule', () => {
      const parsedICS = mkCal(VEVENT_RRULE_MULTI_DAY);
      const endData = service.parseIcal(parsedICS, 123);
      endData.length = 4;
      expect(endData).toStrictEqual([
        {
          title: 'OH- Amit Shesh',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-21T10:00:00-0400'),
          endTime: new Date('2020-09-21T12:00:00-0400'),
        },
        {
          title: 'OH- Amit Shesh',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-24T10:00:00-0400'),
          endTime: new Date('2020-09-24T12:00:00-0400'),
        },
        {
          title: 'OH- Amit Shesh',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-28T10:00:00-0400'),
          endTime: new Date('2020-09-28T12:00:00-0400'),
        },
        {
          title: 'OH- Amit Shesh',
          courseId: 123,
          room: '',
          startTime: new Date('2020-10-01T10:00:00-0400'),
          endTime: new Date('2020-10-01T12:00:00-0400'),
        },
      ]);
    });

    it('creates multiple while converting Outlook timezone', () => {
      // 2 hour offset from UTC
      const parsedICS = mkCal(VEVENT_RRULE_OUTLOOK);
      const endData = service.parseIcal(parsedICS, 123);
      expect(endData).toStrictEqual([
        {
          title: 'Hours CS3700 - Ishan',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-14T10:00:00+0000'),
          endTime: new Date('2020-09-14T13:00:00+0000'),
        },
        {
          title: 'Hours CS3700 - Ishan',
          courseId: 123,
          room: '',
          startTime: new Date('2020-09-21T10:00:00+0000'),
          endTime: new Date('2020-09-21T13:00:00+0000'),
        },
      ]);
    });

    it('generates 10 weeks of events when rrule has no UNTIL date', () => {
      const parsedICS = mkCal(VEVENT_RRULE_FOREVER);
      const endData = service.parseIcal(parsedICS, 123);
      expect(endData).toContainEqual({
        title: 'Hours forever',
        courseId: 123,
        room: '',
        startTime: new Date('2020-09-14T10:00:00+0000'),
        endTime: new Date('2020-09-14T13:00:00+0000'),
      });
      expect(endData).toContainEqual({
        title: 'Hours forever',
        courseId: 123,
        room: '',
        startTime: new Date('2020-09-16T10:00:00+0000'),
        endTime: new Date('2020-09-16T13:00:00+0000'),
      });
      expect(endData.length).toEqual((10 * 7) / 2);
    });

    describe('updateCalendarForCourse', () => {
      beforeEach(async () => {
        await conn.synchronize(true);
      });
      it('creates officehours', async () => {
        const course = await CourseFactory.create({ id: 123 });

        const parsedICS = mkCal(VEVENT_ROOM + VEVENT_NOROOM);
        const endData = service.parseIcal(parsedICS, course.id);
        const parseIcalMock = jest.spyOn(service, 'parseIcal');
        parseIcalMock.mockImplementation(
          (icalData: CalendarResponse, courseId: number) => endData,
        );

        await service.updateCalendarForCourse(course);
        const queue = await QueueModel.findOne({
          courseId: course.id,
          room: 'Online',
        });
        expect(
          (await CourseModel.findOne(course.id, { relations: ['officeHours'] }))
            .officeHours,
        ).toMatchObject([
          {
            title: 'OH: Ameya, Julia',
            courseId: course.id,
            startTime: new Date(1589317200000),
            endTime: new Date(1589324400000),
            queueId: queue.id,
          },
          {
            title: 'OH: Elaina',
            courseId: course.id,
            startTime: new Date(1589475600000),
            endTime: new Date(1589482800000),
            queueId: queue.id,
          },
        ]);
      });
    });
  });
});
