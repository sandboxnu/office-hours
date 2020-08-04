import { Form, Input, Modal, Row, Switch } from "antd";
import useSWR from "swr";
import { API } from "@template/api-client";
import { UpdateProfileParams } from "@template/common";
import { pick } from "lodash";
import { ReactElement } from "react";
import {
  requestNotificationPermission,
  registerNotificationSubscription,
  NotificationStates,
} from "../../utils/notification";

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
    if (updateProfile.desktopNotifsEnabled) {
      const canNotify = await requestNotificationPermission();
      if (canNotify === NotificationStates.granted) {
        await registerNotificationSubscription();
      }
    }
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
          <p>Get notified when you reach the top of the queue.</p>
          <Form.Item
            label="Enable browser notifications"
            name="desktopNotifsEnabled"
            valuePropName="checked"
          >
            <Switch
              onChange={async (checked) => {
                if (checked) {
                  const canNotify = await requestNotificationPermission();
                  if (canNotify !== NotificationStates.granted) {
                    form.setFieldsValue({ desktopNotifsEnabled: false });
                    form.setFields([
                      {
                        name: "desktopNotifsEnabled",
                        errors: [
                          canNotify === NotificationStates.notAllowed
                            ? "Please allow notifications in this browser"
                            : "Browser does not support notifications. Please use Chrome or Firefox.",
                        ],
                      },
                    ]);
                  }
                }
              }}
            />
          </Form.Item>
          <Form.Item
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
