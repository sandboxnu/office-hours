import {
  Button,
  Form,
  Input,
  List,
  message,
  Modal,
  Switch,
  Tooltip,
} from "antd";
import useSWR from "swr";
import { API } from "@koh/api-client";
import { DesktopNotifPartial, UpdateProfileParams } from "@koh/common";
import { pick } from "lodash";
import { ReactElement, useEffect, useState } from "react";
import {
  requestNotificationPermission,
  registerNotificationSubscription,
  NotificationStates,
  getEndpoint,
  getNotificationState,
} from "../../utils/notification";
import { MinusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

const DeviceAddHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface NotificationSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function NotificationSettingsModal({
  visible,
  onClose,
}: NotificationSettingsModalProps): ReactElement {
  const { data: profile, error, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );

  const [form] = Form.useForm();
  const editProfile = async (updateProfile: UpdateProfileParams) => {
    const newProfile = { ...profile, ...updateProfile };
    mutate(newProfile, false);
    await API.profile.patch(
      pick(newProfile, [
        "desktopNotifsEnabled",
        "phoneNotifsEnabled",
        "phoneNumber",
      ])
    );
    mutate();
  };

  return (
    <Modal
      title="Notification Settings"
      visible={visible}
      onCancel={() => onClose()}
      onOk={async () => {
        const value = await form.validateFields();
        try {
          await editProfile(value);
          form.setFieldsValue(profile);
          onClose();
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
      }}
    >
      {profile && (
        <Form form={form} initialValues={profile}>
          <Form.Item
            label="Enable notifications on all devices"
            name="desktopNotifsEnabled"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <DeviceNotifPanel />
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
      )}
    </Modal>
  );
}

function useThisDeviceEndpoint(): null | string {
  const [endpoint, setEndpoint] = useState(null);
  useEffect(() => {
    (async () => setEndpoint(await getEndpoint()))();
  });
  return endpoint;
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
        renderItem={(item: DesktopNotifPartial) => (
          <List.Item
            actions={[
              <MinusCircleOutlined
                style={{ fontSize: "20px" }}
                key={0}
                onClick={async () => {
                  await API.notif.desktop.unregister(item.id);
                  mutate();
                }}
              />,
            ]}
          >
            <List.Item.Meta
              title={
                item.endpoint === thisEndpoint
                  ? "This Device"
                  : "Unknown Device"
              }
              description={`Registered ${item.createdAt.toLocaleDateString()}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
