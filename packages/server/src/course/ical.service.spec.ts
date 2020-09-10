import { Test, TestingModule } from '@nestjs/testing';
import { IcalService } from './ical.service';
import * as iCal from 'node-ical';
import { TestTypeOrmModule } from '../../test/util/testUtils';
import { CourseFactory } from '../../test/util/factories';
import { QueueModel } from '../queue/queue.entity';
import { CalendarResponse } from 'node-ical';
import { Connection } from 'typeorm';
import { CourseModel } from './course.entity';

// oopsah
const parsedICS = iCal.parseICS(`BEGIN:VCALENDAR
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
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20200512T170000
DTEND;TZID=America/New_York:20200512T190000
RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20200620T035959Z;BYDAY=TU
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
END:VEVENT
BEGIN:VEVENT
DTSTART;TZID=America/New_York:20200514T130000
DTEND;TZID=America/New_York:20200514T150000
RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20200620T035959Z;BYDAY=TH
DTSTAMP:20200518T220522Z
UID:1e6mva12gktah0506vdko3vjd7@google.com
CREATED:20200513T180615Z
DESCRIPTION:
LAST-MODIFIED:20200513T180615Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:OH: Elaina
TRANSP:OPAQUE
END:VEVENT
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
END:VEVENT
END:VCALENDAR`);

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

  beforeEach(async () => {
    await conn.synchronize(true);
  });

  describe('parseIcal', () => {
    it('handles a pre-generated subset of CS 2510 classes', () => {
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

    describe('updateCalendarForCourse', () => {
      it('creates officehours', async () => {
        const course = await CourseFactory.create({ id: 123 });

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
            title: 'OH- Ameya, Julia',
            courseId: course.id,
            startTime: new Date(1589317200000),
            endTime: new Date(1589324400000),
            queueId: queue.id,
          },
          {
            title: 'OH-Elaina',
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
