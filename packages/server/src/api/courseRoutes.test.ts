import { setupServerTest, withServer } from "../testUtils";
import { MOCK_GET_COURSE_RESPONSE } from "../mocks/getCourse";
import {
  MOCK_TA_UPDATE_STATUS_ARRIVED_RESPONSE,
  MOCK_TA_UPDATE_STATUS_DEPARTED_RESPONSE,
} from "../mocks/taUpdateStatus";

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
