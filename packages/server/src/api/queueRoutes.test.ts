import { setupServerTest, withServer } from "../testUtils";
import { MOCK_STUDENT_LIST_QUESTIONS_RESPONSE } from "../mocks/listQuestions";
import { MOCK_GET_QUESTION_RESPONSE } from "../mocks/getQuestion";

describe("Queue Routes", () => {
  const getServer = setupServerTest();
  const expectWithServer = withServer(getServer);

  describe("/queues/{queue_id}/questions", () => {
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

  describe("/queues/{queue_id}/questions/:question_id", () => {
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
