import { API } from "@template/api-client";
import {
  ClosedQuestionStatus,
  OpenQuestionStatus,
  Question,
  QuestionType,
} from "@template/common";
import {
  Button,
  Card,
  Col,
  Modal,
  notification,
  Popconfirm,
  Row,
  Space,
} from "antd";
import React, { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { mutate } from "swr";
import { useDraftQuestion } from "../../hooks/useDraftQuestion";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useQuestions } from "../../hooks/useQuestions";
import { useQueue } from "../../hooks/useQueue";
import { useStudentQuestion } from "../../hooks/useStudentQuestion";
import { NotificationSettingsModal } from "../Nav/NotificationSettingsModal";
import QuestionForm from "./QuestionForm";
import {
  QueueInfoColumn,
  QueueInfoColumnButton,
  QueuePageContainer,
  VerticalDivider,
} from "./QueueListSharedComponents";
import StudentBanner from "./StudentBanner";
import StudentQueueCard from "./StudentQueueCard";

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

interface StudentQueueListProps {
  qid: number;
}

export default function StudentQueueList({
  qid,
}: StudentQueueListProps): ReactElement {
  const { queue, queuesError, mutateQueue } = useQueue(qid);
  const { questions, questionsError, mutateQuestions } = useQuestions(qid);
  const { studentQuestion, studentQuestionIndex } = useStudentQuestion(qid);
  const [isFirstQuestion, setIsFirstQuestion] = useLocalStorage(
    "isFirstQuestion",
    true
  );
  const [notifModalOpen, setNotifModalOpen] = useState(false);
  const [showJoinPopconfirm, setShowJoinPopconfirm] = useState(false);
  const { deleteDraftQuestion } = useDraftQuestion();

  const leaveQueue = useCallback(async () => {
    await API.questions.update(studentQuestion?.id, {
      status: ClosedQuestionStatus.Deleted,
    });

    setIsJoining(false);
    await mutateQuestions();
  }, [studentQuestion?.id, mutateQuestions]);

  const rejoinQueue = useCallback(async () => {
    await API.questions.update(studentQuestion?.id, {
      status: OpenQuestionStatus.Queued,
    });
    await mutateQuestions();
  }, [studentQuestion?.id, mutateQuestions]);

  const finishQuestion = useCallback(
    async (text: string, questionType: QuestionType) => {
      const updateStudent = {
        text,
        questionType,
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
          questionType: QuestionType.Bug, // TODO: endpoint needs to be changed to allow empty questionType for drafts
          // for the moment I am defaulting this data so that there is no error
        });
        const newQuestions = [...questions, createdQuestion];
        await mutateQuestions(newQuestions);
        setPopupEditQuestion(true);
      } catch (e) {
        if (
          e.response?.data?.message?.includes(
            "You can't create more than one question at a time"
          )
        ) {
          return false;
        }
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
        <QueuePageContainer>
          <CantFindModal
            visible={studentQuestion?.status === OpenQuestionStatus.CantFind}
            leaveQueue={leaveQueue}
            rejoinQueue={rejoinQueue}
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
          <Space direction="vertical" size={40} style={{ flexGrow: 1 }}>
            {studentQuestion && (
              <StudentBanner
                queueId={qid}
                editQuestion={openEditModal}
                leaveQueue={leaveQueue}
              />
            )}
            <QueueQuestions
              questions={questions}
              studentQuestion={studentQuestion}
            />
          </Space>
        </QueuePageContainer>

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

// I think we could share this with the TA
interface QueueProps {
  questions: Question[];
  studentQuestion: Question;
}
function QueueQuestions({ questions, studentQuestion }: QueueProps) {
  return (
    <div data-cy="queueQuestions">
      {questions?.length === 0 ? (
        <h1 style={{ marginTop: "50px" }}>
          There currently aren&apos;t any questions in the queue
        </h1>
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

type CantFindModalProps = {
  visible: boolean;
  leaveQueue: () => void;
  rejoinQueue: () => void;
};

function CantFindModal(props: CantFindModalProps): ReactElement {
  return (
    <Modal
      visible={props.visible}
      footer={[
        <Button key="leave" danger onClick={props.leaveQueue}>
          Leave Queue
        </Button>,
        <Button type="primary" key="rejoin" onClick={props.rejoinQueue}>
          Rejoin Queue
        </Button>,
      ]}
      closable={false}
      title="哎呀！！"
    >
      A TA tried to help you, but couldn&apos;t reach you. Are you still in the
      queue? If you are, make sure you have Teams open, and rejoin the queue.
    </Modal>
  );
}
