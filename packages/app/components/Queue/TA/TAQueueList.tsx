import { API } from "@koh/api-client";
import {
  OpenQuestionStatus,
  Question,
  QuestionStatus,
  QuestionStatusKeys,
} from "@koh/common";
import { Card, Col, Row, Space, Tooltip } from "antd";
import { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../../hooks/useProfile";
import { useQuestions } from "../../../hooks/useQuestions";
import { useQueue } from "../../../hooks/useQueue";
import { EditQueueModal } from "./EditQueueModal";
import {
  QueueInfoColumn,
  QueueInfoColumnButton,
  QueuePageContainer,
  VerticalDivider,
} from "../QueueListSharedComponents";
import StudentPopupCard from "./StudentPopupCard";
import TABanner from "./TABanner";
import TAQueueCard from "./TAQueueCard";

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

const TAHeaderCard = styled(Card)`
  height: 64px;
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

const Placeholder = styled.div`
  width: 14px;
`;

const CheckOutButton = styled(QueueInfoColumnButton)`
  color: #da3236;
`;

const CheckInButton = styled(QueueInfoColumnButton)`
  color: white;
  background: #2a9187;
`;

const HelpNextButton = styled(QueueInfoColumnButton)`
  color: white;
  background: #2a9187;
  &:hover,
  &:focus {
    color: white;
    background: #39aca1;
  }
`;

const EditQueueButton = styled(QueueInfoColumnButton)`
  color: #212934;
`;

interface TAQueueListProps {
  qid: number;
  courseId: number;
}

export default function TAQueueList({
  qid,
  courseId,
}: TAQueueListProps): ReactElement {
  const user = useProfile();

  const { queue, queuesError, mutateQueue } = useQueue(qid);

  const { questions, questionsError, mutateQuestions } = useQuestions(qid);

  const renderedQuestions = questions?.filter(
    (question) =>
      question.status !== OpenQuestionStatus.TADeleted &&
      question.status !== OpenQuestionStatus.Helping
  );

  const helpingQuestion: Question = questions?.find(
    (question) =>
      question.status === OpenQuestionStatus.Helping &&
      question.taHelped?.id === user.id
  );
  const isHelping = !!helpingQuestion;

  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [queueSettingsModal, setQueueSettingsModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(null);

  const onOpenCard = useCallback((question: Question): void => {
    setCurrentQuestion(question);
    setOpenPopup(true);
  }, []);

  const onCloseClick = useCallback((): void => {
    setCurrentQuestion(null);
    setOpenPopup(false);
  }, []);

  const updateQuestionTA = async (
    question: Question,
    status: QuestionStatus
  ) => {
    await API.questions.update(question.id, {
      status: status,
    });
    const newQuestions = questions?.map((q) =>
      q.id === question.id ? { ...q, status } : q
    );
    mutateQuestions(newQuestions);
    setOpenPopup(false);
  };

  const isStaffCheckedIn = queue?.staffList.some((e) => e.id === user?.id);

  const helpNext = async () => {
    const nextQuestion = questions.find(
      (question) => question.status === QuestionStatusKeys.Queued
    );

    updateQuestionTA(nextQuestion, OpenQuestionStatus.Helping);
  };

  if (queue && questions) {
    return (
      <>
        <QueuePageContainer>
          <QueueInfoColumn
            queueId={qid}
            buttons={
              <>
                <EditQueueButton
                  data-cy="editQueue"
                  onClick={() => setQueueSettingsModal(true)}
                >
                  Edit Queue Details
                </EditQueueButton>
                <Tooltip
                  title={
                    !isStaffCheckedIn && "You must check in to help students!"
                  }
                >
                  <HelpNextButton
                    onClick={helpNext}
                    disabled={
                      !isStaffCheckedIn ||
                      !questions.find(
                        (q) => q.status === QuestionStatusKeys.Queued
                      ) ||
                      isHelping
                    }
                    data-cy="help-next"
                  >
                    Help Next
                  </HelpNextButton>
                </Tooltip>
                {isStaffCheckedIn ? (
                  <CheckOutButton
                    danger
                    data-cy="check-out-button"
                    onClick={async () => {
                      await API.taStatus.checkOut(courseId, queue?.room);
                      mutateQueue();
                    }}
                  >
                    Check Out
                  </CheckOutButton>
                ) : (
                  <CheckInButton
                    onClick={async () => {
                      await API.taStatus.checkIn(courseId, queue?.room);
                      mutateQueue();
                    }}
                    data-cy="check-in-button"
                  >
                    Check In
                  </CheckInButton>
                )}
              </>
            }
          />
          <VerticalDivider />
          <Space direction="vertical" size={40} style={{ flexGrow: 1 }}>
            {isHelping && (
              <TABanner
                helpingQuestion={helpingQuestion}
                updateQuestion={updateQuestionTA}
              />
            )}
            <QueueQuestions
              questions={renderedQuestions}
              isHelping={isHelping}
              onOpenCard={onOpenCard}
            />
          </Space>
        </QueuePageContainer>
        {currentQuestion && (
          <StudentPopupCard
            onClose={onCloseClick}
            question={currentQuestion}
            visible={openPopup}
            updateQuestion={updateQuestionTA}
            isStaffCheckedIn={isStaffCheckedIn}
          />
        )}
        <EditQueueModal
          queueId={qid}
          visible={queueSettingsModal}
          onClose={() => setQueueSettingsModal(false)}
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

interface QueueProps {
  questions: Question[];
  isHelping: boolean;
  onOpenCard: (q: Question) => void;
}
function QueueQuestions({ questions, isHelping, onOpenCard }: QueueProps) {
  return (
    <div data-cy="queueQuestions">
      {questions.length === 0 ? (
        <NoQuestionsText>There are no questions in the queue</NoQuestionsText>
      ) : (
        <>
          <QueueHeader>Queue</QueueHeader>
          <TAHeaderCard bordered={false}>
            <CenterRow justify="space-between">
              <Col xs={2} lg={1}>
                <HeaderText>#</HeaderText>
              </Col>
              <Col xs={14} sm={11} lg={5}>
                <HeaderText>name</HeaderText>
              </Col>
              <Col xs={0} lg={2}>
                <HeaderText>type</HeaderText>
              </Col>
              <Col xs={0} lg={7}>
                <HeaderText>question</HeaderText>
              </Col>
              <Col xs={0} lg={2}>
                <HeaderText>wait</HeaderText>
              </Col>
              <Col span={2}>
                <StatusText>status</StatusText>
              </Col>
              <Col>
                <Placeholder />
              </Col>
            </CenterRow>
          </TAHeaderCard>
        </>
      )}
      {questions.map((question: Question, index: number) => (
        <TAQueueCard
          key={question.id}
          rank={index + 1}
          question={question}
          onOpen={(q) => !isHelping && onOpenCard(q)}
        />
      ))}
    </div>
  );
}
