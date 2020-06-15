import { createConnection, Connection } from "typeorm";
import { init } from "./server";
import path from "path";
import { Server } from "@hapi/hapi";
import { CourseModel } from "./entities/CourseModel";
import { QueueModel } from "./entities/QueueModel";
import { UserModel } from "./entities/UserModel";
import { UserCourseModel } from "./entities/UserCourseModel";
import { QuestionModel } from "./entities/QuestionModel";
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
