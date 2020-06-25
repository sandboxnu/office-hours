import "reflect-metadata";
import Hapi from "@hapi/hapi";
import io from "socket.io";
import { clubRoutes } from "./api/clubRoutes";
import { profileRoutes } from "./api/profileRoutes";
import { courseRoutes } from "./api/courseRoutes";
import { queueRoutes } from "./api/queueRoutes";
import websocketManager from "./websocketManager";
import { UserModel } from "./entity/UserModel";
import path from "path";
import dotenv from "dotenv";
import { entryRoutes } from "./api/entryRoutes";
dotenv.config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV === "development" ? "../.env.development" : "../.env"
  ),
});

// Just initialize, don't start
export async function init() {
  const server = Hapi.server({
    port: 3002,
    host: "localhost",
  });

  // Cookie auth
  await server.register(require("@hapi/cookie"));

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "office-hours",
      password: process.env.COOKIE_PASSWORD,
      isSecure: process.env.NODE_ENV === "production",
    },
    validateFunc: async (request, session) => {
      const user = await UserModel.findOne((session as any).id);
      if (!user) {
        return { valid: false };
      }
      return { valid: true, credentials: user };
    },
  });
  server.auth.default("session");

  // Add routes
  server.route(clubRoutes);
  server.route(profileRoutes);
  server.route(courseRoutes);
  server.route(queueRoutes);
  server.route(entryRoutes);

  // Bind socketio to http server
  websocketManager.bindSocketIO(io(server.listener));

  await server.register({
    plugin: require("hapi-dev-errors"),
    options: {
      showErrors: process.env.NODE_ENV !== "production",
    },
  });
  await server.initialize();
  return server;
}

// Actually start the server and listen on the port
export async function start() {
  const server = await init();
  await server.start();
  console.log("> Server up");
  return server;
}
