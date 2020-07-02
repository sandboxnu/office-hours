import Hapi from "@hapi/hapi";
import * as hde from "hapi-dev-errors";
import "reflect-metadata";
import { courseRoutes } from "./api/courseRoutes";
import { notifRoutes } from "./api/notifRoutes";
import { profileRoutes } from "./api/profileRoutes";
import { queueRoutes } from "./api/queueRoutes";
import { UserModel } from "../../nest-server/src/entities/UserModel";
import { entryRoutes } from "./api/entryRoutes";
import { env } from "./env";

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
      password: env.COOKIE_PASSWORD,
      isSecure: env.NODE_ENV === "production",
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
  server.route(profileRoutes);
  server.route(courseRoutes);
  server.route(queueRoutes);
  server.route(notifRoutes);
  server.route(entryRoutes);

  // Error logging
  await server.register({
    plugin: hde,
    options: {
      showErrors: env.NODE_ENV !== "production",
    },
  });
  // Request logging
  if (env.NODE_ENV !== "test") {
    server.events.on("response", (request) => {
      console.log(
        request.info.remoteAddress +
          ": " +
          request.method.toUpperCase() +
          " " +
          request.path +
          " --> " +
          (request.response as any).statusCode
      );
    });
  }

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
