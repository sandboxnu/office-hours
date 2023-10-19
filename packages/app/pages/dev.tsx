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

export default function DevPanel(): ReactElement {
  if (isProd()) {
    return <DefaultErrorPage statusCode={404} />;
  }
  return (
    <Container>
      <h1>
        <PageHeader>[ For Development Use Only ]</PageHeader>
      </h1>
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
