import { setupServerTest, withServer, setupDBTest } from "../testUtils";
import { MOCK_GET_QUESTION_RESPONSE } from "../mocks/getQuestion";
import { QuestionModel } from "../entity/QuestionModel";
import { QuestionFactory } from "../factory";

describe("Queue Routes", () => {
  setupDBTest();
  const getServer = setupServerTest();
  const expectWithServer = withServer(getServer);

  describe("/queues/{queue_id}/questions", () => {
    it("GET fundies success", async () => {
      await QuestionFactory.create({ text: "Help pls" });

      const request = await getServer().inject({
        method: "get",
        url: "/api/v1/queues/1/questions",
      });
      expect(request.statusCode).toEqual(200);
      expect(request.result).toMatchObject([
        {
          closedAt: null,
          creator: {
            id: 1,
            name: "John Doe the 1th",
            photoURL: "https://pics/1",
          },
          helpedAt: null,
          id: 1,
          questionType: "Other",
          status: "Queued",
          taHelped: null,
          text: "Help pls",
        },
      ]);
    });
    // TODO: is this test supposed to fail now?
    it("GET fundies fail", async () => {
      await expectWithServer({
        method: "get",
        url: "/api/v1/queues/999/questions",
        statusCode: 404,
        result: "no questions were found",
      });
    });
    it("POST new question", async () => {
      const server = getServer();
      const request = await server.inject({
        method: "post",
        url: "/api/v1/queues/1/questions",
        payload: {
          text: "Don't know recursion",
          questionType: "Concept",
        },
      });
      expect(request.statusCode).toEqual(201);
      expect(request.result).toMatchObject({
        text: "Don't know recursion",
        taHelped: null,
        helpedAt: null,
        closedAt: null,
        questionType: "Concept",
        status: "Queued",
      });
      expect(QuestionModel.count({ where: { queueId: 1 } })).toEqual(1);
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
