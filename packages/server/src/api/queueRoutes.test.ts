import { setupServerTest, withServer, setupDBTest } from "../testUtils";
import { MOCK_GET_QUESTION_RESPONSE } from "../mocks/getQuestion";
import { QuestionModel } from "../entity/QuestionModel";
import { QuestionFactory, QueueFactory } from "../factory";

describe("Queue Routes", () => {
  setupDBTest();
  const getServer = setupServerTest();
  const expectWithServer = withServer(getServer);

  describe("/queues/{queue_id}/questions", () => {
    it("GET question success", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });

      const request = await getServer().inject({
        method: "get",
        url: `/api/v1/queues/${q.id}/questions`,
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
    it("GET questions fail with non-exisitant queue", async () => {
      const request = await getServer().inject({
        method: "get",
        url: "/api/v1/queues/999/questions",
      });
      expect(request.statusCode).toEqual(404);
      expect(request.result).toEqual("Queue not found");
    });
    it("GET questions returns empty list", async () => {
      const queue = await QueueFactory.create();
      const request = await getServer().inject({
        method: "get",
        url: `/api/v1/queues/${queue.id}/questions`,
      });
      expect(request.statusCode).toEqual(200);
      expect(request.result).toEqual([]);
    });
    it("POST new question", async () => {
      const queue = await QueueFactory.create();

      expect(await QuestionModel.count({ where: { queueId: 1 } })).toEqual(0);
      const request = await getServer().inject({
        method: "post",
        url: `/api/v1/queues/${queue.id}/questions`,
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
        status: "Drafting",
      });
      expect(await QuestionModel.count({ where: { queueId: 1 } })).toEqual(1);
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
    it.skip("PATCH question fails when you are not the question creator", async () => {
      // TODO
      // expect(request.statusCode).toEqual(401);
    });
  });

  describe("/queues/{queue_id}/questions/:question_id", () => {
    it("GET question that exists", async () => {
      const question = await QuestionFactory.create({
        text: "Recursion is wrecking me",
      });
      const request = await getServer().inject({
        method: "get",
        url: `/api/v1/queues/${question.queueId}/questions/${question.id}`,
      });
      expect(request.statusCode).toEqual(200);
      expect(request.result).toMatchObject({
        closedAt: null,
        creator: {
          id: 1,
          name: "John Doe the 2th",
          photoURL: "https://pics/2",
        },
        helpedAt: null,
        id: 1,
        questionType: "Other",
        status: "Queued",
        taHelped: null,
        text: "Recursion is wrecking me",
      });
    });
    it("GET question not found", async () => {
      const queue = await QueueFactory.create();
      const request = await getServer().inject({
        method: "get",
        url: `/api/v1/queues/${queue.id}/questions/1`,
      });
      expect(request.statusCode).toEqual(404);
      expect(request.result).toEqual("Question not found");
    });
    it("GET question - queue not found", async () => {
      const request = await getServer().inject({
        method: "get",
        url: `/api/v1/queues/10/questions/1`,
      });
      expect(request.statusCode).toEqual(404);
      expect(request.result).toEqual("Queue not found");
    });
  });
});
