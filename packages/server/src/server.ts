import "reflect-metadata";
import Hapi from "@hapi/hapi";
import io from "socket.io";
import { clubRoutes } from "./api/clubRoutes";
import { courseRoutes } from "./api/courseRoutes";
import websocketManager from "./websocketManager";

const server = Hapi.server({
  port: 3002,
  host: "localhost",
});
// Add routes
server.route(clubRoutes);
server.route(courseRoutes);

// Bind socketio to http server
websocketManager.bindSocketIO(io(server.listener));

// Good for testing
export async function init() {
  await server.initialize();
  return server;
}

// Actually start the server and listen on the port
export async function start() {
  await server.register({
    plugin: require("hapi-dev-errors"),
    options: {
      showErrors: process.env.NODE_ENV !== "production",
    },
  });

  await server.start();
  console.log("> Server up");
  return server;
}
