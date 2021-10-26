import { API } from "@koh/api-client";
import { UpdateProfileParams } from "@koh/common";
import { Button, Col, Form, Input, message, Space, Switch } from "antd";
import { pick } from "lodash";
import React, { ReactElement, useEffect } from "react";
import useSWR from "swr";

export default function TeamsSettings(): ReactElement {
  const { TextArea } = Input;

  const { data: profile, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );

  const [form] = Form.useForm();
  const editProfile = async (updateProfile: UpdateProfileParams) => {
    const newProfile = { ...profile, ...updateProfile };
    mutate(newProfile, false);
    await API.profile.patch(
      pick(newProfile, ["defaultMessage", "includeDefaultMessage"])
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
    <div>
      <Space
        size={40}
        style={{ flexGrow: 1, paddingTop: 50, paddingBottom: 20 }}
      >
        <h1>Teams settings</h1>
      </Space>
      <Form wrapperCol={{ span: 18 }} form={form} initialValues={profile}>
        <Col>
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
        </Col>
      </Form>
      <Button
        key="submit"
        type="primary"
        onClick={handleOk}
        style={{ marginBottom: "15px" }}
      >
        Save
      </Button>
    </div>
  ) : null;
}
