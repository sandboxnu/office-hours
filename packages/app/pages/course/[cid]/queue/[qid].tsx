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

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default function Queue(): ReactElement {
  const router = useRouter();
  const { cid, qid } = router.query;
  const role = useRoleInCourse(Number(cid));
  const { queue } = useQueue(Number(qid));

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.innerHTML = `
      import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";
      Chatbot.init({
          chatflowid: "a4ca60fe-cba1-4b37-8099-b540b18026f1",
          apiHost: "http://localhost:3000",
          /* ... other settings */
      });
    `;
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, [role]);

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
