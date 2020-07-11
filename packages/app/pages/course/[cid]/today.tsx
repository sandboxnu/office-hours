import { API } from "@template/api-client";
import { Button, Col, Result, Row } from "antd";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
import NavBar from "../../../components/Nav/NavBar";
import OpenQueueCard from "../../../components/Today/OpenQueueCard";
import { useProfile } from "../../../hooks/useProfile";
import Schedule from "./schedule";

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

const CreateQueueButton = styled(Button)`
  float: right;
  background-color: #4cbb17;
  color: white;
`;

export default function Today() {
  const profile = useProfile();
  const router = useRouter();
  const { cid } = router.query;

  const { data, error } = useSWR(`api/v1/courses/${cid}/queues`, async () =>
    API.course.queues(Number(cid))
  );

  const updateQueueNotes = async (queueId, notes) => {
    const newQueues = data.map((q) => (q.id === queueId ? { ...q, notes } : q));
    mutate(`api/v1/courses/${cid}/queues`, newQueues, false);
    await API.queues.updateNotes(queueId, notes);
    mutate(`api/v1/courses/${cid}/queues`);
  };

  const isTA = true; // TODO: temp

  if (error) {
    return (
      <Result
        status="500"
        title="Something went wrong, please ask chinese man"
      />
    );
  }

  if (profile) {
    return (
      <div>
        <NavBar courseId={Number(cid)} />
        <Container>
          <Row gutter={25}>
            <Col md={12} xs={24}>
              {data?.map((q) => (
                <OpenQueueCard
                  key={q.id}
                  queue={q}
                  isTA={isTA}
                  updateQueueNotes={updateQueueNotes}
                />
              ))}
              {isTA && (
                <CreateQueueButton type="default" size={"large"}>
                  Create Queue
                </CreateQueueButton>
              )}
            </Col>
            <Col md={12} sm={24}>
              <Schedule today={true} viewType={"day"} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return null;
  }
}
