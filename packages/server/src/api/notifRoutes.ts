import { ServerRoute } from "@hapi/hapi";
import { NotifBody } from "@template/common";
import { NotifModel } from "../entity/NotifModel";
import Joi from "@hapi/joi";
import { NotifSchema } from "../joi";

export const notifRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/service-worker.js",
    handler: {
      file: `service-worker.js`,
    },
  },
  {
    method: "POST",
    path: "/api/v1/register-notif/{user_id}", // TODO:   make this not a param for the users lmaoooooooo soI don't spam alex with sugondese
    handler: async (request, h) => {
      const payload = request.payload as NotifBody;
      await NotifModel.create({
        endpoint: payload.endpoint,
        expirationTime: payload.expirationTime,
        p256dh: payload.keys.p256dh,
        auth: payload.keys.auth,
        userId: Number(request.params.user_id),
      }).save();
      return h.response().code(200);
    },
    options: {
      response: {
        schema: NotifSchema.options({ presence: "required" }),
      },
    },
  },
];
