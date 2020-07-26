import { Button, Divider } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";

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

  const onSubmit = () => {};

  return (
    <Container>
      <LoginContainer>
        <Divider plain>
          <h3>For Development Use Only hey guys</h3>
        </Divider>
        <Link href="/api/v1/profile/entry?userId=1">
          <Button
            style={{ marginRight: "15px" }}
            type="default"
            htmlType="submit"
            onClick={onSubmit}
          >
            Login as <b>Student 1</b>
          </Button>
        </Link>
        <Link href="/api/v1/profile/entry?userId=3">
          <Button
            style={{ marginRight: "15px" }}
            type="default"
            htmlType="submit"
            onClick={onSubmit}
          >
            Login as <b>Student 2</b>
          </Button>
        </Link>
        <Link href="/api/v1/profile/entry?userId=2">
          <Button type="default" htmlType="submit" onClick={onSubmit}>
            Login as <b>TA</b>
          </Button>
        </Link>
        <Link href="/api/v1/profile/entry?userId=5">
          <Button type="default" htmlType="submit" onClick={onSubmit}>
            Login as <b>TA 2</b>
          </Button>
        </Link>
      </LoginContainer>
    </Container>
  );
}
