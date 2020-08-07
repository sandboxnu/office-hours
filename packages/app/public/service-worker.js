"use strict";

// some code taken from https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679

// important constants
// todo: replace with actual user id.
const USER_ID = 1;
const ENDPOINT_REGISTER = `api/v1/notifications/desktop/register/${USER_ID}`;
const ENDPOINT_CREDENTIALS = `api/v1/notifications/desktop/credentials`;

// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const saveSubscription = async (subscription, user_id) => {
  const response = await fetch(ENDPOINT_REGISTER, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
  return response.json();
};

self.addEventListener("activate", async () => {
  // This will be called only once when the service worker is installed for first time.
  try {
    const PUBLICKEY = await (await fetch(ENDPOINT_CREDENTIALS)).json();
    const applicationServerKey = urlB64ToUint8Array(PUBLICKEY);
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    const response = await saveSubscription(subscription, USER_ID);
  } catch (err) {
    console.log("Error", err);
  }
});

self.addEventListener("push", async function (event) {
  if (event.data) {
    try {
      await showLocalNotification(
        "Khoury Office Hours",
        event.data.text(),
        self.registration
      );
    } catch (err) {
      throw new Err(
        `error sending notif from browser to local machine: ${err}`
      );
    }
  } else {
    console.log("Push event but no data");
  }
});

const showLocalNotification = async (title, body, swRegistration) => {
  const options = {
    body,
    // here you can add more properties like icon, image, vibrate, etc.
  };
  await swRegistration.showNotification(title, options);
};
