import styled from "styled-components";
import {
  Popover,
  Switch,
  Row,
  Input,
  Button,
  Avatar,
  Menu,
  InputNumber,
} from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { API } from "@template/api-client";

const PopoverContainer = styled.div`
  width: 270px;
  height: 215px;
`;

const LableText = styled.div`
  font-weight: normal;
  font-size: 20px;
  margin-top: 10px;
  margin-left: 14px;
`;

const SwitchContainer = styled.div`
  float: right;
  margin-left: 30px;
  margin-top: 10px;
`;

const InputContainer = styled.div`
  width: 150px;
  margin-left: 30px;
  margin-top: 10px;
`;

const CenteredIcon = styled.div`
  margin-left: 125px;
  margin-top: 25px;
`;

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
  // get rid of old service worker, and then try and re-register.
  // just kidding, this breaks Chrome for some reason (ai ya).
  // unregister();
  // have to use setTimeout because unregister does async things, but is sync
  setTimeout(() => {
    register();
  }, 500);
};

export default function Settings() {
  // first get initial data using useSWR (or from profile)
  // todo: replace these constants with hits to useSWR call to profile
  const user_id = 1;
  const desktopNotifToggled = true;
  const phoneNotifToggled = false;
  const phoneNumbers = [`+12223334444`];

  return (
    <div>
      <Popover
        content={
          <PopoverContainer>
            <Row>
              <LableText> Web Notifications </LableText>
              <SwitchContainer>
                {" "}
                <Switch
                  defaultChecked={desktopNotifToggled}
                  onChange={async () => API.notif.register(user_id)}
                />{" "}
              </SwitchContainer>
            </Row>
            <Row>
              <LableText> Text Notifications </LableText>
              <SwitchContainer>
                {" "}
                <Switch defaultChecked={phoneNotifToggled} />{" "}
              </SwitchContainer>
            </Row>
            <Row>
              <LableText> Phone </LableText>
              <InputContainer>
                {" "}
                <Input placeholder={"XXX-XXX-XXXX"} />{" "}
              </InputContainer>
            </Row>
            <Row>
              <Link href="/login" as="/login">
                <CenteredIcon>
                  {" "}
                  <Avatar size={44} icon={<LogoutOutlined />} />{" "}
                </CenteredIcon>
              </Link>
            </Row>
          </PopoverContainer>
        }
        title="User Settings"
        placement={"bottomRight"}
        trigger="click"
      >
        <Button type="link">
          <Avatar size={47} icon={<UserOutlined />} />
        </Button>
      </Popover>
    </div>
  );
}
