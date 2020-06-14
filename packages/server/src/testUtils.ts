import { createConnection, Connection } from "typeorm";
import { init } from "./server";
import path from "path";
import { Server } from "@hapi/hapi";
import { CourseModel } from "./entity/CourseModel";
import { QueueModel } from "./entity/QueueModel";
import { UserModel } from "./entity/UserModel";
import { UserCourseModel } from "./entity/UserCourseModel";
import { QuestionModel } from "./entity/QuestionModel";
import { QuestionType } from "@template/common";

export function setupServerTest(): () => Server {
  let server: Server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  return () => server;
}

export function setupDBTest() {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection({
      type: "postgres",
      url: "postgres://postgres@localhost:5432/test",
      synchronize: true,
      logging: false,
      entities: [path.resolve(__dirname, "entity/**/*{.js,.ts}")],
      migrations: [path.resolve(__dirname, "migration/**/*{.js,.ts}")],
      subscribers: [path.resolve(__dirname, "subscriber/**/*{.js,.ts}")],
    });
  });

  beforeEach(async () => {
    await connection.synchronize(true);
  });

  afterAll(async () => {
    await connection.close();
  });
}

// An abstraction for testing server request responsese
export function withServer(server) {
  return async ({
    method,
    url,
    payload,
    statusCode = 200,
    result,
  }: {
    method: "get" | "post" | "patch";
    url: string;
    payload?: any;
    statusCode?: number;
    result;
  }) => {
    const request = await server().inject({ method, url, payload });
    expect(request.statusCode).toEqual(statusCode);
    expect(request.result).toStrictEqual(result);
  };
}

export const generateMockData = async () => {
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
};
