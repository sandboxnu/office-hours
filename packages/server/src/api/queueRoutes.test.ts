import { setupServerTest, withServer, setupDBTest } from "../testUtils";
import { MOCK_GET_QUESTION_RESPONSE } from "../mocks/getQuestion";
import { MOCK_CREATE_QUESTION_RESPONSE } from "../mocks/createQuestion";
import { QuestionType } from "@template/common";
import { CourseModel } from "../entity/CourseModel";
import { QueueModel } from "../entity/QueueModel";
import { UserModel } from "../entity/UserModel";
import { UserCourseModel } from "../entity/UserCourseModel";
import { QuestionModel } from "../entity/QuestionModel";
import { QuestionSchema } from "../joi";

describe("Queue Routes", () => {
  setupDBTest();
  const getServer = setupServerTest();
  const expectWithServer = withServer(getServer);

  describe("/queues/{queue_id}/questions", () => {
    it("GET fundies success", async () => {
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
      await expectWithServer({
        method: "get",
        url: "/api/v1/queues/1/questions",
        result: [
          {
            closedAt: null,
            createdAt: new Date(2020, 16, 5),
            creator: {
              id: 1,
              name: "Eddy Li",
              photoURL:
                "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=471f2d695fbb8a00ee740ad3ea910453986aec81ddaecf889ae98b3a1858597b12650afd0d4e59c561172f76cb1946eec217ed89bd4074c0",
            },
            helpedAt: null,
            id: 1,
            questionType: "Other",
            status: "Queued",
            taHelped: null,
            text: "Help pls",
          },
        ],
      });
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
