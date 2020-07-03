import { createConnection, Connection } from "typeorm";
import { init } from "./server";
import path from "path";
import { Server, ServerInjectOptions, AuthCredentials } from "@hapi/hapi";
import { Course } from "../../nest-server/src/course/course.entity";
import { Queue } from "../../nest-server/src/queue/queue.entity";
import { User } from "../../nest-server/src/profile/user.entity";
import { UserFactory } from "../../nest-server/src/factory";
import { UserCourse } from "../../nest-server/src/profile/user-course.entity";
import { Question } from "../../nest-server/src/question/question.entity";
import { QuestionType } from "@template/common";
import hapiAuthCookie from "@hapi/cookie";

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

// TODO: Remove this
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
    const user = await UserFactory.create();
    const request = await server().inject({
      method,
      url,
      payload,
      auth: { strategy: "session", credentials: user as AuthCredentials },
    });
    expect(request.statusCode).toEqual(statusCode);
    expect(request.result).toStrictEqual(result);
  };
}

export async function injectAsUser(
  server: Server,
  user: User,
  opts: ServerInjectOptions
) {
  return await server.inject({
    auth: { strategy: "session", credentials: user as AuthCredentials },
    ...opts,
  });
}
