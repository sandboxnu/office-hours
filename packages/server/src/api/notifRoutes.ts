import { ResponseObject, ServerRoute } from "@hapi/hapi";
import { DesktopNotifBody } from "@template/common";
import * as dotenv from "dotenv";
import twilio, { Twilio } from "twilio";
import { DeepPartial } from "typeorm";
import * as webPush from "web-push";
import { DesktopNotifModel } from "../entity/DesktopNotifModel";
import { PhoneNotifModel } from "../entity/PhoneNotifModel";
import { UserModel } from "../entity/UserModel";
import { DesktopNotifPayload, PhoneNotifPayload } from "../joi";

// configure env vars for VAPID + Twilio
dotenv.config();
let twilioClient: undefined | Twilio;

// if env vars not found, then throw an error early
if (
  !process.env.EMAIL ||
  !process.env.PUBLICKEY ||
  !process.env.PRIVATEKEY ||
  !process.env.TWILIOACCOUNTSID ||
  !process.env.TWILIOAUTHTOKEN ||
  !process.env.TWILIOPHONENUMBER
) {
  throw new Error(
    "please add a .env file with keys+email in packages/server. ask alex/eddy for deets. also twilio stuff"
  );
} else {
  webPush.setVapidDetails(
    process.env.EMAIL,
    process.env.PUBLICKEY,
    process.env.PRIVATEKEY
  );
  twilioClient = twilio(
    process.env.TWILIOACCOUNTSID,
    process.env.TWILIOAUTHTOKEN
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

      let phoneNumber: string;
      try {
        phoneNumber = (
          await twilioClient.lookups.phoneNumbers(payload.phoneNumber).fetch()
        ).phoneNumber;
      } catch (err) {
        // if the phone number is not found, then endpoint should return invalid
        return h.response("invalid phone number").code(400);
      }

      // todo: need to verify that the user owns the phone number before adding it
      await PhoneNotifModel.create({
        phoneNumber,
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
      const notifModelsOfUser = await UserModel.findOne({
        where: {
          id: user_id,
        },
        relations: ["desktopNotifs", "phoneNotifs"],
      });

      // run the promises concurrently
      await Promise.all([
        ...notifModelsOfUser.desktopNotifs.map(async (nm) =>
          desktopNotifyUser(nm, "joe mama")
        ),
        ...notifModelsOfUser.phoneNotifs.map(async (pn) => {
          phoneNotifyUser(pn, "have u heard of ligma?");
        }),
      ]);

      return h.response().code(200);
    },
  },
];

// notifies a user via desktop notification
export async function desktopNotifyUser(
  nm: DesktopNotifModel,
  message: string
) {
  try {
    await webPush.sendNotification(fromDBmodel(nm), message);
  } catch (error) {
    await DesktopNotifModel.remove(nm);
  }
}

// notifies a user via phone number
export async function phoneNotifyUser(pn: PhoneNotifModel, message: string) {
  try {
    twilioClient &&
      (await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIOPHONENUMBER,
        to: pn.phoneNumber,
      }));
  } catch (error) {
    console.error("problem sending message", error);
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
