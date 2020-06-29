import React, { useMemo, useState, useCallback } from "react";
import { Question, Role, QuestionType } from "@template/common";
import styled from "styled-components";
import { Row, Col, Card, Button, Grid, Modal } from "antd";
import QueueCard from "./QueueCard";
import EditableQuestion from "./EditableQuestion";
import QuestionForm from "./QuestionForm";
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

const HeaderRow = styled(Row)`
  margin-bottom: 64px;
`;

interface StudentQueueListProps {
  joinQueue: () => void;
  leaveQueue: () => void;
  finishQuestion: (questionType: QuestionType, questionText: string) => void;
  onOpenClick: (question: Question) => void;
  questions: Question[];
  helpingQuestions: Question[];
  studentQuestion: Question;
}

export default function StudentQueueList({
  onOpenClick,
  leaveQueue,
  finishQuestion,
  joinQueue,
  studentQuestion,
  questions,
  helpingQuestions,
}: StudentQueueListProps) {
  const helping = helpingQuestions.length !== 0;
  const screens = useBreakpoint();
  const [popupEditQuestion, setPopupEditQuestion] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const openEditModal = useCallback(() => {
    setPopupEditQuestion(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setPopupEditQuestion(false);
    setIsJoining(false);
  }, []);

  const renderEditableQuestion = () => {
    return (
      <Col xs={24} lg={10} xxl={6} order={screens.lg === false ? 1 : 2}>
        <HeaderRow></HeaderRow>
        <EditableQuestion
          position={3}
          type={studentQuestion.questionType}
          text={studentQuestion.text}
          location={"Outside room, by the couches"} // doesn't exist on question rn
          photoUrl={studentQuestion.creator.photoURL}
          openEdit={openEditModal}
        />
      </Col>
    );
  };

  const leaveQueueAndClose = useCallback(() => {
    leaveQueue();
    closeEditModal();
  }, []);

  const joinQueueOpenModal = useCallback(() => {
    joinQueue();
    openEditModal();
  }, []);

  const finishQuestionAndClose = useCallback(
    (qt: QuestionType, text: string) => {
      finishQuestion(qt, text);
      closeEditModal();
    },
    []
  );

  return (
    <div>
      <Row gutter={[64, 64]}>
        <Col flex="auto" order={screens.lg === false ? 2 : 1}>
          <Row justify="space-between">
            <QueueTitle>Queue 1</QueueTitle>
            {!studentQuestion && (
              <Button type="primary" size="large" onClick={joinQueueOpenModal}>
                Join Queue
              </Button>
            )}
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
        {studentQuestion && renderEditableQuestion()}
        <Modal
          visible={isJoining || popupEditQuestion}
          closable={true}
          onCancel={closeEditModal}
          footer={<div></div>}
        >
          <QuestionForm
            question={studentQuestion}
            leaveQueue={leaveQueueAndClose}
            finishQuestion={finishQuestionAndClose}
          />
        </Modal>
      </Row>
    </div>
  );
}
