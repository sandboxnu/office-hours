import { Question, QuestionType } from "@template/common";
import { Button, Card, Col, Grid, Modal, Row } from "antd";
import React, { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import EditableQuestion from "./EditableQuestion";
import QuestionForm from "./QuestionForm";
import StudentQueueCard from "./StudentQueueCard";
const { useBreakpoint } = Grid;

const StatusText = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: #8895a6;
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
  font-weight: 500;
  line-height: 22px;
  color: #8895a6;
  font-variant: small-caps;
`;

const QueueTitle = styled.div`
  font-weight: 500;
  font-size: 30px;
  color: #212934;
`;

const CenterRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
`;

const JoinButton = styled(Button)`
  background-color: #3684c6;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  margin-left: 16px;
`;

interface StudentQueueListProps {
  room: string;
  joinQueue: () => void;
  leaveQueue: () => void;
  finishQuestion: (questionType: QuestionType, questionText: string) => void;
  questions: Question[];

  studentQuestion: Question;
}

export default function StudentQueueList({
  room,
  leaveQueue,
  finishQuestion,
  joinQueue,
  studentQuestion,
  questions,
}: StudentQueueListProps): ReactElement {
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
        <StudentHeaderCard
          bodyStyle={{ paddingLeft: 0 }}
          style={{
            paddingLeft: 0,
            marginTop: screens.lg === false ? 0 : "46px",
          }}
          bordered={false}
        >
          <HeaderText>your question</HeaderText>
        </StudentHeaderCard>
        <EditableQuestion
          position={3}
          type={studentQuestion.questionType}
          text={studentQuestion.text}
          location={"Outside room, by the couches"} // doesn't exist on question rn
          photoUrl={studentQuestion.creator.photoURL}
          openEdit={openEditModal}
          leaveQueue={leaveQueue}
        />
      </Col>
    );
  };

  const leaveQueueAndClose = useCallback(() => {
    leaveQueue();
    closeEditModal();
  }, [leaveQueue, closeEditModal]);

  const joinQueueOpenModal = useCallback(() => {
    joinQueue();
    openEditModal();
  }, [joinQueue, openEditModal]);

  const finishQuestionAndClose = useCallback(
    (qt: QuestionType, text: string) => {
      finishQuestion(qt, text);
      closeEditModal();
    },
    [finishQuestion, closeEditModal]
  );

  return (
    <div>
      <Row gutter={[64, 64]}>
        <Col flex="auto" order={screens.lg === false ? 2 : 1}>
          <Row justify="space-between">
            <QueueTitle>{room}</QueueTitle>
            {!studentQuestion && (
              <JoinButton
                type="primary"
                size="large"
                onClick={joinQueueOpenModal}
              >
                Join Queue
              </JoinButton>
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
              <StudentQueueCard
                key={question.id}
                rank={index + 1}
                waitTime={30} //TODO: figure out later
                question={question}
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
