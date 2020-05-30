import { QuestionType } from "@template/common";
import { Button, Row, Card, Col } from "antd";
import styled from "styled-components";
import QueueCard from "./QueueCard";
import Link from "next/link";

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
  background: inherit;
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
  color: #262626;
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
        <Link href="/queue/join">
          <Button type="primary" size="large">
            Join Queue
          </Button>
        </Link>
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
        questionType={QuestionType.Bug}
        waitTime={30}
        status="WAITING"
      />
      <QueueCard
        rank={2}
        name="Supercalifragilistic"
        questionType={QuestionType.Concept}
        waitTime={30}
        status="WAITING"
      />
      <QueueCard
        rank={1}
        name="Stanley Liu"
        questionType={QuestionType.Setup}
        waitTime={100}
        status="IN PROGRESS"
      />
      <QueueCard
        rank={1}
        name="Alex Takayama"
        questionType={QuestionType.Other}
        waitTime={30}
        status="WAITING"
      />
      <QueueCard
        rank={1}
        name="Alex Takayama"
        questionType={QuestionType.Testing}
        waitTime={30}
        status="WAITING"
      />
    </div>
  );
}
