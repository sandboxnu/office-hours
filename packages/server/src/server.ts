import "reflect-metadata";
import Hapi from "@hapi/hapi";
import io from "socket.io";
import { clubRoutes } from "./api/clubRoutes";
import { profileRoutes } from "./api/profileRoutes";
import { courseRoutes } from "./api/courseRoutes";
import { queueRoutes } from "./api/queueRoutes";
import { notifRoutes } from "./api/notifRoutes";
import websocketManager from "./websocketManager";
import * as hde from "hapi-dev-errors";

// Just initialize, don't start
export async function init() {
  const server = Hapi.server({
    port: 3002,
    host: "localhost",
  });

  // Add routes
  server.route(clubRoutes);
  server.route(profileRoutes);
  server.route(courseRoutes);
  server.route(queueRoutes);
  server.route(notifRoutes);

  // Bind socketio to http server
  websocketManager.bindSocketIO(io(server.listener));

  await server.register({
    plugin: hde,
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
