import Head from "next/head";
import { Result } from "antd";
import styled from "styled-components";
import { useRouter } from "next/router";
import NavBar from "../../../components/Nav/NavBar";
import { ReactElement } from "react";
import SchedulePanel from "../../../components/Schedule/SchedulePanel";
import { useCourse } from "../../../hooks/useCourse";

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

export default function Schedule(): ReactElement {
  const router = useRouter();
  const { cid } = router.query;

  const {course, courseError} = useCourse(Number(cid));

  if (courseError)
    return (
      <Result
        status="500"
        title="Something went wrong, please ask chinese man"
      />
    );

  return (
    <div>
      <Head>
        <title>{course?.name} Schedule | Khoury Office Hours</title>
      </Head>
      <NavBar courseId={Number(cid)} />
      <Container>
        <SchedulePanel courseId={Number(cid)} />
      </Container>
    </div>
  );
}
