import { ServerRoute } from "@hapi/hapi";

export const notifRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/service-worker.js",
    handler: (request, h) => {
      return `service-worker.js`;
    },
  },
];
