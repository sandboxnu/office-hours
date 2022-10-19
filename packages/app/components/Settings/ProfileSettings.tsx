import { API } from "@koh/api-client";
import { UpdateProfileParams } from "@koh/common";
import { Button, Form, Input, message, Row } from "antd";
import { pick } from "lodash";
import { useIsMobile } from "../../hooks/useIsMobile";
import { HeaderTitle } from "./Styled";
import styled from "styled-components";
import React, { ReactElement } from "react";
import useSWR from "swr";

export default function ProfileSettings(): ReactElement {
  const { data: profile, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );
  console.log(profile);
  const isMobile = useIsMobile();
  const [form] = Form.useForm();

  const editProfile = async (updateProfile: UpdateProfileParams) => {
    const newProfile = { ...profile, ...updateProfile };
    mutate(newProfile, false);
    await API.profile.patch(pick(newProfile, ["firstName", "lastName", "sid"]));
    mutate();
    return newProfile;
  };

  const handleOk = async () => {
    const value = await form.validateFields();
    const newProfile = await editProfile(value);
    form.setFieldsValue(newProfile);
    message.success("Your profile settings have been successfully updated");
  };

  const ResponsiveFormRow = styled(Row)`
    flexdirection: ${isMobile ? "column" : "row"};
  `;

  return profile ? (
    <div>
      <HeaderTitle>
        <h1>Personal Information</h1>
      </HeaderTitle>
      <Form wrapperCol={{ span: 18 }} form={form} initialValues={profile}>
        <ResponsiveFormRow>
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
            style={{ marginLeft: isMobile ? "0" : "10px" }}
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
          <Form.Item
            style={{ marginLeft: isMobile ? "0" : "10px" }}
            label="Student ID"
            name="sid"
            data-cy="sidInput"
            rules={[
              {
                required: true,
                message: "Your name can't be empty!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </ResponsiveFormRow>
      </Form>
      <Button
        key="submit"
        type="primary"
        data-cy="saveButton"
        onClick={handleOk}
        style={{ marginBottom: "15px" }}
      >
        Save
      </Button>
    </div>
  ) : null;
}
