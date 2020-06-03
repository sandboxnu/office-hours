import { setupDBTest, setupServerTest, withServer } from "../testUtils";
import { MOCK_GET_COURSE_RESPONSE } from "../mocks/getCourse";
import { OfficeHourModel } from "../entity/OfficeHourModel";
import { CourseModel } from "../entity/CourseModel";
import {
  MOCK_TA_UPDATE_STATUS_ARRIVED_RESPONSE,
  MOCK_TA_UPDATE_STATUS_DEPARTED_RESPONSE,
} from "../mocks/taUpdateStatus";

describe("/api/v1/courses/course_id", () => {
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
      url: `/api/v1/courses/${course.id}`,
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
  const getServer = setupServerTest();
  const expectWithServer = withServer(getServer);

  describe("/courses/{course_id}", () => {
    it("GET fundies", async () => {
      await expectWithServer({
        method: "get",
        url: "/api/v1/courses/169",
        result: MOCK_GET_COURSE_RESPONSE,
      });
    });
    it("GET fails on unknown course", async () => {
      await expectWithServer({
        method: "get",
        url: "/api/v1/courses/999",
        statusCode: 404,
        result: "The course did not exist",
      });
    });
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
