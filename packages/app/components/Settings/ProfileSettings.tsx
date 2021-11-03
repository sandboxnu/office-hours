import { API } from "@koh/api-client";
import { UpdateProfileParams } from "@koh/common";
import { Button, Form, Input, message, Row, Space } from "antd";
import { pick } from "lodash";
import styled from "styled-components";
import React, { ReactElement, useEffect, useState } from "react";
import useSWR from "swr";

export default function ProfileSettings(): ReactElement {
  const [isMobile, setMobile] = useState(false);
  const { data: profile, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );
  const [form] = Form.useForm();

  const HeaderTitle = styled(Space)`
    display: none;

    @media (min-width: 768px) {
      display: block;
      flex-grow: 1;
      padding-top: 50px;
      padding-bottom: 20px;
    }
  `;

  const editProfile = async (updateProfile: UpdateProfileParams) => {
    const newProfile = { ...profile, ...updateProfile };
    mutate(newProfile, false);
    await API.profile.patch(pick(newProfile, ["firstName", "lastName"]));
    mutate();
    return newProfile;
  };

  const handleOk = async () => {
    const value = await form.validateFields();
    const newProfile = await editProfile(value);
    form.setFieldsValue(newProfile);
    message.success("Your profile settings have been successfully updated");
  };

  useEffect(() => {
    setMobile(window.innerWidth < 768);
  });

  return profile ? (
    <div>
      <HeaderTitle>
        <h1>Personal Information</h1>
      </HeaderTitle>
      <Form wrapperCol={{ span: 18 }} form={form} initialValues={profile}>
        {isMobile ? (
          <>
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
          </>
        ) : (
          <Row>
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
              style={{
                marginLeft: 10,
              }}
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
          </Row>
        )}
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
