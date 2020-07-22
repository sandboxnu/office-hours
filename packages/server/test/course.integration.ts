import { CourseModule } from '../src/course/course.module';
import { QueueModel } from '../src/queue/queue.entity';
import {
  CourseFactory,
  OfficeHourFactory,
  QueueFactory,
  StudentCourseFactory,
  TACourseFactory,
  UserFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';

describe('Course Integration', () => {
  const supertest = setupIntegrationTest(CourseModule);
  describe('GET /courses/:id', () => {
    it('gets office hours no queues, since no queue is happening right now', async () => {
      const course = await CourseFactory.create({
        officeHours: [await OfficeHourFactory.create()],
      });
      await QueueFactory.create();
      // will not load b/c office hours aren't happening right now
      // (unless you go back in time and run these tests )
      const response = await supertest({ userId: 1 })
        .get(`/courses/${course.id}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });

    it('gets office hours and queues since time is now and rooms are same', async () => {
      const now = new Date();
      const course = await CourseFactory.create({
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
        room: "Matthias's Office",
        course: course,
      });

      await QueueFactory.create({
        course: course,
      });

      const response = await supertest({ userId: 1 })
        .get(`/courses/${course.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        queues: [{ id: 1, time: { start: now.toISOString() } }],
      });
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
    });
  });

  describe('DELETE, /courses/:id/ta_location/:room', () => {
    it('tests TA is deleted from queue if exists', async () => {
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
    });
  });
});
