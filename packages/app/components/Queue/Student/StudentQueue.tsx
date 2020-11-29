import { API } from "@koh/api-client";
import {
  ClosedQuestionStatus,
  ERROR_MESSAGES,
  LimboQuestionStatus,
  OpenQuestionStatus,
  Question,
  QuestionType,
} from "@koh/common";
import { Card, Col, notification, Popconfirm, Row, Space } from "antd";
import React, { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { mutate } from "swr";
import { useDraftQuestion } from "../../../hooks/useDraftQuestion";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useQuestions } from "../../../hooks/useQuestions";
import { useQueue } from "../../../hooks/useQueue";
import { useStudentQuestion } from "../../../hooks/useStudentQuestion";
import { NotificationSettingsModal } from "../../Nav/NotificationSettingsModal";
import {
  QueueInfoColumn,
  QueueInfoColumnButton,
  VerticalDivider,
} from "../QueueListSharedComponents";
import QuestionForm from "./QuestionForm";
import StudentBanner from "./StudentBanner";
import CantFindModal from "./StudentCantFindModal";
import StudentQueueCard from "./StudentQueueCard";
import StudentRemovedFromQueueModal from "./StudentRemovedFromQueueModal";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  @media (min-width: 768px) {
    margin-top: 0;
    flex-direction: row;
    height: 100%;
  }
`;

const QueueListContainer = styled.div`
  flex-grow: 1;
  @media (min-width: 767px) {
    margin: 32px 0 0 32px;
  }
`;

const JoinButton = styled(QueueInfoColumnButton)`
  background-color: #3684c6;
  color: white;
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
`;

interface StudentQueueProps {
  qid: number;
}

export default function StudentQueue({ qid }: StudentQueueProps): ReactElement {
  const { queue, mutateQueue } = useQueue(qid);
  const { questions, questionsError, mutateQuestions } = useQuestions(qid);
  const { studentQuestion, studentQuestionIndex } = useStudentQuestion(qid);
  const [isFirstQuestion, setIsFirstQuestion] = useLocalStorage(
    "isFirstQuestion",
    true
  );
  const [notifModalOpen, setNotifModalOpen] = useState(false);
  const [showJoinPopconfirm, setShowJoinPopconfirm] = useState(false);
  const { deleteDraftQuestion } = useDraftQuestion();

  const studentQuestionId = studentQuestion?.id;
  const studentQuestionStatus = studentQuestion?.status;
  const leaveQueue = useCallback(async () => {
    await API.questions.update(studentQuestionId, {
      status: ClosedQuestionStatus.ConfirmedDeleted,
    });

    setIsJoining(false);
    await mutateQuestions();
  }, [mutateQuestions, studentQuestionId]);

  const rejoinQueue = useCallback(async () => {
    await API.questions.update(studentQuestionId, {
      status: OpenQuestionStatus.PriorityQueued,
    });
    await mutateQuestions();
  }, [mutateQuestions, studentQuestionId]);

  const finishQuestion = useCallback(
    async (text: string, questionType: QuestionType) => {
      const updateStudent = {
        text,
        questionType,
        status:
          studentQuestionStatus === OpenQuestionStatus.PriorityQueued
            ? OpenQuestionStatus.PriorityQueued
            : OpenQuestionStatus.Queued,
      };

      const updatedQuestionFromStudent = await API.questions.update(
        studentQuestionId,
        updateStudent
      );

      const newQuestionsInQueue = questions?.queue?.map((question: Question) =>
        question.id === studentQuestionId
          ? updatedQuestionFromStudent
          : question
      );

      // questions are the old questions and newQuestionsInQueue are questions that've been added since.
      mutateQuestions({
        ...questions,
        yourQuestion: updatedQuestionFromStudent,
        queue: newQuestionsInQueue,
      });
    },
    [studentQuestionStatus, studentQuestionId, questions, mutateQuestions]
  );

  const joinQueueAfterDeletion = useCallback(async () => {
    await API.questions.update(studentQuestion?.id, {
      status: ClosedQuestionStatus.ConfirmedDeleted,
    });
    await mutateQuestions();
    const newQuestion = await API.questions.create({
      text: studentQuestion.text,
      questionType: studentQuestion?.questionType,
      queueId: qid,
      isOnline: studentQuestion?.isOnline,
      location: studentQuestion?.location,
      force: true,
    });
    await API.questions.update(newQuestion.id, {
      status: OpenQuestionStatus.Queued,
    });
    await mutateQuestions();
  }, [mutateQuestions, qid, studentQuestion]);

  const [popupEditQuestion, setPopupEditQuestion] = useState(false);

  const [isJoining, setIsJoining] = useState(
    questions &&
      studentQuestion &&
      studentQuestion?.status !== OpenQuestionStatus.Queued
  );

  const openEditModal = useCallback(async () => {
    mutate(`/api/v1/queues/${qid}/questions`);
    setPopupEditQuestion(true);
  }, [qid]);

  const closeEditModal = useCallback(() => {
    setPopupEditQuestion(false);
    setIsJoining(false);
  }, []);

  const leaveQueueAndClose = useCallback(() => {
    //delete draft when they leave the queue
    deleteDraftQuestion();
    leaveQueue();
    closeEditModal();
  }, [deleteDraftQuestion, leaveQueue, closeEditModal]);

  const joinQueueOpenModal = useCallback(
    async (force: boolean) => {
      try {
        const createdQuestion = await API.questions.create({
          queueId: Number(qid),
          text: "",
          force: force,
          questionType: null,
        });
        const newQuestionsInQueue = [...questions?.queue, createdQuestion];
        await mutateQuestions({ ...questions, queue: newQuestionsInQueue });
        setPopupEditQuestion(true);
        return true;
      } catch (e) {
        if (
          e.response?.data?.message?.includes(
            ERROR_MESSAGES.questionController.createQuestion.oneQuestionAtATime
          )
        ) {
          return false;
        }
        return true;
        // TODO: how should we handle error that happens for another reason?
      }
    },
    [mutateQuestions, qid, questions]
  );

  const finishQuestionAndClose = useCallback(
    (text: string, qt: QuestionType) => {
      deleteDraftQuestion();
      finishQuestion(text, qt);
      closeEditModal();
      if (isFirstQuestion) {
        notification.warn({
          style: { cursor: "pointer" },
          message: "Enable Notifications",
          className: "hide-in-percy",
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
    [
      deleteDraftQuestion,
      finishQuestion,
      closeEditModal,
      isFirstQuestion,
      setIsFirstQuestion,
    ]
  );

  if (queue && questions) {
    if (!queue.isOpen) {
      return <h1 style={{ marginTop: "50px" }}>The Queue is Closed!</h1>;
    }
    return (
      <>
        <Container>
          <CantFindModal
            visible={studentQuestion?.status === LimboQuestionStatus.CantFind}
            leaveQueue={leaveQueue}
            rejoinQueue={rejoinQueue}
          />
          <StudentRemovedFromQueueModal
            question={studentQuestion}
            leaveQueue={leaveQueue}
            joinQueue={joinQueueAfterDeletion}
          />
          <QueueInfoColumn
            queueId={qid}
            buttons={
              !studentQuestion && (
                <Popconfirm
                  title="In order to join this queue, you must delete your previous question. Do you want to continue?"
                  onConfirm={() => joinQueueOpenModal(true)}
                  okText="Yes"
                  cancelText="No"
                  disabled
                  visible={showJoinPopconfirm}
                  onVisibleChange={setShowJoinPopconfirm}
                >
                  <JoinButton
                    type="primary"
                    disabled={!queue?.allowQuestions}
                    data-cy="join-queue-button"
                    onClick={async () =>
                      setShowJoinPopconfirm(!(await joinQueueOpenModal(false)))
                    }
                  >
                    Join Queue
                  </JoinButton>
                </Popconfirm>
              )
            }
          />
          <VerticalDivider />
          <QueueListContainer>
            {studentQuestion && (
              <StudentBanner
                queueId={qid}
                editQuestion={openEditModal}
                leaveQueue={leaveQueue}
              />
            )}
            <QueueQuestions
              questions={questions?.queue}
              studentQuestion={studentQuestion}
            />
          </QueueListContainer>
        </Container>

        <QuestionForm
          visible={
            (questions && !studentQuestion && isJoining) ||
            // && studentQuestion.status !== QuestionStatusKeys.Drafting)
            popupEditQuestion
          }
          question={studentQuestion}
          leaveQueue={leaveQueueAndClose}
          finishQuestion={finishQuestionAndClose}
          position={studentQuestionIndex + 1}
          cancel={closeEditModal}
        />
        <NotificationSettingsModal
          visible={notifModalOpen}
          onClose={() => setNotifModalOpen(false)}
        />
      </>
    );
  } else {
    return <div />;
  }
}

const QueueHeader = styled.h2`
  font-weight: 500;
  font-size: 24px;
  color: #212934;
  margin-bottom: 0;
`;

const NoQuestionsText = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #212934;
`;

// I think we could share this with the TA
interface QueueProps {
  questions: Question[];
  studentQuestion: Question;
}
function QueueQuestions({ questions, studentQuestion }: QueueProps) {
  return (
    <div data-cy="queueQuestions">
      {questions?.length === 0 ? (
        <NoQuestionsText>There are no questions in the queue</NoQuestionsText>
      ) : (
        <>
          <QueueHeader>Queue</QueueHeader>
          <StudentHeaderCard bordered={false}>
            <CenterRow>
              <Col flex="0 0 64px">
                <HeaderText>#</HeaderText>
              </Col>
              <Col flex="1 1">
                <HeaderText>question</HeaderText>
              </Col>
              <Col flex="0 0 80px">
                <HeaderText>wait</HeaderText>
              </Col>
            </CenterRow>
          </StudentHeaderCard>
        </>
      )}
      {questions?.map((question: Question, index: number) => {
        return (
          <StudentQueueCard
            key={question.id}
            rank={index + 1}
            question={question}
            highlighted={studentQuestion === question}
          />
        );
      })}
    </div>
  );
}
