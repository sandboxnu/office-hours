import { API } from "@template/api-client";
import { QueuePartial, Role } from "@template/common";
import { Col, Row } from "antd";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
import FatalError from "../../../components/common/FatalError";
import NavBar from "../../../components/Nav/NavBar";
import OpenQueueCard, {
  OpenQueueCardSkeleton,
} from "../../../components/Today/OpenQueueCard";
import TACheckinButton from "../../../components/Today/TACheckinButton";
import WelcomeStudents from "../../../components/Today/WelcomeStudents";
import { useRoleInCourse } from "../../../hooks/useRoleInCourse";
import Schedule from "./schedule";

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 30px;
  color: #212934;
`;

export default function Today(): ReactElement {
  const router = useRouter();
  const { cid } = router.query;
  const role = useRoleInCourse(Number(cid));

  const { data, error } = useSWR(cid && `api/v1/courses/${cid}`, async () =>
    API.course.get(Number(cid))
  );

  const updateQueueNotes = async (
    queue: QueuePartial,
    notes: string
  ): Promise<void> => {
    const newQueues =
      data && data.queues.map((q) => (q.id === queue.id ? { ...q, notes } : q));

    mutate(`api/v1/courses/${cid}`, { ...data, queues: newQueues }, false);
    await API.queues.update(queue.id, {
      notes,
      allowQuestions: queue.allowQuestions,
    });
    mutate(`api/v1/courses/${cid}`);
  };

  if (error) {
    return <FatalError/>
  }
  return (
    <div>
      <WelcomeStudents />
      <NavBar courseId={Number(cid)} />
      <Container>
        <Row gutter={64}>
          <Col md={12} xs={24}>
            <Row justify="space-between">
              <Title>Current Office Hours</Title>
              {role === Role.TA && <TACheckinButton courseId={Number(cid)} />}
            </Row>
            {data?.queues?.map((q) => (
              <OpenQueueCard
                key={q.id}
                queue={q}
                isTA={role === Role.TA}
                updateQueueNotes={updateQueueNotes}
              />
            ))}
            {!data && <OpenQueueCardSkeleton />}
          </Col>
          <Col md={12} sm={24}>
            <Schedule today={true} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
