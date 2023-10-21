import { Role } from "@koh/common";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import styled from "styled-components";
import { StandardPageContainer } from "../../../../components/common/PageContainer";
import NavBar from "../../../../components/Nav/NavBar";
import StudentQueue from "../../../../components/Queue/Student/StudentQueue";
import TAQueue from "../../../../components/Queue/TA/TAQueue";
import { useQueue } from "../../../../hooks/useQueue";
import { useRoleInCourse } from "../../../../hooks/useRoleInCourse";
import { useChatbotContext } from "../../../../providers/chatbotProvider";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default function Queue(): ReactElement {
  const { setCid, setOpen } = useChatbotContext();
  const router = useRouter();
  const { cid, qid } = router.query;
  const role = useRoleInCourse(Number(cid));
  const { queue } = useQueue(Number(qid));
  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    setCid(cid);
  }, [cid]);
  return (
    <StandardPageContainer>
      <Container>
        <Head>
          <title>{queue?.room} Queue | UBC Office Hours</title>
        </Head>
        <NavBar courseId={Number(cid)} />
        {Role.STUDENT === role ? (
          <StudentQueue qid={Number(qid)} cid={Number(cid)} />
        ) : (
          <TAQueue qid={Number(qid)} courseId={Number(cid)} />
        )}
      </Container>
    </StandardPageContainer>
  );
}
