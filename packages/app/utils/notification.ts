import { API } from "@koh/api-client";
import { DesktopNotifBody } from "@koh/common";
import { urlB64ToUint8Array } from "./urlB64ToUint8Array";
import platform from "platform";

const doesBrowserSupportNotifications = () =>
  "serviceWorker" in window.navigator && "PushManager" in window;

export enum NotificationStates {
  granted,
  notAllowed,
  browserUnsupported,
}

export function getNotificationState(): NotificationStates {
  if (!doesBrowserSupportNotifications()) {
    return NotificationStates.browserUnsupported;
  } else if (Notification.permission === "granted") {
    return NotificationStates.granted;
  } else {
    return NotificationStates.notAllowed;
  }
}

// Tries to get notification permission and returns whether granted
export async function requestNotificationPermission(): Promise<NotificationStates> {
  let state = getNotificationState();
  if (state === NotificationStates.notAllowed) {
    await window.Notification.requestPermission();
    state = getNotificationState();
  }
  return state;
}

const getRegistration = async (): Promise<ServiceWorkerRegistration> =>
  await window.navigator?.serviceWorker?.getRegistration();

// 1. subscribe to pushmanager
// 2. send subscription info to our backend
export const registerNotificationSubscription = async (): Promise<void> => {
  if (doesBrowserSupportNotifications()) {
    const subscription = await ensureSubscription();
    const subData = subscription.toJSON() as DesktopNotifBody;
    await API.notif.desktop.register({
      ...subData,
      name: `${platform.name} on ${platform.os}`,
    });
  }
};

/**
 * Ensure we are subscribed to our browser's push service
 */
async function ensureSubscription(): Promise<PushSubscription> {
  const pushManager = (await getRegistration())?.pushManager;
  let subscription = await pushManager?.getSubscription();
  if (subscription === null) {
    const PUBLICKEY = await API.notif.desktop.credentials();
    console.log(PUBLICKEY);
    const applicationServerKey = urlB64ToUint8Array(PUBLICKEY);
    const options = { applicationServerKey, userVisibleOnly: true };
    subscription = await pushManager.subscribe(options);
  }
  return subscription;
}

export async function getEndpoint(): Promise<string | NotificationStates> {
  const subscription = await (
    await getRegistration()
  )?.pushManager?.getSubscription();
  return subscription?.endpoint;
}
