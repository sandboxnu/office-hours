import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { StandardPageContainer } from "../../../components/common/PageContainer";
import NavBar from "../../../components/Nav/NavBar";
import AsyncShared from "../../../components/AsyncQuestion/AsyncShared";
import { Spin } from "antd";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
export default function Queue(): ReactElement {
  const router = useRouter();
  const { cid } = router.query;

  if (!cid) {
    return <Spin tip="Loading..." size="large" />;
  } else {
    return (
      <StandardPageContainer>
        <Container>
          <Head>
            <title> UBC Office Hours</title>
          </Head>
          <NavBar courseId={Number(cid)} />
          <AsyncShared courseId={Number(cid)} />
        </Container>
      </StandardPageContainer>
    );
  }
}
