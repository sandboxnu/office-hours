import { Role } from "@template/common";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import styled from "styled-components";
import NavBar from "../../../../components/Nav/NavBar";
import StudentQueueList from "../../../../components/Queue/StudentQueueList";
import TAQueueList from "../../../../components/Queue/TAQueueList";
import { useRoleInCourse } from "../../../../hooks/useRoleInCourse";

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

export default function Queue(): ReactElement {
  const router = useRouter();
  const { cid, qid } = router.query;
  const role = useRoleInCourse(Number(cid));

  return (
    <div>
      <NavBar courseId={Number(cid)} />
      <Container>
        <>
          {Role.STUDENT === role ? (
            <StudentQueueList qid={Number(qid)} />
          ) : (
            <TAQueueList qid={Number(qid)} courseId={Number(cid)} />
          )}
        </>
      </Container>
    </div>
  );
}
