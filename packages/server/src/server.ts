import Hapi from "@hapi/hapi";
import * as hde from "hapi-dev-errors";
import "reflect-metadata";
import { courseRoutes } from "./api/courseRoutes";
import { notifRoutes } from "./api/notifRoutes";
import { profileRoutes } from "./api/profileRoutes";
import { queueRoutes } from "./api/queueRoutes";

// Just initialize, don't start
export async function init() {
  const server = Hapi.server({
    port: 3002,
    host: "localhost",
  });

  // Add routes
  server.route(profileRoutes);
  server.route(courseRoutes);
  server.route(queueRoutes);
  server.route(notifRoutes);

  // Error logging
  await server.register({
    plugin: hde,
    options: {
      showErrors: process.env.NODE_ENV !== "production",
    },
  });
  // Request logging
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
