import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { StandardPageContainer } from "../../../components/common/PageContainer";
import NavBar from "../../../components/Nav/NavBar";
import { Container } from "../../../components/Queue/QueueListSharedComponents";
import CourseOverrideSettings from "../../../components/Settings/CourseOverrideSettings";

export default function CourseOverride(): ReactElement {
  const router = useRouter();
  const courseId = router.query["cid"];
  const defaultPage = router.query["defaultPage"];

  return (
    <StandardPageContainer>
      <Head>
        <title>Override Settings | Khoury Office Hours</title>
      </Head>
      <NavBar courseId={Number(courseId)} />
      <Container>
        {courseId && <CourseOverrideSettings courseId={Number(courseId)} />}
      </Container>
    </StandardPageContainer>
  );
}
