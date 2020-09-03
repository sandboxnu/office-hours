import styled from "styled-components";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useCourse } from "../../../hooks/useCourse";
import { error } from "console";
import { useProfile } from "../../../hooks/useProfile";
import FatalError from "../../../components/common/FatalError";

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

export default function Schedule(): ReactElement {
  useProfile(); // Check logged in so we can redirect to login page
  const router = useRouter();
  const { cid } = router.query;

  const {course, courseError} = useCourse(Number(cid));

  if (courseError)
    return <FatalError error={courseError}/>
  }

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
