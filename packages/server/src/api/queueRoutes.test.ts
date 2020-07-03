
import { QuestionStatusKeys } from "@template/common";
import { Question } from "../../../nest-server/src/question/question.entity";
import {
  QuestionFactory,
  QueueFactory,

  TACourseFactory, UserFactory
} from "../../../nest-server/src/factory";
import { setupDBTest, setupServerTest, withServer, injectAsUser } from "../testUtils";

describe("Queue Routes", () => {
  setupDBTest();
  const getServer = setupServerTest();
  const expectWithServer = withServer(getServer);

  // TODO: Make sure we specifiy what type of user we are creating with the UserFactory
  describe("/queues/{queue_id}/questions", () => {
    it("GET question success", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });
      const user = await UserFactory.create();
      const request = await injectAsUser(getServer(), user, {
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
    it("GET questions fail with non-exisitant queue", async () => {
      const user = await UserFactory.create();
      const request = await injectAsUser(getServer(), user, {
        method: "get",
        url: "/api/v1/queues/999/questions",
      });
      expect(request.statusCode).toEqual(404);
      expect(request.result).toEqual("Queue not found");
    });
    it("GET questions returns empty list", async () => {
      const queue = await QueueFactory.create();
      const user = await UserFactory.create();

      const request = await injectAsUser(getServer(), user, {
        method: "get",
        url: `/api/v1/queues/${queue.id}/questions`,
      });
      expect(request.statusCode).toEqual(200);
      expect(request.result).toEqual([]);
    });
    it("POST new question", async () => {
      const queue = await QueueFactory.create();
      expect(await Question.count({ where: { queueId: 1 } })).toEqual(0);
      const user = await UserFactory.create();
      const request = await injectAsUser(getServer(), user, {
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
      expect(await Question.count({ where: { queueId: 1 } })).toEqual(1);
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
      const question = await QuestionFactory.create({
        text: "Recursion is wrecking me",
      });
      // Q: How do we make the data for this user is consistent? I'm not sure we can pass values into the sequence for the user
      const user = await UserFactory.create();
      const request = await injectAsUser(getServer(), user, {
        method: "get",
        url: `/api/v1/queues/${question.queueId}/questions/${question.id}`,
      });
      expect(request.statusCode).toEqual(200);
      expect(request.result).toMatchObject({
        closedAt: null,
        creator: {
          id: 1,
          name: "John Doe the 7th",
          photoURL: "https://pics/7",
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
      const user = await UserFactory.create();
      const request = await injectAsUser(getServer(), user, {
        method: "get",
        url: `/api/v1/queues/${queue.id}/questions/1`,
      });
      expect(request.statusCode).toEqual(404);
      expect(request.result).toEqual("Question not found");
    });
    it("GET question - queue not found", async () => {
      const user = await UserFactory.create();
      const request = await injectAsUser(getServer(), user, {
        method: "get",
        url: `/api/v1/queues/10/questions/1`,
      });
      expect(request.statusCode).toEqual(404);
      expect(request.result).toEqual("Queue not found");
    });
    it("PATCH question as student updates it", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });

      const user = await UserFactory.create();
      const request = await injectAsUser(getServer(), user, {
        method: "patch",
        url: `/api/v1/queues/${q.queueId}/questions/${q.id}`,
        payload: {
          text: "NEW TEXT",
        },
      });
      expect(request.statusCode).toEqual(200);
      expect(request.result).toMatchObject({ id: q.id, text: "NEW TEXT" });
      expect(await Question.findOne({ id: q.id })).toMatchObject({
        text: "NEW TEXT",
      });
    });
    it.skip("PATCH taHelped as student is not allowed", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: q.queue.course, user: ta });

      const request = await injectAsUser(getServer(), ta, {
        method: "patch",
        url: `/api/v1/queues/${q.queueId}/questions/${q.id}`,
        payload: {
          taHelped: {
            id: ta.id,
            name: ta.name,
          },
        },
      });
      expect(request.statusCode).toEqual(401);
    });
    it.skip("PATCH status to helping as student not allowed", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });

      const request = await getServer().inject({
        method: "patch",
        url: `/api/v1/queues/${q.queueId}/questions/${q.id}`,
        payload: {
          status: QuestionStatusKeys.Helping,
        },
      });
      expect(request.statusCode).toEqual(401);
    });
    it("PATCH status to helping as TA works", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: q.queue.course, user: ta });

      const request = await injectAsUser(getServer(), ta, {
        method: "patch",
        url: `/api/v1/queues/${q.queueId}/questions/${q.id}`,
        payload: {
          status: QuestionStatusKeys.Helping,
        },
      });
      expect(request.statusCode).toEqual(200);
      expect(request.result).toMatchObject({
        status: QuestionStatusKeys.Helping,
      });
    });
    it.skip("PATCH status to Resolved as TA works", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: q.queue.course, user: ta });

      const request = await getServer().inject({
        method: "patch",
        url: `/api/v1/queues/${q.queueId}/questions/${q.id}`,
        payload: {
          status: QuestionStatusKeys.Resolved,
        },
      });
      expect(request.statusCode).toEqual(200);
      expect(request.result).toMatchObject({
        status: QuestionStatusKeys.Resolved,
        taHelped: ta,
      });
    });
    it.skip("PATCH anything other than status as TA not allowed", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: q.queue.course, user: ta });

      const request = await getServer().inject({
        method: "patch",
        url: `/api/v1/queues/${q.queueId}/questions/${q.id}`,
        payload: {
          text: "bonjour",
        },
      });
      expect(request.statusCode).toEqual(401);
    });
    it.skip("PATCH question fails when you are not the question creator", async () => {
      // TODO
      // expect(request.statusCode).toEqual(401);
    });
  });
});
