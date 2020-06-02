import { setupServerTest, withServer } from "../testUtils";
import { MOCK_STUDENT_LIST_QUESTIONS_RESPONSE } from "../mocks/listQuestions";
import { MOCK_GET_QUESTION_RESPONSE } from "../mocks/getQuestion";
import { MOCK_CREATE_QUESTION_RESPONSE } from "../mocks/createQuestion";
import { QuestionType } from "@template/common";

describe("Queue Routes", () => {
  const getServer = setupServerTest();
  const expectWithServer = withServer(getServer);

  describe("/queues/{queue_id}/questions", () => {
    it("GET fundies success", async () => {
      await expectWithServer({
        method: "get",
        url: "/api/v1/queues/169/questions",
        result: MOCK_STUDENT_LIST_QUESTIONS_RESPONSE,
      });
    });
    it("GET fundies fail", async () => {
      await expectWithServer({
        method: "get",
        url: "/api/v1/queues/999/questions",
        statusCode: 404,
        result: "unknown course",
      });
    });
    it("POST new question", async () => {
      await expectWithServer({
        method: "post",
        url: "/api/v1/queues/45/questions",
        payload: {
          text: "Don't know recursion",
          questionType: "Concept",
        },
        statusCode: 200,
        result: MOCK_CREATE_QUESTION_RESPONSE,
      });
    });
    it("POST new question fails with bad params", async () => {
      await expectWithServer({
        method: "post",
        url: "/api/v1/queues/45/questions",
        payload: { question: "I need help" },
        statusCode: 400,
        result: {
          error: "Bad Request",
          message: "Invalid request payload input",
          statusCode: 400,
        },
      });
    });
  });

  describe("/queues/{queue_id}/questions/:question_id", () => {
    it("GET question that exists", async () => {
      await expectWithServer({
        method: "get",
        url: "/api/v1/queues/169/questions/1",
        result: MOCK_GET_QUESTION_RESPONSE,
      });
    });
  });
});
