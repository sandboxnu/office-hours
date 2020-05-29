import { createConnection, Connection } from "../../ormconfig";
import { init } from "./server";
import path from "path";
import { Server } from "@hapi/hapi";

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
