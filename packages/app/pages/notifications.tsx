import { API } from "@template/api-client";
import { User } from "@template/common";
import { Button, Input } from "antd";
import { useProfile } from "../hooks/useProfile";

export default function Notifications() {
  const profile: User = useProfile();

  // web push code
  const check = () => {
    if (!("serviceWorker" in navigator)) {
      throw new Error("No Service Worker support!");
    }
    if (!("PushManager" in window)) {
      throw new Error("No Push API Support!");
    }
  };

  const requestNotificationPermission = async () => {
    if (Notification.permission === "granted") {
      console.log(`permission previously granted`);
    } else if (Notification.permission === "denied") {
      console.log("permission previously denied");
    } else if (Notification.permission === "default") {
      console.log("permission not set > requesting");
      await window.Notification.requestPermission();
    }
  };

  const checkBrowserAndRequestNotifications = async () => {
    check();
    // try to get notification permissions
    await requestNotificationPermission();
  };

  return (
    <div>
      <div style={{ flexDirection: "row-reverse" }}>
        <Button size="large" onClick={checkBrowserAndRequestNotifications}>
          Request Notification Permission
        </Button>
        <Button size="large" onClick={() => API.notif.notify_user(profile.id)}>
          Test Notify
        </Button>
      </div>
      <Input
        placeholder="phone number"
        style={{ width: 200 }}
        onPressEnter={(value) => {
          return API.notif.phone.register(profile.id, {
            phoneNumber: (value.target as any).value,
          });
        }}
      ></Input>
    </div>
  );
}
