import { Role, TACheckoutResponse } from '@koh/common';
import { EventModel, EventType } from 'profile/event-model.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { CourseModule } from '../src/course/course.module';
import { QueueModel } from '../src/queue/queue.entity';
import {
  ClosedOfficeHourFactory,
  CourseFactory,
  OfficeHourFactory,
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

    it('checks TA into a new queue', async () => {
      const ta = await UserFactory.create();
      const tcf = await TACourseFactory.create({
        course: await CourseFactory.create(),
        user: ta,
      });
      const response = await supertest({ userId: ta.id })
        .post(`/courses/${tcf.courseId}/ta_location/The Alamo`)
        .expect(201);

      expect(response.body).toMatchObject({
        id: 1,
        room: 'The Alamo',
        staffList: [{ id: ta.id }],
      });

      const events = await EventModel.find();
      expect(events.length).toBe(1);
      expect(events[0].eventType).toBe(EventType.TA_CHECKED_IN);
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

      const UCM = UserCourseModel.findOne({
        where: { userId: ta.id, courseId: queue.courseId },
      });
      const events = await EventModel.find({
        where: { user: UCM },
      });

      expect(events.length).toBe(0);
    });

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
