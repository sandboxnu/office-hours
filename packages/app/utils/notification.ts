import { API } from "@template/api-client";
import { DesktopNotifBody } from "@template/common";
import { urlB64ToUint8Array } from "./urlB64ToUint8Array";

const doesBrowserSupportNotifications = () =>
  "serviceWorker" in window.navigator && "PushManager" in window;

export enum NotificationStates {
  granted,
  notAllowed,
  browserUnsupported,
}

// Tries to get notification permission and returns whether granted
export async function requestNotificationPermission(): Promise<
  NotificationStates
> {
  if (!doesBrowserSupportNotifications()) {
    return NotificationStates.browserUnsupported;
  }
  if (Notification.permission === "granted") {
    return NotificationStates.granted;
  } else {
    return (await window.Notification.requestPermission()) === "granted"
      ? NotificationStates.granted
      : NotificationStates.notAllowed;
  }
}

const getRegistration = async (): Promise<ServiceWorkerRegistration> =>
  await window.navigator.serviceWorker.getRegistration();

// 1. subscribe to pushmanager
// 2. send subscription info to our backend
export const registerNotificationSubscription = async (): Promise<void> => {
  if (doesBrowserSupportNotifications()) {
    const subscription = await ensureSubscription();
    await API.notif.desktop.register(subscription.toJSON() as DesktopNotifBody);
  }
};

/**
 * Ensure we are subscribed to our browser's push service
 */
async function ensureSubscription(): Promise<PushSubscription> {
  const { pushManager } = await getRegistration();
  let subscription = await pushManager.getSubscription();
  if (subscription === null) {
    const PUBLICKEY = await API.notif.desktop.credentials();
    console.log(PUBLICKEY);
    const applicationServerKey = urlB64ToUint8Array(PUBLICKEY);
    const options = { applicationServerKey, userVisibleOnly: true };
    subscription = await pushManager.subscribe(options);
  }
  return subscription;
}
