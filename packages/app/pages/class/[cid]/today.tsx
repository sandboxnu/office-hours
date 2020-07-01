import { API } from "@template/api-client";
import { Button, Col, Result, Row } from "antd";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import NavBar from "../../../components/Nav/NavBar";
import OpenQueueCard from "../../../components/Today/OpenQueueCard";
import { useProfile } from "../../../hooks/useProfile";
import Schedule from "./schedule";

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
            {data?.map((q) => (
              <OpenQueueCard key={q.id} queue={q} isTA={isTA} />
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
