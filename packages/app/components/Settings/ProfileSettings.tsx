import { API } from "@koh/api-client";
import { Role, UpdateProfileParams } from "@koh/common";
import { Button, Form, Input, message, Switch } from "antd";
import { pick } from "lodash";
import React, { ReactElement } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";

export default function ProfileSettings(): ReactElement {
  const router = useRouter();
  const { cid } = router.query;
  const role = useRoleInCourse(Number(cid));
  const { TextArea } = Input;

  const { data: profile, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );

  const [form] = Form.useForm();
  const editProfile = async (updateProfile: UpdateProfileParams) => {
    const newProfile = { ...profile, ...updateProfile };
    mutate(newProfile, false);
    await API.profile.patch(
      pick(newProfile, [
        "firstName",
        "lastName",
        "defaultMessage",
        "includeDefaultMessage",
      ])
    );
    mutate();
    return newProfile;
  };

  const handleOk = async () => {
    const value = await form.validateFields();
    const newProfile = await editProfile(value);
    form.setFieldsValue(newProfile);
    message.success("Your profile settings have been successfully updated");
  };

  return profile ? (
    <div style={{ paddingTop: "50px" }}>
      <Form form={form} initialValues={profile}>
        <Form.Item
          label="First Name"
          name="firstName"
          data-cy="firstNameInput"
          rules={[
            {
              required: true,
              message: "Your name can't be empty!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          data-cy="lastNameInput"
          rules={[
            {
              required: true,
              message: "Your name can't be empty!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {(role === Role.TA || role === Role.PROFESSOR) && (
          <div>
            <Form.Item
              label="Open Teams Chat with Default Message"
              name="includeDefaultMessage"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item shouldUpdate noStyle style={{ marginTop: "30px" }}>
              {() =>
                form?.getFieldValue("includeDefaultMessage") && (
                  <Form.Item
                    label="Default Teams Message"
                    name="defaultMessage"
                    data-cy="defaultMessageInput"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please input your default message for Teams chat!",
                      },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      placeholder={
                        profile?.defaultMessage
                          ? profile?.defaultMessage
                          : "Enter Your Message Here"
                      }
                    />
                  </Form.Item>
                )
              }
            </Form.Item>
          </div>
        )}
      </Form>
      <Button key="submit" type="primary" onClick={handleOk}>
        Ok
      </Button>
    </div>
  ) : null;
}
