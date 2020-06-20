import React from "react";
import { Question, Role } from "@template/common";
import styled from "styled-components";
import { Row, Col, Card, Button, Grid } from "antd";
import QueueCard from "./QueueCard";
const { useBreakpoint } = Grid;

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

const StudentHeaderCard = styled(Card)`
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

interface StudentQueueListProps {
  joinQueue: () => void;
  studentQuestion: Question;
  onOpenClick: (question: Question) => void;
  questions: Question[];
  helpingQuestions: Question[];
}

export default function StudentQueueList({
  onOpenClick,
  joinQueue,
  studentQuestion,
  questions,
  helpingQuestions,
}: StudentQueueListProps) {
  const helping = helpingQuestions.length !== 0;
  const screens = useBreakpoint();

  return (
    <div>
      <Row gutter={[64, 64]}>
        <Col flex="auto" order={screens.lg === false ? 2 : 1}>
          <Row justify="space-between">
            <QueueTitle>Queue 1</QueueTitle>
            <Button type="primary" size="large" onClick={joinQueue}>
              Join Queue
            </Button>
          </Row>
          <StudentHeaderCard bordered={false}>
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
          </StudentHeaderCard>
          {questions.map((question: Question, index: number) => {
            return (
              <QueueCard
                key={question.id}
                helping={helping}
                role={Role.STUDENT}
                rank={index + 1}
                waitTime={30} //figure out later
                question={question}
                onOpen={onOpenClick}
              />
            );
          })}
        </Col>
      </Row>
    </div>
  );
}
