import { ServerRoute } from "@hapi/hapi";
import { NotifBody } from "@template/common";
import { NotifModel } from "../entity/NotifModel";
import { NotifPayload } from "../joi";
import * as dotenv from "dotenv";
import * as webPush from "web-push";

dotenv.config();
webPush.setVapidDetails(
  process.env.EMAIL,
  process.env.PUBLICKEY,
  process.env.PRIVATEKEY
);

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
      validate: {
        payload: NotifPayload.options({ presence: "required" }),
      },
    },
  },
  {
    method: "POST",
    path: "/api/v1/notifications/notify_user/{user_id}",
    handler: async (request, h) => {
      const user_id = request.params.user_id;
      const notifModelsOfUser = await NotifModel.find({
        where: {
          userId: user_id,
        },
      });
      await Promise.all(
        notifModelsOfUser.map(async (nm) => {
          try {
            await webPush.sendNotification(unparse(nm), "joe mama");
          } catch (error) {
            console.error(error.body);
            await NotifModel.remove(nm);
          }
        })
      );
      return h.response().code(200);
    },
  },
];
function unparse(nm: NotifModel) {
  return {
    id: nm.id,
    endpoint: nm.endpoint,
    expirationTime: nm.expirationTime,
    keys: {
      p256dh: nm.p256dh,
      auth: nm.auth,
    },
  };
}
