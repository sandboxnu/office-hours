"use strict";

// some code taken from https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679

self.addEventListener("push", async function (event) {
  if (event.data) {
    try {
      await showLocalNotification(
        "UBC Office Hours",
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
