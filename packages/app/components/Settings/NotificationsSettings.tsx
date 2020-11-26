import { MinusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { DesktopNotifPartial, UpdateProfileParams } from "@koh/common";
import { Button, Form, Input, List, message, Switch, Tooltip } from "antd";
import { pick } from "lodash";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import {
  getEndpoint,
  getNotificationState,
  NotificationStates,
  registerNotificationSubscription,
  requestNotificationPermission,
} from "../../utils/notification";

const DeviceAddHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function NotificationsSettings(): ReactElement {
  const { data: profile, error, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );

  const [form] = Form.useForm();
  const editProfile = async (updateProfile: UpdateProfileParams) => {
    const newProfile = { ...profile, ...updateProfile };
    mutate(newProfile, false);
    console.log("ligma", newProfile, profile, updateProfile);
    await API.profile.patch(
      pick(newProfile, [
        "desktopNotifsEnabled",
        "phoneNotifsEnabled",
        "phoneNumber",
      ])
    );
    mutate();
  };

  const handleOk = async () => {
    const value = await form.validateFields();
    try {
      await editProfile(value);
      form.setFieldsValue(profile);
    } catch (e) {
      if (
        e.response?.status === 400 &&
        e.response?.data?.message === "phone number invalid"
      ) {
        form.setFields([
          { name: "phoneNumber", errors: ["Invalid phone number"] },
        ]);
      }
    }
  };

  return (
    profile && (
      <div style={{ paddingTop: "50px" }}>
        <Form form={form} initialValues={profile}>
          <Form.Item
            label="Enable notifications on all devices"
            name="desktopNotifsEnabled"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() =>
              form?.getFieldValue("desktopNotifsEnabled") && (
                <DeviceNotifPanel />
              )
            }
          </Form.Item>
          {/* <Divider orientation="left">SMS</Divider> */}
          <Form.Item
            style={{ marginTop: "30px" }}
            label="Enable SMS notifications"
            name="phoneNotifsEnabled"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() =>
              form?.getFieldValue("phoneNotifsEnabled") && (
                <Form.Item
                  label="Phone #"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please input your number to enable text notifications",
                    },
                  ]}
                >
                  <Input placeholder={"XXX-XXX-XXXX"} />
                </Form.Item>
              )
            }
          </Form.Item>
        </Form>
        <Tooltip title="How do notifications work?">
          <QuestionCircleOutlined
            style={{ float: "right", fontSize: "25px" }}
            onClick={() =>
              window.open(
                "https://www.notion.so/593f9eb67eb04abbb8008c285ed5a8dd?v=b3d8ef6b3d2742f1985a6406e582601a"
              )
            }
          />
        </Tooltip>
        <Button key="submit" type="primary" onClick={handleOk}>
          Ok
        </Button>
      </div>
    )
  );
}

function useThisDeviceEndpoint(): null | string {
  const [endpoint, setEndpoint] = useState(null);
  useEffect(() => {
    (async () => setEndpoint(await getEndpoint()))();
  });
  return endpoint;
}

function renderDeviceInfo(
  device: DesktopNotifPartial,
  isThisDevice: boolean
): string {
  if (device.name) {
    return isThisDevice ? `${device.name} (This Device)` : device.name;
  } else {
    return isThisDevice ? "This Device" : "Other Device";
  }
}

function DeviceNotifPanel() {
  const thisEndpoint = useThisDeviceEndpoint();
  const { data: profile, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );
  const thisDesktopNotif = profile?.desktopNotifs?.find(
    (dn) => dn.endpoint === thisEndpoint
  );
  return (
    <div>
      <DeviceAddHeader>
        <h3>Your Devices</h3>
        {!thisDesktopNotif && (
          <Tooltip
            title={
              getNotificationState() ===
                NotificationStates.browserUnsupported &&
              "Browser does not support notifications. Please use Chrome or Firefox, and not Incognito Mode."
            }
          >
            <Button
              onClick={async () => {
                const canNotify = await requestNotificationPermission();
                if (canNotify === NotificationStates.notAllowed) {
                  message.warning("Please allow notifications in this browser");
                }
                if (canNotify === NotificationStates.granted) {
                  await registerNotificationSubscription();
                  mutate();
                }
              }}
              disabled={
                getNotificationState() === NotificationStates.browserUnsupported
              }
              style={{ marginBottom: "4px" }}
            >
              Add This Device
            </Button>
          </Tooltip>
        )}
      </DeviceAddHeader>
      <List
        bordered
        dataSource={profile.desktopNotifs}
        locale={{ emptyText: "No Devices Registered To Receive Notifications" }}
        renderItem={(device: DesktopNotifPartial) => (
          <List.Item
            actions={[
              <MinusCircleOutlined
                style={{ fontSize: "20px" }}
                key={0}
                onClick={async () => {
                  await API.notif.desktop.unregister(device.id);
                  mutate();
                }}
              />,
            ]}
          >
            <List.Item.Meta
              title={renderDeviceInfo(device, device.endpoint === thisEndpoint)}
              description={`Registered ${device.createdAt.toLocaleDateString()}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
