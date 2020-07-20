import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, message, Popover, Row, Switch } from "antd";
import { register, unregister } from "next-offline/runtime";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";

const AvatarButton = styled.div`
  cursor: pointer;
`;

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

export default function Settings() {
  // first get initial data using useSWR (or from profile)
  // todo: replace these constants with hits to useSWR call to profile

  const [desktopNotifToggled, setDesktopNotifToggled] = useState<boolean>(true);
  const [phoneNotifToggled, setPhoneNotifToggled] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("+12223334444");

  const onDesktopNotifToggle = async (toggle: boolean) => {
    if (toggle) {
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

      setDesktopNotifToggled(true);
    } else {
      unregister();
      setDesktopNotifToggled(false);
    }
  };

  const onPhoneNotifToggle = async (toggle: boolean) => {
    if (toggle) {
      if (!phoneNumber) {
        message.warning("Must enter phone number to enable text notifications");
        setPhoneNotifToggled(false);
      } else {
        try {
          //todo: change when ligma branch is merged
          //await API.notif.phone.register(user_id, phoneNumbers[0]);
          setPhoneNotifToggled(true);
        } catch (e) {
          message.error(e.body);
          setPhoneNotifToggled(false);
        }
      }
    } else {
      //todo: add phone unregister endpoint
      setPhoneNotifToggled(false);
    }
  };

  return (
    <Popover
      content={
        <PopoverContainer>
          <Row>
            <LableText> Web Notifications </LableText>
            <SwitchContainer>
              <Switch
                checked={desktopNotifToggled}
                onChange={onDesktopNotifToggle}
              />
            </SwitchContainer>
          </Row>
          <Row>
            <LableText> Text Notifications </LableText>
            <SwitchContainer>
              <Switch
                checked={phoneNotifToggled}
                onChange={onPhoneNotifToggle}
              />
            </SwitchContainer>
          </Row>
          {phoneNotifToggled && (
            <Row>
              <LableText> Phone </LableText>
              <InputContainer>
                <Input
                  value={phoneNumber}
                  onChange={(newNum) => {
                    setPhoneNumber(newNum.target.value);
                  }}
                  placeholder={"XXX-XXX-XXXX"}
                />
              </InputContainer>
            </Row>
          )}
          <Row>
            <Link href="/login" as="/login">
              <CenteredIcon style={{ cursor: "pointer" }}>
                <Avatar size={44} icon={<LogoutOutlined />} />
              </CenteredIcon>
            </Link>
          </Row>
        </PopoverContainer>
      }
      title="User Settings"
      placement={"bottomRight"}
      trigger="click"
    >
      <AvatarButton type="link">
        <Avatar size={47} icon={<UserOutlined />} />
      </AvatarButton>
    </Popover>
  );
}
