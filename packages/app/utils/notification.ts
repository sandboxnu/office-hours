import { API } from "@template/api-client";
import { DesktopNotifBody } from "@template/common";
import { urlB64ToUint8Array } from "./urlB64ToUint8Array";

const checkSupport = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    throw new Error("No Push API Support!");
  }
};

// Tries to get notification permission and returns whether granted
export async function requestNotificationPermission(): Promise<boolean> {
  checkSupport();
  if (Notification.permission === "granted") {
    return true;
  } else {
    return (await window.Notification.requestPermission()) === "granted";
  }
}

const getRegistration = async (): Promise<ServiceWorkerRegistration> =>
  await window.navigator.serviceWorker.getRegistration();

// 1. subscribe to pushmanager
// 2. send subscription info to our backend
export const registerNotificationSubscription = async () => {
  checkSupport();
  const subscription = await ensureSubscription();
  await API.notif.desktop.register(subscription.toJSON() as DesktopNotifBody);
  console.log("registered");
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
    console.log(subscription);
  }
  return subscription;
}
