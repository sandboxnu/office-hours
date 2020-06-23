import { ServerRoute } from "@hapi/hapi";
import { NotifBody } from "@template/common";
import { NotifModel } from "../entity/NotifModel";
import Joi from "@hapi/joi";
import { NotifSchema } from "../joi";
import * as dotenv from "dotenv";

dotenv.config();

export const notifRoutes: ServerRoute[] = [
  {
    // endpoint to get the VAPID public key
    method: "GET",
    path: "/api/v1/notifications/credentials",
    handler: (request, h) => {
      return JSON.stringify(process.env.PUBLICKEY);
    },
  },
  {
    method: "POST",
    path: "/api/v1/notifications/register/{user_id}", // TODO:   make this not a param for the users lmaoooooooo soI don't spam alex with sugondese
    handler: async (request, h) => {
      const payload = request.payload as NotifBody;
      const toSave = {
        endpoint: payload.endpoint,
        expirationTime: new Date(payload.expirationTime),
        p256dh: payload.keys.p256dh,
        auth: payload.keys.auth,
        userId: Number(request.params.user_id),
      };
      console.debug(toSave);
      await NotifModel.create({
        endpoint: payload.endpoint,
        expirationTime: new Date(payload.expirationTime),
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
