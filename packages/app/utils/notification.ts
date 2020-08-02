import { API } from "@template/api-client";
import { DesktopNotifBody } from "@template/common";

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

export const registerNotificationSubscription = async () => {
  checkSupport();
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration.pushManager.getSubscription();
  await API.notif.desktop.register(subscription.toJSON() as DesktopNotifBody);
};
