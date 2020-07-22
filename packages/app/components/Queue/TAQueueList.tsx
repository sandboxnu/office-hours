import { API } from "@template/api-client";
import {
  ClosedQuestionStatus,
  OpenQuestionStatus,
  Question,
  QuestionStatus,
} from "@template/common";
import { Button, Card, Col, Grid, Row, Tooltip } from "antd";
import { ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
import { useProfile } from "../../hooks/useProfile";
import GroupQuestions from "./GroupQuestions";
import StudentInfoCard from "./StudentInfoCard";
import StudentPopupCard from "./StudentPopupCard";
import TAHelpingCard from "./TAHelpingCard";
import TAQueueCard from "./TAQueueCard";

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
  font-size: 30px;
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

const AlertButton = styled(Button)`
  margin-right: 12px;
  font-weight: 500;
  font-size: 14px;
  color: #da3236;
  background: #f8f9fa;
  border: 1px solid #cfd6de;
  border-radius: 6px;
`;

const FinishButton = styled(Button)`
  font-weight: 500;
  font-size: 14px;
  background: #3684c6;
  border-radius: 6px;
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

  const { data: queue, error: queuesError, mutate: mutateQueue } = useSWR(
    qid && `/api/v1/queues/${qid}`,
    async () => API.queues.get(Number(qid))
  );

  const { data: questions, error: questionsError } = useSWR(
    qid && `/api/v1/queues/${qid}/questions`,
    async () => API.questions.index(Number(qid))
  );

  const alertStudent = async (question: Question) => {
    await API.questions.notify(question.id);
  };

  const helpingQuestions: Question[] = questions?.filter(
    (question) => question.status === OpenQuestionStatus.Helping
  );
  const groupQuestions: Question[] = questions?.filter(
    (question) => question.status !== OpenQuestionStatus.Helping
  );
  const helping = helpingQuestions?.length !== 0;

  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(null);

  const onOpenClick = useCallback((question: Question): void => {
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
    mutate(`/api/v1/queues/${qid}/questions`, newQuestions);
    setOpenPopup(false);
  };

  /**
   * Sends a push notification alert to every question currently being helped.
   */
  const alertHelpingAll = () => {
    // for each question currently being helped, call alertStudent()
  };

  /**
   * Marks every question currently being helped by this TA as finished.
   */
  const finishHelpingAll = () => {
    for (const question of helpingQuestions) {
      updateQuestionTA(question, ClosedQuestionStatus.Resolved);
    }
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

  const isStaffCheckedIn = queue?.staffList.some((e) => e.id === user.id);

  /**
   * Renders the card headers for a TA who is not yet helping someone.
   */
  const renderTAHeader = () => {
    return (
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
    );
  };

  /**
   * Renders the card headers for a TA who is currently helping someone.
   */
  const renderHelpingHeader = () => {
    return (
      <TAHeaderCard bordered={false}>
        <CenterRow justify="space-between">
          <Col xs={2} lg={1}>
            <HeaderText>#</HeaderText>
          </Col>
          <Col xs={14} sm={9} lg={11} xl={9} xxl={4}>
            <HeaderText>name</HeaderText>
          </Col>
          <Col xs={0} xxl={7}>
            <HeaderText>question</HeaderText>
          </Col>
          <Col xs={0} xl={3}>
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
    );
  };

  /**
   * Renders the title and aggregate buttons for the helping column.
   */
  const renderHelpingTitle = () => {
    return (
      <Col xs={24} lg={10} xxl={6} order={screens.lg === false ? 1 : 2}>
        <HeaderRow justify="space-between">
          <QueueTitle>Helping</QueueTitle>
          <div>
            <AlertButton danger size="large" onClick={alertHelpingAll}>
              Alert All
            </AlertButton>
            <FinishButton
              type="primary"
              size="large"
              onClick={finishHelpingAll}
            >
              Finish All
            </FinishButton>
          </div>
        </HeaderRow>
        {helpingQuestions &&
          helpingQuestions.map((question) => (
            <StudentInfoCard
              key={question.id}
              updateQuestion={updateQuestionTA}
              alertStudent={alertStudent}
              question={question}
            />
          ))}
        {groupQuestions && groupQuestions.length !== 0 && (
          <GroupQuestions
            questions={groupQuestions}
            addQuestions={addQuestionsToHelp}
          />
        )}
      </Col>
    );
  };

  return (
    <div>
      <Row gutter={[64, 64]}>
        <Col flex="auto" order={screens.lg === false ? 2 : 1}>
          <Row justify="space-between" align="middle">
            <QueueTitle>{queue?.room}</QueueTitle>
            <Row>
              <Tooltip
                title={
                  !isStaffCheckedIn && "You must check in to help students!"
                }
              >
                <HelpNextButton disabled={!isStaffCheckedIn} size="large">
                  Help Next
                </HelpNextButton>
              </Tooltip>
              {isStaffCheckedIn ? (
                <CheckOutButton
                  danger
                  size="large"
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
                >
                  Check In
                </CheckInButton>
              )}
            </Row>
          </Row>
          {!helping && renderTAHeader()}
          {helping && renderHelpingHeader()}
          {questions?.map((question: Question, index: number) => {
            return helping ? (
              <TAHelpingCard rank={index + 1} question={question} />
            ) : (
              <TAQueueCard
                rank={index + 1}
                question={question}
                onOpen={onOpenClick}
              />
            );
          })}
        </Col>
        {helping && renderHelpingTitle()}
      </Row>
      {currentQuestion && (
        <StudentPopupCard
          onClose={onCloseClick}
          email="takayama.a@northeastern.edu" //need a way to access this. or the user
          wait={20} //figure out later
          question={currentQuestion}
          location="Outside by the printer" // need a way to access this
          visible={openPopup}
          updateQuestion={updateQuestionTA}
          isStaffCheckedIn={isStaffCheckedIn}
        />
      )}
    </div>
  );
}
