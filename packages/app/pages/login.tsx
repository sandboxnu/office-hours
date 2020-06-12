import styled from "styled-components";
import { Form, Input, Button, Checkbox } from "antd";
import React, { useState } from "react";
import NavBar from "../components/Nav/NavBar";

const Container = styled.div`
  width: auto;
  height: auto;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

const LoginContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  padding-top: 300px;
`;

const InputBoxContainer = styled.div`
  margin: auto;
  width: 500px;
  height: 64px;
  left: 570px;
  top: 261px;
`;

interface LoginProps {}

export default function Login({}: LoginProps) {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    if (!username || !password) {
      alert("Must input username and password!");
    }
  };

  return (
    <Container>
      <LoginContainer>
        <div>{username}</div>
        <Form name="basic" initialValues={{ remember: true }}>
          <InputBoxContainer>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input onChange={onChangeUsername} />
            </Form.Item>
          </InputBoxContainer>

          <InputBoxContainer>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password onChange={onChangePassword} />
            </Form.Item>
          </InputBoxContainer>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={onSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </LoginContainer>
    </Container>
  );
}
