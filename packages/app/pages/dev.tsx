import { API } from "@koh/api-client";
import { isProd } from "@koh/common";
import { Button, Divider } from "antd";
import DefaultErrorPage from "next/error";
import React, { ReactElement } from "react";
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

  padding-top: 100px;
`;

const SeedingContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  padding-top: 20px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const DevPageButton = styled(Button)`
  margin-right: 15px;
`;

export default function DevPanel(): ReactElement {
  if (isProd()) {
    return <DefaultErrorPage statusCode={404} />;
  }
  return (
    <Container>
      <h1>
        <PageHeader>[ For Development Use Only ]</PageHeader>
      </h1>
      <LoginContainer>
        <Divider plain>
          <h3>Login</h3>
        </Divider>
        <a href="/api/v1/login/dev?userId=1">
          <DevPageButton type="default" htmlType="submit">
            Login as <b> Student 1</b>
          </DevPageButton>
        </a>
        <a href="/api/v1/login/dev?userId=2">
          <DevPageButton type="default" htmlType="submit">
            Login as <b> Student 2</b>
          </DevPageButton>
        </a>
        <a href="/api/v1/login/dev?userId=3">
          <DevPageButton type="default" htmlType="submit">
            Login as <b> TA</b>
          </DevPageButton>
        </a>
        <a href="/api/v1/login/dev?userId=4">
          <DevPageButton type="default" htmlType="submit">
            Login as <b> TA 2</b>
          </DevPageButton>
        </a>
        <a href="/api/v1/login/dev?userId=5">
          <DevPageButton type="default" htmlType="submit">
            Login as <b> Professor </b>
          </DevPageButton>
        </a>
        <a href="/api/v1/login/dev?userId=6">
          <DevPageButton type="default" htmlType="submit">
            Login as <b> No Course User</b>
          </DevPageButton>
        </a>
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
