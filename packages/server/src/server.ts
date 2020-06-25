import "reflect-metadata";
import Hapi from "@hapi/hapi";
import { profileRoutes } from "./api/profileRoutes";
import { courseRoutes } from "./api/courseRoutes";
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
