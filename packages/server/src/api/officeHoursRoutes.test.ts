import { setupServerTest } from "../testUtils";
import { MOCK_GET_PROFILE_RESPONSE } from "../mocks/getProfile";
import { MOCK_GET_COURSE_RESPONSE } from "../mocks/getCourse";
import { MOCK_STUDENT_LIST_QUESTIONS_RESPONSE } from "../mocks/listQuestions";
import { MOCK_GET_QUESTION_RESPONSE } from "../mocks/getQuestion";

describe("/v1", () => {
  const getServer = setupServerTest();
  const expectWithServer = withServer(getServer);

  describe("/profile", () => {
    it("GET profile", async () => {
      const get = await getServer().inject({
        method: "get",
        url: "/v1/profile",
      });
      expect(get.statusCode).toEqual(200);
      expect(get.result).toEqual(MOCK_GET_PROFILE_RESPONSE);
    });
  });

  describe("/courses/:course_id", () => {
    test("GET fundies", async () => {
      await expectWithServer({
        method: "get",
        url: "/v1/courses/169",
        result: MOCK_GET_COURSE_RESPONSE,
      });
    });
    test("GET fails on unknown course", async () => {
      await expectWithServer({
        method: "get",
        url: "/v1/courses/999",
        statusCode: 404,
        result: "The course did not exist",
      });
    });
  });

  describe("/queues/:queue_id/questions", () => {
    it("GET fundies success", async () => {
      await expectWithServer({
        method: "get",
        url: "/v1/queues/169/questions",
        result: MOCK_STUDENT_LIST_QUESTIONS_RESPONSE,
      });
    });
    it("GET fundies fail", async () => {
      await expectWithServer({
        method: "get",
        url: "/v1/queues/999/questions",
        statusCode: 404,
        result: "unknown course",
      });
    });
  });

  describe("/queues/:queue_id/questions/:question_id", () => {
    it("GET question that exists", async () => {
      await expectWithServer({
        method: "get",
        url: "/v1/queues/169/questions/1",
        result: MOCK_GET_QUESTION_RESPONSE,
      });
    });
    it("GET fails on queue that doesn't exist", async () => {
      await expectWithServer({
        method: "get",
        url: "/v1/queues/000/questions/1",
        result: "unknown queue number",
        statusCode: 404,
      });
    });
    it("GET fails with ok queue but unknown question", async () => {
      await expectWithServer({
        method: "get",
        url: "/v1/queues/169/questions/0",
        result: "unknown question number",
        statusCode: 404,
      });
    });
  });
});

// an abstraction for testing server request responsese
function withServer(server) {
  return async ({
    method,
    url,
    statusCode = 200,
    result,
  }: {
    method: "get" | "post";
    url: string;
    statusCode?: number;
    result;
  }) => {
    const request = await server().inject({ method, url });
    expect(request.statusCode).toEqual(statusCode);
    expect(request.result).toStrictEqual(result);
  };
}
