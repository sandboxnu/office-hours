import { setupDBTest, setupServerTest, withServer } from "../testUtils";
import { MOCK_GET_COURSE_RESPONSE } from "../mocks/getCourse";
import { OfficeHourModel } from "../entities/OfficeHourModel";
import { CourseModel } from "../entities/CourseModel";
import {
  MOCK_TA_UPDATE_STATUS_ARRIVED_RESPONSE,
  MOCK_TA_UPDATE_STATUS_DEPARTED_RESPONSE,
} from "../mocks/taUpdateStatus";
import { QueueModel } from "../entities/QueueModel";
import { QuestionModel } from "../entities/QuestionModel";
import { userInfo } from "os";
import { UserModel } from "../entities/UserModel";
import { UserCourseModel } from "../entities/UserCourseModel";
import {
  QuestionStatus,
  OpenQuestionStatus,
  QuestionType,
} from "@template/common";

describe("/api/v1/courses/course_id/schedule", () => {
  setupDBTest();
  const getServer = setupServerTest();

  it("gets matthias's office hours", async () => {
    const course = await CourseModel.create({
      name: "CS 2500",
      icalUrl: "testest.com/water-sausage",
    }).save();
    await OfficeHourModel.create({
      title: "Matthias's Special Office Hours",
      room: "WVH 308",
      startTime: new Date(1970, 4, 20),
      endTime: new Date(1999, 4, 20),
      courseId: course.id,
    }).save();
    const get = await getServer().inject({
      method: "get",
      url: `/api/v1/courses/${course.id}/schedule`,
    });
    expect(get.statusCode).toEqual(200);
    expect(get.result).toEqual({
      name: "CS 2500",
      officeHours: [
        {
          endTime: new Date(1999, 4, 20),
          id: 1,
          room: "WVH 308",
          startTime: new Date(1970, 4, 20),
          title: "Matthias's Special Office Hours",
        },
      ],
    });
  });
});

describe("Course Routes", () => {
  setupDBTest();
  const getServer = setupServerTest();
  const expectWithServer = withServer(getServer);

  it("/courses/{course_id}/queues", async () => {
    const course = await CourseModel.create({
      name: "CS 2500",
      icalUrl: "fudies1.com",
    }).save();
    const queue = await QueueModel.create({
      room: "WVH 605",
      courseId: course.id,
    }).save();
    const user = await UserModel.create({
      username: "eddyTheDockerGodLi",
      email: "li.e@northeastern.edu",
      name: "Eddy Li",
      photoURL:
        "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=471f2d695fbb8a00ee740ad3ea910453986aec81ddaecf889ae98b3a1858597b12650afd0d4e59c561172f76cb1946eec217ed89bd4074c0",
    }).save();
    const userCourse = await UserCourseModel.create({
      userId: user.id,
      courseId: course.id,
    }).save();
    const question = await QuestionModel.create({
      queueId: queue.id,
      text: "Help pls",
      creatorId: userCourse.id,
      createdAt: new Date(2020, 16, 5),
      questionType: QuestionType.Other,
      status: "Queued",
    }).save();
    const get = await getServer().inject({
      method: "get",
      url: `/api/v1/courses/1/queues`,
    });
    expect(get.statusCode).toEqual(200);
    expect(get.result).toEqual([
      {
        id: 1,
        queueSize: 1,
        room: "WVH 605",
        staffList: [
          {
            id: 54,
            name: "Will Stenzel",
            photoURL:
              "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=24f4b12cccbf875c7740bbfed45a993900cf0d08d11aa07c84780b3a3501f3bacca4eb33ed5effee8aa2dd195750cfbc9884dd5f2ac62c8f",
          },
          {
            id: 42,
            name: "Grisha Zaytsev",
            photoURL:
              "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=471f2d695fbb8a00ee740ad3ea910453986aec81ddaecf889ae98b3a1858597b12650afd0d4e59c561172f76cb1946eec217ed89bd4074c0",
          },
        ],
      },
    ]);
  });

  describe("/courses/{course_id}/ta/change_status", () => {
    it("TA has arrived", async () => {
      await expectWithServer({
        method: "patch",
        url: "/api/v1/courses/169/ta/change_status",
        payload: {
          room: "WVH 650",
          status: "arrived",
        },
        result: MOCK_TA_UPDATE_STATUS_ARRIVED_RESPONSE,
      });
    });

    it("TA has departed", async () => {
      await expectWithServer({
        method: "patch",
        url: "/api/v1/courses/169/ta/change_status",
        payload: {
          room: "WVH 650",
          status: "departed",
        },
        result: MOCK_TA_UPDATE_STATUS_DEPARTED_RESPONSE,
      });
    });

    it("Fails on unexpected payload", async () => {
      await expectWithServer({
        method: "patch",
        url: "/api/v1/courses/169/ta/change_status",
        payload: {
          text: "I'm here!",
          status: "arrived",
        },
        statusCode: 400,
        result: {
          error: "Bad Request",
          message: "Invalid request payload input",
          statusCode: 400,
        },
      });
    });
  });
});
