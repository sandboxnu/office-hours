import React, { useState } from "react";
import { API } from "@template/api-client";
import Link from "next/link";
import styled from "styled-components";
import { Button, Divider } from "antd";

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

  padding-top: 100px;
`;

const SeedingContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  padding-top: 20px;
`;

const InputBoxContainer = styled.div`
  margin: auto;
  width: 500px;
  height: 64px;
  left: 570px;
  top: 261px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export default function Login() {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <h1>
        <PageHeader>[ For Development Use Only ]</PageHeader>
      </h1>
      <LoginContainer>
        <Divider plain>
          <h3>Login as</h3>
        </Divider>
        <Link href="/api/v1/login/dev?userId=1">
          <Button
            style={{ marginRight: "15px" }}
            type="default"
            htmlType="submit"
          >
            <b>Student 1</b>
          </Button>
        </Link>
        <Link href="/api/v1/login/dev?userId=3">
          <Button
            style={{ marginRight: "15px" }}
            type="default"
            htmlType="submit"
          >
            <b>Student 2</b>
          </Button>
        </Link>
        <Link href="/api/v1/login/dev?userId=2">
          <Button
            style={{ marginRight: "15px" }}
            type="default"
            htmlType="submit"
          >
            <b>TA 1</b>
          </Button>
        </Link>
        <Link href="/api/v1/login/dev?userId=5">
          <Button
            style={{ marginRight: "15px" }}
            type="default"
            htmlType="submit"
          >
            <b>TA 2</b>
          </Button>
        </Link>
      </LoginContainer>
      <SeedingContainer>
        <Divider plain>
          <h3>Seed</h3>
        </Divider>
        <Button
          style={{ marginRight: "15px" }}
          type="default"
          onClick={() => API.seeds.delete()}
        >
          Delete Data
        </Button>
        <Button
          style={{ marginRight: "15px" }}
          type="default"
          onClick={() => API.seeds.create()}
        >
          Seed Data
        </Button>
        <Button
          style={{ marginRight: "15px" }}
          type="default"
          onClick={() => API.seeds.fillQueue()}
        >
          Add Questions to Queue
        </Button>
      </SeedingContainer>
    </Container>
  );
}
