import { API } from "@template/api-client";
import {
  ClosedQuestionStatus,
  OpenQuestionStatus,
  Question,
  QuestionStatusKeys,
  QuestionType,
} from "@template/common";
import { Alert, Button, Card, Col, Grid, Row, notification } from "antd";
import React, { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { mutate } from "swr";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useProfile } from "../../hooks/useProfile";
import { useQuestions } from "../../hooks/useQuestions";
import { useQueue } from "../../hooks/useQueue";
import EditableQuestion from "./EditableQuestion";
import QuestionForm from "./QuestionForm";
import QueueListHeader from "./QueueListSharedComponents";
import StudentQueueCard from "./StudentQueueCard";
import { NotificationSettingsModal } from "../Nav/NotificationSettingsModal";
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
  qid: number;
}

export default function StudentQueueList({
  qid,
}: StudentQueueListProps): ReactElement {
  const profile = useProfile();
  const { queue, queuesError, mutateQueue } = useQueue(qid);
  const { questions, questionsError, mutateQuestions } = useQuestions(qid);
  const [isFirstQuestion, setIsFirstQuestion] = useLocalStorage(
    "isFirstQuestion",
    true
  );
  const [notifModalOpen, setNotifModalOpen] = useState(false);

  const studentQuestion =
    profile && questions && questions.find((q) => q.creator.id === profile.id);

  const leaveQueue = useCallback(async () => {
    await API.questions.update(studentQuestion?.id, {
      status: ClosedQuestionStatus.Deleted,
    });

    setIsJoining(false);
    await mutateQuestions();
  }, [studentQuestion?.id, mutateQuestions]);

  const finishQuestion = useCallback(
    async (
      text: string,
      questionType: QuestionType,
      isOnline: boolean,
      location: string
    ) => {
      const updateStudent = {
        text,
        questionType,
        isOnline,
        location: isOnline ? "" : location,
        status: OpenQuestionStatus.Queued,
      };
      await API.questions.update(studentQuestion?.id, updateStudent);
      const newQuestions = questions?.map((q: Question) =>
        q.id === studentQuestion?.id ? { ...q, updateStudent } : q
      );
      mutateQuestions(newQuestions);
    },
    [questions, studentQuestion?.id, mutateQuestions]
  );

  /**
   * Updates the question in the database to match the question in local storage
   * @param question the question being modified
   */
  const updateQuestionDraft = async (question: Question) => {
    await API.questions.update(question?.id, {
      questionType: question.questionType,
      text: question.text,
      queueId: Number(qid),
    });

    const newQuestions = questions.map((q) =>
      q.id === question.id ? { ...q, status: QuestionStatusKeys.Drafting } : q
    );

    mutateQuestions(newQuestions);
  };

  const screens = useBreakpoint();
  const [popupEditQuestion, setPopupEditQuestion] = useState(false);

  const [isJoining, setIsJoining] = useState(
    questions &&
      studentQuestion &&
      studentQuestion?.status !== OpenQuestionStatus.Queued
  );

  const [draftQuestion, , removeValue] = useLocalStorage("draftQuestion", null);

  const [hasDraftInProgress, setHasDraftInProgress] = useState(
    !!(draftQuestion || studentQuestion?.status === OpenQuestionStatus.Drafting)
  );

  const openEditModal = useCallback(async () => {
    mutate(`/api/v1/queues/${qid}/questions`);
    setPopupEditQuestion(true);
  }, [qid]);

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
            marginTop: screens.lg === false ? 0 : "36px",
          }}
          bordered={false}
        >
          <HeaderText>your question</HeaderText>
        </StudentHeaderCard>
        <EditableQuestion
          position={questions?.indexOf(studentQuestion) + 1}
          type={studentQuestion.questionType}
          text={studentQuestion.text}
          location={
            studentQuestion.location ? studentQuestion.location : "Online"
          }
          photoUrl={studentQuestion.creator.photoURL}
          openEdit={openEditModal}
          leaveQueue={leaveQueue}
        />
      </Col>
    );
  };

  const leaveQueueAndClose = useCallback(() => {
    //delete draft when they leave the queue
    removeValue();
    setHasDraftInProgress(false);
    leaveQueue();
    closeEditModal();
  }, [removeValue, leaveQueue, closeEditModal]);

  const joinQueueOpenModal = useCallback(async () => {
    const createdQuestion = await API.questions.create({
      queueId: Number(qid),
      text: "",
      questionType: QuestionType.Bug, // TODO: endpoint needs to be changed to allow empty questionType for drafts
      // for the moment I am defaulting this data so that there is no error
    });
    const newQuestions = [...questions, createdQuestion];
    await mutateQuestions(newQuestions);
    setPopupEditQuestion(true);
  }, [mutateQuestions, qid, questions]);

  const finishQuestionAndClose = useCallback(
    (text: string, qt: QuestionType, isOnline: boolean, location: string) => {
      removeValue();
      setHasDraftInProgress(false);
      finishQuestion(text, qt, isOnline, location);
      closeEditModal();
      if (isFirstQuestion) {
        notification.warn({
          message: "Enable Notifications",
          description:
            "Turn on notifications for when it's almost your turn to get help.",
          placement: "bottomRight",
          duration: 0,
          onClick: () => {
            notification.destroy();
            setNotifModalOpen(true);
            setIsFirstQuestion(false);
          },
        });
      }
    },
    [removeValue, finishQuestion, closeEditModal]
  );

  const deleteDraft = () => {
    removeValue();
    setHasDraftInProgress(false);
  };

  const continueDraft = () => {
    updateQuestionDraft(draftQuestion);
    setPopupEditQuestion(true);
  };

  if (queue && questions) {
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
                        finish describing your question to receive help and
                        finish joining the queue.
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
              <Col>
                <QueueListHeader queue={queue} />
              </Col>
              <Col>
                {!studentQuestion && (
                  <JoinButton
                    type="primary"
                    size="large"
                    onClick={joinQueueOpenModal}
                  >
                    Join Queue
                  </JoinButton>
                )}
              </Col>
            </Row>
            {questions?.length === 0 ? (
              <h1 style={{ marginTop: "50px" }}>
                There currently aren&apos;t any questions in the queue
              </h1>
            ) : (
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
            )}
            {questions?.map((question: Question, index: number) => {
              return (
                <StudentQueueCard
                  key={question.id}
                  rank={index + 1}
                  waitTime={30} //TODO: figure out later
                  question={question}
                  highlighted={studentQuestion === question}
                />
              );
            })}
          </Col>
          {studentQuestion && renderEditableQuestion()}
          <QuestionForm
            visible={
              (questions &&
                !studentQuestion &&
                isJoining &&
                !hasDraftInProgress) ||
              // && studentQuestion.status !== QuestionStatusKeys.Drafting)
              popupEditQuestion
            }
            question={studentQuestion}
            leaveQueue={leaveQueueAndClose}
            finishQuestion={finishQuestionAndClose}
            position={questions?.indexOf(studentQuestion) + 1}
            cancel={closeEditModal}
          />
        </Row>
        <NotificationSettingsModal
          visible={notifModalOpen}
          onClose={() => setNotifModalOpen(false)}
        />
      </div>
    );
  } else {
    return <div />;
  }
}
