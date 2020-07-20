import React, { useState, useCallback } from "react";
import { Question, Role, QuestionType } from "@template/common";
import styled from "styled-components";
import { Row, Col, Card, Button, Grid, Modal, Alert } from "antd";
import QueueCard from "./QueueCard";
import EditableQuestion from "./EditableQuestion";
import QuestionForm from "./QuestionForm";
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

const FullWidthButton = styled(Button)`
  width: 95%;
`;

interface StudentQueueListProps {
  room: string;
  joinQueue: () => void;
  leaveQueue: () => void;
  finishQuestion: (questionType: QuestionType, questionText: string) => void;
  updateQuestion: (question: Question, questionID: number) => void;
  onOpenClick: (question: Question) => void;
  questions: Question[];
  helpingQuestions: Question[];
  studentQuestion: Question;
}

export default function StudentQueueList({
  room,
  onOpenClick,
  leaveQueue,
  finishQuestion,
  updateQuestion,
  joinQueue,
  studentQuestion,
  questions,
  helpingQuestions,
}: StudentQueueListProps): JSX.Element {
  const helping = helpingQuestions.length !== 0;
  const screens = useBreakpoint();
  const [popupEditQuestion, setPopupEditQuestion] = useState(false);
  const [isJoining, setIsJoining] = useState(true);
  const questionFromStorage = window.localStorage.getItem("draftQuestion");
  const storedQuestion: Question = JSON.parse(questionFromStorage);
  const [hasDraftInProgress, setHasDraftInProgress] = useState(
    storedQuestion ? true : false
  );

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
    //delete draft when they leave the queue
    window.localStorage.removeItem("draftQuestion");
    setHasDraftInProgress(false);
    leaveQueue();
    closeEditModal();
  }, [leaveQueue, closeEditModal]);

  const joinQueueOpenModal = useCallback(() => {
    joinQueue();
    openEditModal();
  }, [joinQueue, openEditModal]);

  const finishQuestionAndClose = useCallback(
    (qt: QuestionType, text: string) => {
      //finish draft when question is finalized
      window.localStorage.removeItem("draftQuestion");
      setHasDraftInProgress(false);
      finishQuestion(qt, text);
      closeEditModal();
    },
    [finishQuestion, closeEditModal]
  );

  const deleteDraft = () => {
    window.localStorage.removeItem("draftQuestion");
    setHasDraftInProgress(false);
  };

  const continueDraft = () => {
    updateQuestion(storedQuestion, studentQuestion.id);
    setPopupEditQuestion(true);
  };

  return (
    <div>
      <Row gutter={[64, 64]}>
        <Col flex="auto" order={screens.lg === false ? 2 : 1}>
          <Row>
            {isJoining && hasDraftInProgress && (
              // studentQuestion.status === QuestionStatusKeys.Drafting &&
              <Alert
                message="Incomplete Question"
                description={
                  <Row>
                    <Col span={14}>
                      Your spot in queue has been temporarily reserved. Please
                      finish describing your question to receive help and finish
                      joining the queue.
                    </Col>
                    <Col span={2}></Col>
                    <Col span={4}>
                      <FullWidthButton type="primary" onClick={continueDraft}>
                        Continue Drafting
                      </FullWidthButton>
                    </Col>
                    <Col span={4}>
                      <FullWidthButton type="primary" onClick={deleteDraft}>
                        Delete Draft
                      </FullWidthButton>
                    </Col>
                  </Row>
                }
                type="warning"
                showIcon
              />
            )}
          </Row>
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
          visible={
            (isJoining && !hasDraftInProgress) ||
            // && studentQuestion.status !== QuestionStatusKeys.Drafting)
            popupEditQuestion
          }
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
