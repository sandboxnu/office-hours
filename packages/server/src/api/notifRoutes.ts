import { ServerRoute, ResponseObject } from "@hapi/hapi";
import { DesktopNotifBody } from "@template/common";
import { DesktopNotifModel } from "../entity/DesktopNotifModel";
import { DesktopNotifPayload, PhoneNotifPayload } from "../joi";
import * as dotenv from "dotenv";
import * as webPush from "web-push";
import { DeepPartial } from "typeorm";
import { PhoneNotifModel } from "../entity/PhoneNotifModel";

// configure env vars for VAPID
dotenv.config();

// if env vars not found, then throw an error early
if (!process.env.EMAIL || !process.env.PUBLICKEY || !process.env.PRIVATEKEY) {
  throw new Error(
    "please add a .env file with keys+email in packages/server. ask alex/eddy for deets."
  );
} else {
  webPush.setVapidDetails(
    process.env.EMAIL,
    process.env.PUBLICKEY,
    process.env.PRIVATEKEY
  );
}

export const notifRoutes: ServerRoute[] = [
  {
    // endpoint to get the VAPID public key
    method: "GET",
    path: "/api/v1/notifications/desktop/credentials",
    handler: (request, h) => {
      return JSON.stringify(process.env.PUBLICKEY);
    },
  },
  {
    method: "POST",
    path: "/api/v1/notifications/desktop/register/{user_id}", // TODO:   make this not a param for the users lmaoooooooo soI don't spam alex with sugondese
    handler: async (request, h): Promise<string | ResponseObject> => {
      const payload = request.payload as DesktopNotifBody;
      console.debug(
        "registering user for desktop notifications with endpoint:",
        payload.endpoint
      );
      await DesktopNotifModel.create(
        toDBmodel(payload, Number(request.params.user_id))
      ).save();
      return h.response(JSON.stringify("registration success")).code(200);
    },
    options: {
      validate: {
        payload: DesktopNotifPayload.options({ presence: "required" }),
      },
    },
  },
  {
    method: "POST",
    path: "/api/v1/notifications/phone/register/{user_id}", // TODO:   make this not a param for the users lmaoooooooo soI don't spam alex with sugondese
    handler: async (request, h): Promise<string | ResponseObject> => {
      const payload = request.payload as { phoneNumber: string };
      console.debug(
        "registering user for phone notifications with number:",
        payload.phoneNumber
      );
      await PhoneNotifModel.create({
        phoneNumber: payload.phoneNumber,
        userId: Number(request.params.user_id),
      }).save();
      return h
        .response(
          JSON.stringify("registration success for " + payload.phoneNumber)
        )
        .code(200);
    },
    options: {
      validate: {
        payload: PhoneNotifPayload.options({ presence: "required" }),
      },
    },
  },
  {
    method: "POST",
    path: "/api/v1/notifications/notify_user/{user_id}",
    handler: async (request, h) => {
      const user_id = request.params.user_id;
      const notifModelsOfUser = await DesktopNotifModel.find({
        where: {
          userId: user_id,
        },
      });
      await Promise.all(
        notifModelsOfUser.map(async (nm) => notifyUser(nm, "joe mama"))
      );
      return h.response().code(200);
    },
  },
];

export async function notifyUser(nm: DesktopNotifModel, message: string) {
  try {
    await webPush.sendNotification(fromDBmodel(nm), message);
    console.debug("notifying user with endpoint:", fromDBmodel(nm).endpoint);
  } catch (error) {
    console.debug("removing user for reason:", error.body);
    await DesktopNotifModel.remove(nm);
  }
}

/**
 * converts from DB model instance to subscription format
 * @param nm the DB model
 */
function fromDBmodel(nm: DesktopNotifModel): DesktopNotifBody & { id: Number } {
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
function toDBmodel(
  payload: DesktopNotifBody,
  uid: number
): DeepPartial<DesktopNotifModel> {
  return {
    endpoint: payload.endpoint,
    expirationTime: payload.expirationTime && new Date(payload.expirationTime),
    p256dh: payload.keys.p256dh,
    auth: payload.keys.auth,
    userId: uid,
  };
}
