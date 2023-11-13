import { API } from "@koh/api-client";
import { AccountType, UpdateProfileParams } from "@koh/common";
import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { pick } from "lodash";
import React, { ReactElement } from "react";
import useSWR from "swr";

export default function ProfileSettings(): ReactElement {
  const { data: profile, mutate } = useSWR(`api/v1/profile`, async () =>
    API.profile.index()
  );
  const [form] = Form.useForm();

  const editProfile = async (updateProfile: UpdateProfileParams) => {
    let newProfile = null;

    if (profile && profile.accountType === AccountType.LEGACY) {
      newProfile = { ...profile, ...updateProfile };
      mutate(newProfile, false);
      if (profile.email === updateProfile.email) {
        await API.profile.patch(
          pick(newProfile, ["firstName", "lastName", "sid"])
        );
      } else {
        await API.profile.patch(
          pick(newProfile, ["firstName", "lastName", "email", "sid"])
        );
      }
    } else {
      newProfile = {
        ...profile,
        ...{
          firstName: updateProfile.firstName,
          lastName: updateProfile.lastName,
          sid: updateProfile.sid,
        },
      };
      await mutate(newProfile, false);

      await API.profile.patch(
        pick(newProfile, ["firstName", "lastName", "sid"])
      );
    }

    await mutate();
    return newProfile;
  };

  const handleOk = async () => {
    const value = await form.validateFields();
    const newProfile = await editProfile(value).catch(() => {
      message.error(
        "Your profile settings could not be updated. Email is already in use."
      );
    });
    if (!newProfile) return;

    form.setFieldsValue(newProfile);
    message.success("Your profile settings have been successfully updated");
  };

  return profile ? (
    <div>
      <Card title="Personal Information" className="mt-5">
        <Form
          wrapperCol={{ span: 24 }}
          form={form}
          initialValues={profile}
          layout="vertical"
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
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
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
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
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Form.Item
                label="Email"
                name="email"
                data-cy="emailInput"
                rules={[
                  {
                    required: profile.accountType === AccountType.LEGACY,
                    message: "Your email can't be empty!",
                  },
                ]}
              >
                <Input disabled={profile.accountType !== AccountType.LEGACY} />
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 12 }}>
              <Form.Item
                label="Student ID"
                name="sid"
                data-cy="studentIdInput"
                rules={[
                  {
                    required: true,
                    message: "Your student id can't be empty!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
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
      </Card>
    </div>
  ) : null;
}
