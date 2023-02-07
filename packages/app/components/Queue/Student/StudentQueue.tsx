import { API } from "@koh/api-client";
import {
  ClosedQuestionStatus,
  ERROR_MESSAGES,
  LimboQuestionStatus,
  OpenQuestionStatus,
  Question,
  QuestionType,
} from "@koh/common";
import { Card, Col, notification, Popconfirm, Row } from "antd";
import { Router, useRouter } from "next/router";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { mutate } from "swr";
import { useDraftQuestion } from "../../../hooks/useDraftQuestion";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useQuestions } from "../../../hooks/useQuestions";
import { useQueue } from "../../../hooks/useQueue";
import { useStudentQuestion } from "../../../hooks/useStudentQuestion";
import {
  QueueInfoColumn,
  QueueInfoColumnButton,
} from "../QueueListSharedComponents";
import QuestionForm from "./QuestionForm";
import StudentBanner from "./StudentBanner";
import CantFindModal from "./StudentCantFindModal";
import StudentQueueCard from "./StudentQueueCard";
import StudentRemovedFromQueueModal from "./StudentRemovedFromQueueModal";
import { useHotkeys } from "react-hotkeys-hook";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  @media (min-width: 650px) {
    margin-top: 0;
    flex-direction: row;
    height: 100%;
  }
`;

const QueueListContainer = styled.div`
  flex-grow: 1;
  @media (min-width: 650px) {
    margin-top: 32px;
  }
`;

const JoinButton = styled(QueueInfoColumnButton)`
  background-color: #3684c6;
  color: white;
`;

const VerticalDivider = styled.div`
  @media (min-width: 650px) {
    border-right: 1px solid #cfd6de;
    margin: 0 16px;
  }
  @media (min-width: 1000px) {
    margin: 0 32px;
  }
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

const PopConfirmTitle = styled.div`
  max-width: 400px;
`;

const CenterRow = styled(Row)`
  align-items: center;
`;

interface StudentQueueProps {
  qid: number;
  cid: number;
}

export default function StudentQueue({
  qid,
  cid,
}: StudentQueueProps): ReactElement {
  const { queue } = useQueue(qid);
  const { questions, mutateQuestions } = useQuestions(qid);
  const { studentQuestion, studentQuestionIndex } = useStudentQuestion(qid);
  const [isFirstQuestion, setIsFirstQuestion] = useLocalStorage(
    "isFirstQuestion",
    true
  );
  const [showJoinPopconfirm, setShowJoinPopconfirm] = useState(false);
  const { deleteDraftQuestion } = useDraftQuestion();
  const [isJoining, setIsJoining] = useState(
    questions &&
      studentQuestion &&
      studentQuestion?.status !== OpenQuestionStatus.Queued
  );
  const [popupEditQuestion, setPopupEditQuestion] = useState(false);

  const router = useRouter();
  const editQuestionQueryParam = Boolean(router.query.edit_question as string);

  useEffect(() => {
    if (editQuestionQueryParam && studentQuestion) {
      mutate(`/api/v1/queues/${qid}/questions`);
      setPopupEditQuestion(true);
      router.push(`/course/${cid}/queue/${qid}`);
    }
  }, [editQuestionQueryParam, qid, studentQuestion]);

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
    async (text: string, questionType: QuestionType, groupable: boolean, location:string) => {
      const updateStudent = {
        text,
        questionType,
        groupable,
        status:
          studentQuestionStatus === OpenQuestionStatus.Drafting
            ? OpenQuestionStatus.Queued
            : studentQuestionStatus,
        location,
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
      location: studentQuestion?.location,
      force: true,
      groupable: false,
    });
    await API.questions.update(newQuestion.id, {
      status: OpenQuestionStatus.Queued,
    });
    await mutateQuestions();
  }, [mutateQuestions, qid, studentQuestion]);

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
          groupable: false,
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
    (
      text: string,
      qt: QuestionType,
      groupable: true,
      router: Router,
      cid: number,
      location: string
    ) => {
      deleteDraftQuestion();
      finishQuestion(text, qt, groupable, location);
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
            setIsFirstQuestion(false);
            router.push(`/settings?cid=${cid}`);
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

  useHotkeys(
    "shift+e",
    () => {
      if (studentQuestion) {
        openEditModal();
      }
    },
    [studentQuestion]
  );

  useHotkeys(
    "shift+n",
    () => {
      if (!studentQuestion && queue?.allowQuestions && !queue?.isDisabled) {
        joinQueueOpenModal(false).then((res) => setShowJoinPopconfirm(!res));
      }
    },
    [studentQuestion, queue]
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
            isStaff={false}
            buttons={
              !studentQuestion && (
                <Popconfirm
                  title={
                    <PopConfirmTitle>
                      You already have a question in a queue for this course, so
                      your previous question will be deleted in order to join
                      this queue. Do you want to continue?
                    </PopConfirmTitle>
                  }
                  onConfirm={() => joinQueueOpenModal(true)}
                  okText="Yes"
                  cancelText="No"
                  disabled
                  visible={showJoinPopconfirm}
                  onVisibleChange={setShowJoinPopconfirm}
                >
                  <JoinButton
                    type="primary"
                    disabled={!queue?.allowQuestions || queue?.isDisabled}
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
              <>
                <StudentBanner
                  queueId={qid}
                  editQuestion={openEditModal}
                  leaveQueue={leaveQueue}
                />
                <div style={{ marginTop: "40px" }} />
              </>
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
