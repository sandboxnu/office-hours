import "../index.css";
import { Button, Form, Input, message } from "antd";
import { API } from "@koh/api-client";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import React, { ReactElement, useState } from "react";
export default function ResetPassword(): ReactElement {
  const router = useRouter();
  const [display, setDisplay] = useState(false);
  const { hash } = router.query;
  API.profile.verifyResetPassword(String(hash)).then((d) => {
    setDisplay(d);
  });
  if (!display) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const onSend = async (values: any) => {
    await API.profile.updatePassword(values.password, String(hash));
    message.success("Your profile settings have been successfully updated");
    router.push("../../login");
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={null}
      onFinish={onSend}
    >
      <Form.Item
        label="New password"
        name="password"
        rules={[{ required: true, message: "Please input new password" }]}
        className="email-input"
      >
        <Input placeholder="password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Reset password
        </Button>
      </Form.Item>
    </Form>
  );
}
