import styled from "styled-components";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useCourse } from "../../../hooks/useCourse";
import { useProfile } from "../../../hooks/useProfile";
import Head from "next/head";
import NavBar from "../../../components/Nav/NavBar";
import SchedulePanel from "../../../components/Schedule/SchedulePanel";
import { StandardPageContainer } from "../../../components/common/PageContainer";
import { useIsMobile } from "../../../hooks/useIsMobile";

const ScheduleContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 20px;
`;

export default function Schedule(): ReactElement {
  useProfile(); // Check logged in so we can redirect to login page
  const router = useRouter();
  const isMobile = useIsMobile();
  const { cid } = router.query;

  const { course } = useCourse(Number(cid));

  return (
    <StandardPageContainer>
      <Head>
        <title>{course?.name} Schedule | Khoury Office Hours</title>
      </Head>
      <NavBar courseId={Number(cid)} />
      <ScheduleContainer>
        <SchedulePanel
          courseId={Number(cid)}
          defaultView={isMobile ? "timeGridDay" : undefined}
        />
      </ScheduleContainer>
    </StandardPageContainer>
  );
}
