import { Button, Row, Card, Col } from "antd";
import styled from "styled-components";
import QueueCard from "./QueueCard";

const StatusText = styled.div`
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: #bfbfbf;
  font-variant: small-caps;
  width: 96px;
  float: right;
  margin-right: 0;
`;

const HeaderCard = styled(Card)`
  height: 64px;
  padding-left: 8px;
  padding-right: 8px;
`;

const HeaderText = styled.div`
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: #bfbfbf;
  font-variant: small-caps;
`;

const QueueTitle = styled.h1`
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
`;

const CenterRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
`;

interface QueueListProps {}

export default function QueueList({}: QueueListProps) {
  return (
    <div>
      <Row justify="space-between">
        <QueueTitle>Queue 1</QueueTitle>
        <Button type="primary" size="large">
          Join Queue
        </Button>
      </Row>

      <HeaderCard bordered={false}>
        <CenterRow justify="space-between">
          <Col span={1}>
            <HeaderText>#</HeaderText>
          </Col>
          <Col xs={16} sm={11} lg={6}>
            <HeaderText>name</HeaderText>
          </Col>
          <Col xs={0} lg={2}>
            <HeaderText>type</HeaderText>
          </Col>
          <Col span={2}>
            <HeaderText>wait</HeaderText>
          </Col>
          <Col xs={0} lg={2}>
            <StatusText>status</StatusText>
          </Col>
        </CenterRow>
      </HeaderCard>

      <QueueCard
        rank={99}
        name="Alex Takayama"
        questionType="Bug"
        waitTime={30}
        status="WAITING"
      />
      <QueueCard
        rank={2}
        name="Supercalifragilistic"
        questionType="Question"
        waitTime={30}
        status="WAITING"
      />
      <QueueCard
        rank={1}
        name="Stanley Liu"
        questionType="urmom"
        waitTime={100}
        status="IN PROGRESS"
      />
      <QueueCard
        rank={1}
        name="Alex Takayama"
        questionType="Bug"
        waitTime={30}
        status="WAITING"
      />
      <QueueCard
        rank={1}
        name="Alex Takayama"
        questionType="Bug"
        waitTime={30}
        status="WAITING"
      />
    </div>
  );
}
