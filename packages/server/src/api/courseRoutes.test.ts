import { setupServerTest, withServer } from "../testUtils";
import { MOCK_GET_COURSE_RESPONSE } from "../mocks/getCourse";

describe("Course Routes", () => {
  const getServer = setupServerTest();
  const expectWithServer = withServer(getServer);

  describe("/courses/{course_id}", () => {
    it("GET fundies", async () => {
      await expectWithServer({
        method: "get",
        url: "/v1/courses/169",
        result: MOCK_GET_COURSE_RESPONSE,
      });
    });
    it("GET fails on unknown course", async () => {
      await expectWithServer({
        method: "get",
        url: "/v1/courses/999",
        statusCode: 404,
        result: "The course did not exist",
      });
    });
  });
});
