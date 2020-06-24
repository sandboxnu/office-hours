// taken from https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679

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

// todo: figure out how to do this
const ORIGIN = `http://localhost:3000`;
const SERVER_URL = (s) => `${ORIGIN}/api/v1/notifications/${s}`;
// todo: replace with actual user id.
const USER_ID = 1;

const saveSubscription = async (subscription, user_id) => {
  const URL = SERVER_URL(`register`) + "/" + user_id;
  console.log("joe mama");
  console.log(JSON.stringify(subscription));
  const response = await fetch(URL, {
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
    const URL = SERVER_URL(`credentials`);
    // todo: is there a better way to get the body?
    const PUBLICKEY = await (await fetch(URL)).json();
    const applicationServerKey = urlB64ToUint8Array(PUBLICKEY);
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    const response = await saveSubscription(subscription, USER_ID);
    console.log(response);
  } catch (err) {
    console.log("Error", err);
  }
});

self.addEventListener("push", async function (event) {
  if (event.data) {
    // todo: remove later
    console.log("Push event!! ", event.data.text());
    try {
      await showLocalNotification(
        // todo: change mssg
        "alex is brain dead",
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
