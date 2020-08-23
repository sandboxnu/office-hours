import { API } from "@template/api-client";
import {
  OpenQuestionStatus,
  Question,
  QuestionStatus,
  QuestionStatusKeys,
} from "@template/common";
import { Button, Card, Col, Grid, Row, Tooltip } from "antd";
import { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { TAStatuses } from "./TAStatuses";
import { useProfile } from "../../hooks/useProfile";
import { useQuestions } from "../../hooks/useQuestions";
import { useQueue } from "../../hooks/useQueue";
import QueueListHeader, {
  QueuePageContainer,
  QueueInfoColumn,
  VerticalDivider,
  QueueContainer,
} from "./QueueListSharedComponents";
import StudentInfoCard from "./StudentInfoCard";
import StudentPopupCard from "./StudentPopupCard";
import TAHelpingCard from "./TAHelpingCard";
import TAQueueCard from "./TAQueueCard";
import StudentBanner from "./StudentBanner";

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

const QueueTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #212934;

  // unicode zero width space character to prevent layout shifting during loading
  &:before {
    content: "\\200b";
  }
`;

const CenterRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
`;

const Placeholder = styled.div`
  width: 14px;
`;

const CheckOutButton = styled(Button)`
  font-weight: 500;
  font-size: 14px;
  color: #da3236;
  background: #f8f9fa;
  border: 1px solid #cfd6de;
  border-radius: 6px;
`;

const CheckInButton = styled(Button)`
  font-weight: 500;
  font-size: 14px;
  color: white;
  background: #2a9187;
  border: 1px solid #cfd6de;
  border-radius: 6px;
`;

const HelpNextButton = styled(Button)`
  font-weight: 500;
  font-size: 14px;
  color: #212934;
  border: 1px solid #cfd6de;
  border-radius: 6px;
  margin-right: 16px;
`;

const HeaderRow = styled(Row)`
  margin-bottom: 64px;
`;

interface TAQueueListProps {
  qid: number;
  courseId: number;
}

export default function TAQueueList({
  qid,
  courseId,
}: TAQueueListProps): ReactElement {
  const screens = useBreakpoint();
  const user = useProfile();

  const { queue, queuesError, mutateQueue } = useQueue(qid);

  const { questions, questionsError, mutateQuestions } = useQuestions(qid);

  const helpingQuestions: Question[] = questions?.filter(
    (question) =>
      question.status === OpenQuestionStatus.Helping &&
      question.taHelped?.id === user.id
  );
  const groupQuestions: Question[] = questions?.filter(
    (question) => question.status !== OpenQuestionStatus.Helping
  );
  const isHelping = helpingQuestions?.length !== 0;

  const [openPopup, setOpenPopup] = useState<boolean>(false);
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

  /**
   * Adds every given question to the group that is currently being helped.
   * @param selected the given list of questions to help
   */
  const addQuestionsToHelp = (selected: Question[]) => {
    for (const question of selected) {
      updateQuestionTA(question, OpenQuestionStatus.Helping);
    }
  };

  const isStaffCheckedIn = queue?.staffList.some((e) => e.id === user?.id);

  const helpNext = async () => {
    const nextQuestion = questions.find(
      (question) => question.status === QuestionStatusKeys.Queued
    );

    updateQuestionTA(nextQuestion, OpenQuestionStatus.Helping);
  };

  /**
   * Renders the title and aggregate buttons for the helping column.
   */
  const renderHelpingTitle = () => {
    return (
      <Col xs={24} lg={10} xxl={6} order={screens.lg === false ? 1 : 2}>
        <HeaderRow justify="space-between">
          <QueueTitle>Helping</QueueTitle>
        </HeaderRow>
        {helpingQuestions &&
          helpingQuestions.map((question) => (
            <StudentInfoCard
              key={question.id}
              updateQuestion={updateQuestionTA}
              question={question}
            />
          ))}
        {/* {groupQuestions && groupQuestions.length !== 0 && (
          <GroupQuestions
            questions={groupQuestions}
            addQuestions={addQuestionsToHelp}
          />
        )} */}
      </Col>
    );
  };

  if (queue && questions) {
    return (
      <>
        <QueuePageContainer>
          <QueueInfoColumn
            queueId={qid}
            buttons={
              <>
                <Tooltip
                  title={
                    !isStaffCheckedIn && "You must check in to help students!"
                  }
                >
                  <HelpNextButton
                    onClick={helpNext}
                    disabled={!isStaffCheckedIn}
                    size="large"
                    data-cy="help-next"
                  >
                    Help Next
                  </HelpNextButton>
                </Tooltip>
                {isStaffCheckedIn ? (
                  <CheckOutButton
                    danger
                    size="large"
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
                    size="large"
                    data-cy="check-in-button"
                  >
                    Check In
                  </CheckInButton>
                )}
              </>
            }
          />
          <VerticalDivider />
          <QueueContainer>
            <QueueQuestions
              questions={questions}
              isHelping={isHelping}
              onOpenCard={onOpenCard}
            />
          </QueueContainer>
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
      </>
    );
  } else {
    return <div />;
  }
}

const QueueHeader = styled.h2`
  margin-top: 24px;
  margin-bottom: 0;
`;
interface QueueProps {
  questions: Question[];
  isHelping: boolean;
  onOpenCard: (q: Question) => void;
}
function QueueQuestions({ questions, isHelping, onOpenCard }: QueueProps) {
  return (
    <div>
      {questions.length === 0 ? (
        <h1 style={{ marginTop: "50px" }}>
          There currently aren&apos;t any questions in the queue
        </h1>
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

      {questions?.map((question: Question, index: number) => {
        return isHelping ? (
          <TAHelpingCard rank={index + 1} question={question} />
        ) : (
          <TAQueueCard
            rank={index + 1}
            question={question}
            onOpen={onOpenCard}
          />
        );
      })}
    </div>
  );
}
