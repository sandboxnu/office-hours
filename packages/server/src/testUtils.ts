import { createConnection, Connection } from "typeorm";
import { init } from "./server";
import path from "path";
import { Server } from "@hapi/hapi";

export function setup(): () => Server {
  let server: Server;
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
    server = await init();
    // clear db data
    await connection.synchronize(true);
  });

  afterEach(async () => {
    await server.stop();
  });

  afterAll(async () => {
    await connection.close();
  });
  return () => server;
}
