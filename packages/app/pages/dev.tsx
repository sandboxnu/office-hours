import React, { ReactElement } from "react";
import { API } from "@koh/api-client";
import Link from "next/link";
import styled from "styled-components";
import { Button, Divider } from "antd";
import { GetStaticProps } from "next";
import { PROD_URL } from "@koh/common";
import DefaultErrorPage from "next/error";

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

export const getStaticProps: GetStaticProps = async () => {
  const hidePage = PROD_URL === process.env.DOMAIN;
  return { props: { hidePage } };
};

interface DevPanelProps {
  hidePage: boolean;
}

export default function DevPanel({ hidePage }: DevPanelProps): ReactElement {
  if (hidePage) {
    return <DefaultErrorPage statusCode={404} />;
  }
  return (
    <Container>
      <h1>
        <PageHeader>jaisfdo[ For Development Use Only ]</PageHeader>
      </h1>
      <LoginContainer>
        <Divider plain>
          <h3>Login</h3>
        </Divider>
        <a href="/api/v1/login/dev?userId=1">
          <Button
            style={{ marginRight: "15px" }}
            type="default"
            htmlType="submit"
          >
            Login as <b> Student 1</b>
          </Button>
        </a>
        <a href="/api/v1/login/dev?userId=2">
          <Button
            style={{ marginRight: "15px" }}
            type="default"
            htmlType="submit"
          >
            Login as <b> Student 2</b>
          </Button>
        </a>
        <a href="/api/v1/login/dev?userId=3">
          <Button
            style={{ marginRight: "15px" }}
            type="default"
            htmlType="submit"
          >
            Login as <b> TA</b>
          </Button>
        </a>
        <a href="/api/v1/login/dev?userId=4">
          <Button type="default" htmlType="submit">
            Login as <b> TA 2</b>
          </Button>
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
