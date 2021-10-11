import React, { ReactElement } from "react";
import styled from "styled-components";
import { Button } from "antd";
import Router from "next/router";

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  text-align: center;
`;

export default function OAuthErrorPage(): ReactElement {
  return (
    <Container>
      <ContentContainer>
        <h3> An error occurred while trying to login. Please try again. </h3>
        <Button
          onClick={() => {
            Router.push("/login");
          }}
        >
          Back Home
        </Button>
      </ContentContainer>
    </Container>
  );
}
