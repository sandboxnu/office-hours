import { Avatar, Button, Card, Col, PageHeader, Row, Result } from "antd";
import useSWR from "swr";
import Schedule from "./schedule";
import { Queue, QueuePartial } from "../../common/index";
import { API } from "@template/api-client";
import styled from "styled-components";

const Navbar = () => {
  return (
    <PageHeader title={"Khoury Office Hours"}>
      <h1>CS 2500</h1>
    </PageHeader>
  );
};

type QueueCardProps = {
  queue: QueuePartial;
};

const PaddedCard = styled(Card)`
  margin-bottom: 25px;
`;

const AvatarContainer = styled.div`
  padding-left: 25px;
  padding-right: 25px;
  float: left;
`;

const CreateQueueButton = styled(Button)`
  bottom: 0%;
  width: 20%;
  float: right;
  background-color: #4cbb17;
  color: white;
`;

const RightHeader = styled.h3`
  text-align: right;
`;

const QueueCard = ({ queue }: QueueCardProps) => {
  const staffList = queue.staffList;
  return (
    <PaddedCard
      title={staffList.map((staffMember) => staffMember.name).join(", ")}
      extra={
        <Button type="primary" size={"middle"}>
          Join Queue
        </Button>
      }
    >
      <Row>
        <Col md={12}>
          <h1>{queue.room}</h1>
        </Col>
        <Col md={12}>
          <RightHeader>
            Number of students in queue: {queue.queueSize}
          </RightHeader>
        </Col>
      </Row>
      {staffList.map((staffMember) => (
        <AvatarContainer key={staffMember.id}>
          <Avatar size={128} src={staffMember.photoURL} shape="square" />
        </AvatarContainer>
      ))}
    </PaddedCard>
  );
};

export default function Today() {
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

  return (
    <div>
      <Navbar />
      <Row gutter={25}>
        <Col md={12} sm={24}>
          {data?.map((q) => (
            <QueueCard key={q.id} queue={q} />
          ))}
          {isTA ? (
            <CreateQueueButton type="default" size={"large"}>
              Create Queue
            </CreateQueueButton>
          ) : null}
        </Col>
        <Col md={12} sm={24}>
          <Schedule viewType={"day"} />
        </Col>
      </Row>
    </div>
  );
}
