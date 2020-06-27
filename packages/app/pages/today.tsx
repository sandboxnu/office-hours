import { Button, Col, PageHeader, Row, Result } from "antd";
import useSWR from "swr";
import Schedule from "./schedule";
import { API } from "@template/api-client";
import styled from "styled-components";
import OpenQueueCard from "../components/Today/OpenQueueCard";
import { useProfile } from "../hooks/useProfile";

const Navbar = () => {
  return (
    <PageHeader title={"Khoury Office Hours"}>
      <h1>CS 2500</h1>
    </PageHeader>
  );
};

const CreateQueueButton = styled(Button)`
  float: right;
  background-color: #4cbb17;
  color: white;
`;

export default function Today() {
  const profile = useProfile();
  const { data, error } = useSWR(`api/v1/courses/1/queue`, async () =>
    API.course.queues(1)
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
        <Navbar />
        <Row gutter={25}>
          <Col md={12} xs={24}>
            {data?.map((q) => (
              <OpenQueueCard key={q.id} queue={q} />
            ))}
            {isTA && (
              <CreateQueueButton type="default" size={"large"}>
                Create Queue
              </CreateQueueButton>
            )}
          </Col>
          <Col md={12} sm={24}>
            <Schedule viewType={"day"} />
          </Col>
        </Row>
      </div>
    );
  } else {
    return null;
  }
}
