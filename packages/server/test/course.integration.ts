import {
  ERROR_MESSAGES,
  Role,
  TACheckinTimesResponse,
  TACheckoutResponse,
} from '@koh/common';
import { CourseModel } from 'course/course.entity';
import { EventModel, EventType } from 'profile/event-model.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import supertest from 'supertest';
import { CourseModule } from '../src/course/course.module';
import { QueueModel } from '../src/queue/queue.entity';
import {
  ClosedOfficeHourFactory,
  CourseFactory,
  EventFactory,
  KhouryProfCourseFactory,
  OfficeHourFactory,
  ProfSectionGroupsFactory,
  QuestionFactory,
  QueueFactory,
  StudentCourseFactory,
  TACourseFactory,
  UserCourseFactory,
  UserFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';

describe('Course Integration', () => {
  const supertest = setupIntegrationTest(CourseModule);
  describe('GET /courses/:id', () => {
    it('gets office hours no queues, since no queue is happening right now', async () => {
      const course = await CourseFactory.create({
        officeHours: [await ClosedOfficeHourFactory.create()],
        timezone: 'America/New_York',
      });
      await QueueFactory.create();

      await UserCourseFactory.create({
        user: await UserFactory.create(),
        course: course,
      });
      // will not load b/c office hours aren't happening right now
      // (unless you go back in time and run these tests )
      const response = await supertest({ userId: 1 })
        .get(`/courses/${course.id}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });

    it('gets office hours and queues since time is now and rooms are same', async () => {
      const now = new Date();
      const course = await CourseFactory.create();

      await QueueFactory.create({
        room: "Matthias's Office",
        course: course,
        officeHours: [
          await OfficeHourFactory.create({
            startTime: now,
            endTime: new Date(now.valueOf() + 4500000),
            room: "Matthias's Office",
          }),
          await OfficeHourFactory.create(), // aren't loaded cause time off
        ],
      });

      await QueueFactory.create({
        course: course,
      });

      await UserCourseFactory.create({
        user: await UserFactory.create(),
        course: course,
      });

      const response = await supertest({ userId: 1 })
        .get(`/courses/${course.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        queues: [{ id: 1 }, { id: 2 }],
      });
    });

    it('cant get office hours if not a member of the course', async () => {
      const now = new Date();
      const course = await CourseFactory.create();

      await QueueFactory.create({
        room: "Matthias's Office",
        course: course,
        officeHours: [
          await OfficeHourFactory.create({
            startTime: now,
            endTime: new Date(now.valueOf() + 4500000),
            room: "Matthias's Office",
          }),
          await OfficeHourFactory.create(), // aren't loaded cause time off
        ],
      });

      await supertest({ userId: 1 }).get(`/courses/${course.id}`).expect(401);
    });
  });

  //TODO: make a DSL for testing auth points using Hack your own Language
  describe('POST /courses/:id/ta_location/:room', () => {
    it('checks a TA into an existing queue', async () => {
      const queue = await QueueFactory.create();
      const ta = await UserFactory.create();
      await TACourseFactory.create({
        course: queue.course,
        user: ta,
      });

      const response = await supertest({ userId: ta.id })
        .post(`/courses/${queue.course.id}/ta_location/${queue.room}`)
        .expect(201);

      expect(response.body).toMatchSnapshot();

      const events = await EventModel.find();
      expect(events.length).toBe(1);
      expect(events[0].eventType).toBe(EventType.TA_CHECKED_IN);
      expect(events[0].queueId).toBe(queue.id);
    });

    it("Doesn't allow student to check in", async () => {
      const queue = await QueueFactory.create();
      const student = await UserFactory.create();
      await StudentCourseFactory.create({
        course: queue.course,
        user: student,
      });

      await supertest({ userId: student.id })
        .post(`/courses/${queue.course.id}/ta_location/${queue.room}`)
        .expect(401);

      const events = await EventModel.find();
      expect(events.length).toBe(0);
    });

    it("Doesn't allow a TA to check into a new queue", async () => {
      const ta = await UserFactory.create();
      const tcf = await TACourseFactory.create({
        course: await CourseFactory.create(),
        user: ta,
      });
      const response = await supertest({ userId: ta.id })
        .post(`/courses/${tcf.courseId}/ta_location/The Alamo`)
        .expect(403);

      expect(response.body.message).toBe(
        ERROR_MESSAGES.courseController.checkIn
          .cannotCreateNewQueueIfNotProfessor,
      );

      const events = await EventModel.find();
      expect(events.length).toBe(0);
    });

    it('Allows a professor to create a new queue', async () => {
      const professor = await UserFactory.create();
      const pcf = await UserCourseFactory.create({
        course: await CourseFactory.create(),
        user: professor,
        role: Role.PROFESSOR,
      });
      const response = await supertest({ userId: professor.id })
        .post(`/courses/${pcf.courseId}/ta_location/The Alamo`)
        .expect(201);

      expect(response.body).toMatchObject({
        id: 1,
        room: 'The Alamo',
        staffList: [{ id: professor.id }],
      });

      const events = await EventModel.find();
      expect(events.length).toBe(1);
      expect(events[0].eventType).toBe(EventType.TA_CHECKED_IN);
    });

    it("Doesn't allow users to check into multiple queues", async () => {
      const queue1 = await QueueFactory.create();
      const ta = await UserFactory.create();
      await TACourseFactory.create({
        course: queue1.course,
        user: ta,
      });
      const queue2 = await QueueFactory.create({
        course: queue1.course,
      });

      await supertest({ userId: ta.id })
        .post(`/courses/${queue1.courseId}/ta_location/${queue1.room}`)
        .expect(201);

      let events = await EventModel.count();
      expect(events).toBe(1);

      const response2 = await supertest({ userId: ta.id })
        .post(`/courses/${queue2.courseId}/ta_location/${queue2.room}`)
        .expect(401);
      expect(response2.body.message).toBe(
        ERROR_MESSAGES.courseController.checkIn.cannotCheckIntoMultipleQueues,
      );
      events = await EventModel.count();
      expect(events).toBe(1);
    });
  });

  describe('DELETE, /courses/:id/ta_location/:room', () => {
    it('tests TA is checked out from queue if exists', async () => {
      const ta = await UserFactory.create();
      const queue = await QueueFactory.create({
        room: 'The Alamo',
        staffList: [ta],
      });
      const tcf = await TACourseFactory.create({
        course: queue.course,
        user: ta,
      });

      expect(
        (await QueueModel.findOne({}, { relations: ['staffList'] })).staffList
          .length,
      ).toEqual(1);

      await supertest({ userId: ta.id })
        .delete(`/courses/${tcf.courseId}/ta_location/The Alamo`)
        .expect(200);

      expect(
        await QueueModel.findOne({}, { relations: ['staffList'] }),
      ).toMatchObject({
        staffList: [],
      });

      const events = await EventModel.find();
      expect(events.length).toBe(1);
      expect(events[0].eventType).toBe(EventType.TA_CHECKED_OUT);
      expect(events[0].queueId).toBe(queue.id);
    });

    it('tests student cant checkout from queue', async () => {
      const student = await UserFactory.create();
      const queue = await QueueFactory.create({
        room: 'The Alamo',
      });
      const scf = await StudentCourseFactory.create({
        course: queue.course,
        user: student,
      });

      await supertest({ userId: student.id })
        .delete(`/courses/${scf.courseId}/ta_location/The Alamo`)
        .expect(401);
    });

    it('returns canClearQueue true when TA checks out', async () => {
      const ofs = await ClosedOfficeHourFactory.create();
      const ta = await UserFactory.create();
      const queue = await QueueFactory.create({
        room: 'The Alamo',
        staffList: [ta],
        officeHours: [ofs],
      });
      const tcf = await TACourseFactory.create({
        course: queue.course,
        user: ta,
      });
      await QuestionFactory.create({ queue: queue });

      const checkoutResult: TACheckoutResponse = (
        await supertest({ userId: ta.id })
          .delete(`/courses/${tcf.courseId}/ta_location/The Alamo`)
          .expect(200)
      ).body;

      expect(checkoutResult.canClearQueue).toBeTruthy();
    });

    it('tests nothing happens if ta not in queue', async () => {
      const ta = await UserFactory.create();
      const queue = await QueueFactory.create({ room: 'The Alamo' });
      const tcf = await TACourseFactory.create({
        course: queue.course,
        user: ta,
      });

      await supertest({ userId: ta.id })
        .delete(`/courses/${tcf.courseId}/ta_location/The Alamo`)
        .expect(200);

      expect(
        await QueueModel.findOne({}, { relations: ['staffList'] }),
      ).toMatchObject({
        staffList: [],
      });

      const events = await EventModel.find({
        where: { userId: ta.id },
      });

      expect(events.length).toBe(0);
    });
  });

  describe('POST /courses/:id/update_override', () => {
    it('tests creating override using the endpoint', async () => {
      const course = await CourseFactory.create();
      const user = await UserFactory.create();
      const professor = await UserFactory.create();
      await UserCourseFactory.create({
        user: professor,
        role: Role.PROFESSOR,
        course,
      });
      await supertest({ userId: professor.id })
        .post(`/courses/${course.id}/update_override`)
        .send({ email: user.email, role: Role.STUDENT })
        .expect(201);
      const ucm = await UserCourseModel.findOne({
        where: {
          userId: user.id,
        },
      });
      expect(ucm.role).toEqual(Role.STUDENT);
      expect(ucm.override).toBeTruthy();
    });
  });

  describe('DELETE /courses/:id/update_override', () => {
    it('tests deleting override using the endpoint', async () => {
      const course = await CourseFactory.create();
      const user = await UserFactory.create();
      const professor = await UserFactory.create();
      await UserCourseFactory.create({
        user: professor,
        role: Role.PROFESSOR,
        course,
      });
      await UserCourseFactory.create({
        user: user,
        role: Role.TA,
        override: true,
        course,
      });

      await supertest({ userId: professor.id })
        .delete(`/courses/${course.id}/update_override`)
        .send({ email: user.email, role: Role.STUDENT })
        .expect(200);

      const ucm = await UserCourseModel.findOne({
        where: {
          userId: user.id,
        },
      });
      expect(ucm).toBeUndefined();
    });
  });

  describe('GET /courses/:id/ta_check_in_times', () => {
    it('tests that events within date range are gotten', async () => {
      const now = new Date();
      const yesterday = new Date();
      yesterday.setUTCHours(now.getUTCHours() - 24);
      const course = await CourseFactory.create();
      const ta = await UserFactory.create();
      const professor = await UserFactory.create();

      await UserCourseFactory.create({
        user: ta,
        role: Role.TA,
        course,
      });
      await UserCourseFactory.create({
        user: professor,
        role: Role.PROFESSOR,
        course,
      });

      await EventFactory.create({
        user: ta,
        course: course,
        time: yesterday,
        eventType: EventType.TA_CHECKED_IN,
      });

      const yesterdayPlusTwoHours = new Date(yesterday);
      yesterdayPlusTwoHours.setUTCHours(yesterday.getUTCHours() + 2);

      await EventFactory.create({
        user: ta,
        course: course,
        time: new Date(yesterdayPlusTwoHours),
        eventType: EventType.TA_CHECKED_OUT,
      });

      const thenThreeMoreHours = new Date(yesterdayPlusTwoHours);
      thenThreeMoreHours.setUTCHours(yesterdayPlusTwoHours.getUTCHours() + 3);

      await EventFactory.create({
        user: ta,
        course: course,
        time: thenThreeMoreHours,
        eventType: EventType.TA_CHECKED_IN,
      });

      const twelveHoursAFter = new Date(thenThreeMoreHours);
      twelveHoursAFter.setUTCHours(thenThreeMoreHours.getUTCHours() + 12);

      await EventFactory.create({
        user: ta,
        course: course,
        time: twelveHoursAFter,
        eventType: EventType.TA_CHECKED_OUT_FORCED,
      });

      const justNow = new Date(Date.now() - 1000);

      await EventFactory.create({
        user: ta,
        course: course,
        time: justNow,
        eventType: EventType.TA_CHECKED_IN,
      });

      const twoDaysAgo = new Date();
      twoDaysAgo.setUTCDate(twoDaysAgo.getUTCDate() - 2);

      const dateNow = new Date();
      const data = await supertest({ userId: professor.id })
        .get(`/courses/${course.id}/ta_check_in_times`)
        .query({
          startDate: twoDaysAgo,
          endDate: dateNow,
        })
        .expect(200);

      const checkinTimes = (data.body as unknown as TACheckinTimesResponse)
        .taCheckinTimes;

      const taName = ta.firstName + ' ' + ta.lastName;
      expect(checkinTimes).toStrictEqual([
        {
          checkinTime: yesterday.toISOString(),
          checkoutTime: yesterdayPlusTwoHours.toISOString(),
          forced: false,
          inProgress: false,
          name: taName,
          numHelped: 0,
        },
        {
          checkinTime: thenThreeMoreHours.toISOString(),
          checkoutTime: twelveHoursAFter.toISOString(),
          forced: true,
          inProgress: false,
          name: taName,
          numHelped: 0,
        },
        {
          checkinTime: justNow.toISOString(),
          forced: false,
          inProgress: true,
          name: taName,
          numHelped: 0,
        },
      ]);
    });
  });

  describe('DELETE /courses/:id/withdraw_course', () => {
    it('tests withdrawing from a nonexistent user course', async () => {
      await supertest({ userId: 1 })
        .delete(`/profile/1/withdraw_course`)
        .send({ email: 'yamsarecool@gmail.com', role: Role.STUDENT })
        .expect(404);
    });
    it('tests the users ability to withdraw from their own course', async () => {
      const course = await CourseFactory.create();
      // extranous student, TA, and Professor
      const userS = await UserFactory.create({
        firstName: 's',
        lastName: 's',
        email: 'stu@neu.edu',
      });
      const userT = await UserFactory.create({
        firstName: 't',
        lastName: 't',
        email: 'ta@neu.edu',
      });
      const userP = await UserFactory.create({
        firstName: 'p2',
        lastName: 'p2',
        email: 'prof2@neu.edu',
      });
      const professor = await UserFactory.create({
        firstName: 'p',
        lastName: 'p',
        email: 'profm@neu.edu',
      });

      await UserCourseFactory.create({
        user: professor,
        role: Role.PROFESSOR,
        course,
      });

      await UserCourseFactory.create({
        user: userS,
        role: Role.STUDENT,
        course,
      });
      await UserCourseFactory.create({
        user: userT,
        role: Role.TA,
        course,
      });
      await UserCourseFactory.create({
        user: userP,
        role: Role.PROFESSOR,
        course,
      });

      await supertest({ userId: userS.id })
        .delete(`/courses/${course.id}/withdraw_course`)
        .send({ email: userS.email, role: Role.STUDENT })
        .expect(200);

      await supertest({ userId: userT.id })
        .delete(`/courses/${course.id}/withdraw_course`)
        .send({ email: userT.email, role: Role.TA })
        .expect(200);

      await supertest({ userId: userP.id })
        .delete(`/courses/${course.id}/withdraw_course`)
        .send({ email: userP.email, role: Role.PROFESSOR })
        .expect(200);

      const testSPresent = await UserCourseModel.findOne({
        where: {
          userId: userS.id,
        },
      });
      const testTPresent = await UserCourseModel.findOne({
        where: {
          userId: userT.id,
        },
      });
      const testPPresent = await UserCourseModel.findOne({
        where: {
          userId: userP.id,
        },
      });
      const userCourse = await UserCourseModel.findOne({
        where: { courseId: course.id, userId: professor.id },
      });
      expect(testSPresent).toBeUndefined();
      expect(testTPresent).toBeUndefined();
      expect(testPPresent).toBeUndefined();
      expect(userCourse).toBeDefined();
    });
  });
});

describe('POST /courses/register_courses', async () => {
  const professor = await UserFactory.create();
  // const pcf = await UserCourseFactory.create({
  //   course: await CourseFactory.create(),
  //   user: professor,
  //   role: Role.PROFESSOR,
  // });
  const course1 = await KhouryProfCourseFactory.create({
    crns: [12345, 56765, 44444],
    semester: 'Fall 2021',
    name: 'Underwater Basket-Weaving',
  });

  const course2 = await KhouryProfCourseFactory.create({
    crns: [11111, 22222],
    semester: 'Spring 2022',
    name: 'Underwater Basket-Weaving 2',
  });

  await ProfSectionGroupsFactory.create({
    prof: professor,
    profId: professor.id,
    sectionGroups: [course1, course2],
  });

  const registerCourses = [
    {
      name: 'Underwater Basket-Weaving',
      displayName: 'Scuba',
      iCalURL:
        'https://calendar.google.com/calendar/ical/yamsarecool/basic.ics',
      coordinatorEmail: 'yamsarecool@gmail.com',
      timezone: 'America/New_York',
    },
    {
      name: 'Underwater Basket-Weaving 2',
      displayName: 'Scuba 2',
      iCalURL:
        'https://calendar.google.com/calendar/ical/potatoesarecool2/basic.ics',
      coordinatorEmail: 'potatoesarecool2@outlook.com',
      timezone: 'America/Los_Angeles',
    },
  ];

  it('tests prof registering an array of courses', async () => {
    await supertest({ userId: professor.id })
      .post(`/courses/register_courses`)
      .send(registerCourses)
      .expect(201);

    const underwaterBasketweaving = await CourseModel.findOne({
      name: 'Underwater Basket-Weaving',
    });
    const underwaterBasketweaving2 = await CourseModel.findOne({
      name: 'Underwater Basket-Weaving 2',
    });
    expect(underwaterBasketweaving2).toBeDefined();

    const userCourse = await UserCourseFactory.create({
      course: underwaterBasketweaving,
      user: professor,
      role: Role.PROFESSOR,
    });
    // checks if the course has the professor as a userCourse
    expect(underwaterBasketweaving.userCourses).toContain(userCourse);
  });
});
