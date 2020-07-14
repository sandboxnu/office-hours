import { Button, Col, Row, Result } from "antd";
import useSWR, { mutate } from "swr";
import Schedule from "./schedule";
import { API } from "@template/api-client";
import styled from "styled-components";
import NavBar from "../../../components/Nav/NavBar";
import OpenQueueCard from "../../../components/Today/OpenQueueCard";
import { useProfile } from "../../../hooks/useProfile";
import { useRouter } from "next/router";

const CreateQueueButton = styled(Button)`
  float: right;
  background-color: #4cbb17;
  color: white;
`;

export default function Today() {
  const profile = useProfile();
  const router = useRouter();
  const { cid } = router.query;

  const { data, error } = useSWR(
    `api/v1/courses/${cid}`,
    async () => cid && API.course.get(Number(cid))
  );

  const updateQueueNotes = async (queueId, notes) => {
    const newQueues =
      data && data.queues.map((q) => (q.id === queueId ? { ...q, notes } : q));
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
        <Row gutter={25}>
          <Col md={12} xs={24}>
            {data?.queues?.map((q) => (
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
      </div>
    );
  } else {
    return null;
  }
}
