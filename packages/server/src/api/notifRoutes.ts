import { ResponseObject, ServerRoute } from "@hapi/hapi";
import { NotifBody } from "@template/common";
import { DeepPartial } from "typeorm";
import * as webPush from "web-push";
import { NotifModel } from "../entity/NotifModel";
import { NotifPayload } from "../joi";
import { env } from "../env";

webPush.setVapidDetails(
  env.EMAIL,
  env.PUBLICKEY,
  env.PRIVATEKEY
);

export const notifRoutes: ServerRoute[] = [
  {
    // endpoint to get the VAPID public key
    method: "GET",
    path: "/api/v1/notifications/credentials",
    handler: (request, h) => {
      return JSON.stringify(env.PUBLICKEY);
    },
  },
  {
    method: "POST",
    path: "/api/v1/notifications/register/{user_id}", // TODO:   make this not a param for the users lmaoooooooo soI don't spam alex with sugondese
    handler: async (request, h): Promise<string | ResponseObject> => {
      const payload = request.payload as NotifBody;
      console.debug("registering user with endpoint:", payload.endpoint);
      await NotifModel.create(
        toDBmodel(payload, Number(request.params.user_id))
      ).save();
      return h.response(JSON.stringify("registration success")).code(200);
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
            await webPush.sendNotification(fromDBmodel(nm), "joe mama");
            console.debug(
              "notifying user with endpoint:",
              fromDBmodel(nm).endpoint
            );
          } catch (error) {
            console.debug("removing user for reason:", error.body);
            await NotifModel.remove(nm);
          }
        })
      );
      return h.response().code(200);
    },
  },
];

/**
 * converts from DB model instance to subscription format
 * @param nm the DB model
 */
function fromDBmodel(nm: NotifModel): NotifBody & { id: Number } {
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

/**
 * converts from subscription object to DB model param
 * @param payload the subscription object
 * @param uid the user id
 */
function toDBmodel(payload: NotifBody, uid: number): DeepPartial<NotifModel> {
  return {
    endpoint: payload.endpoint,
    expirationTime: payload.expirationTime && new Date(payload.expirationTime),
    p256dh: payload.keys.p256dh,
    auth: payload.keys.auth,
    userId: uid,
  };
}
