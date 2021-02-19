import { Role } from "@koh/common";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { StandardPageContainer } from "../../../components/common/PageContainer";
import NavBar from "../../../components/Nav/NavBar";
import { Container } from "../../../components/Queue/QueueListSharedComponents";
import CourseOverrideSettings from "../../../components/Settings/CourseOverrideSettings";
import { useRoleInCourse } from "../../../hooks/useRoleInCourse";

export default function CourseOverride(): ReactElement {
  const router = useRouter();
  const courseId = router.query["cid"];
  const role = useRoleInCourse(Number(courseId));

  if (role !== Role.PROFESSOR) {
    return <DefaultErrorPage statusCode={404} />;
  }

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
