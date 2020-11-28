import { QuestionCircleOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { Question, QuestionStatusKeys } from "@koh/common";
import { Card, Col, Row, Tooltip } from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../../hooks/useProfile";
import { useQuestions } from "../../../hooks/useQuestions";
import { useQueue } from "../../../hooks/useQueue";
import { useTAInQueueInfo } from "../../../hooks/useTAInQueueInfo";
import { NotificationSettingsModal } from "../../Nav/NotificationSettingsModal";
import {
  QueueInfoColumn,
  QueueInfoColumnButton,
  VerticalDivider,
} from "../QueueListSharedComponents";
import { EditQueueModal } from "./EditQueueModal";
import TAQueueCard from "./old/TAQueueCard";
import onHelpQuestion from "./onHelpQuestion";
import TAQueueListDetail from "./TAQueueListDetail";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    margin: 0 64px;
  }
`;

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

const PriorityQueueQuestionBubble = styled(QuestionCircleOutlined)`
  fontsize: 20;
  margin-left: 20px;
`;

interface TAQueueProps {
  qid: number;
  courseId: number;
}

export default function TAQueue({ qid, courseId }: TAQueueProps): ReactElement {
  const { queue, mutateQueue } = useQueue(qid);

  const { questions, mutateQuestions } = useQuestions(qid);

  const { isCheckedIn, isHelping } = useTAInQueueInfo(qid);

  const [queueSettingsModal, setQueueSettingsModal] = useState(false);

  const nextQuestion =
    questions?.priorityQueue[0] || // gets the first item of priority queue if it exists
    questions?.queue?.find(
      (question) => question.status === QuestionStatusKeys.Queued
    );

  const helpNext = async () => {
    await onHelpQuestion(nextQuestion.id);
    mutateQuestions();
    window.open(
      `https://teams.microsoft.com/l/chat/0/0?users=${nextQuestion.creator.email}`
    );
  };

  if (queue) {
    return (
      <>
        <Container>
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
                  title={!isCheckedIn && "You must check in to help students!"}
                >
                  <HelpNextButton
                    onClick={helpNext}
                    disabled={!isCheckedIn || !nextQuestion || isHelping}
                    data-cy="help-next"
                  >
                    Help Next
                  </HelpNextButton>
                </Tooltip>
                {isCheckedIn ? (
                  <CheckOutButton
                    danger
                    disabled={isHelping}
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
          {/* <Space direction="vertical" size={40} style={{ flexGrow: 1 }}>
            {isHelping && (
              <TABanner
                helpingQuestion={helpingQuestion}
                updateQuestion={updateQuestionTA}
              />
            )}
            {!!questions.priorityQueue.length && (
              <QueueQuestions
                questions={questions.priorityQueue}
                isHelping={isHelping}
                onOpenCard={onOpenCard}
                title={
                  //TODO
                  <>
                    Priority Queue
                    <Tooltip title="Students in the priority queue were at the top of the queue before for some reason (e.g. they were at the top but AFK, or a TA helped them previously, and then hit 'requeue student.' You should communicate with your fellow staff members to prioritize these students first.">
                      <PriorityQueueQuestionBubble />
                    </Tooltip>
                  </>
                }
              />
            )}
            <QueueQuestions
              questions={renderedQuestions}
              isHelping={isHelping}
              onOpenCard={onOpenCard}
              title={<div>Queue</div>}
            />
          </Space> */}
          <TAQueueListDetail queueId={qid} />
        </Container>
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

function NotifReminderButton() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const NotifRemindButton = styled(QueueInfoColumnButton)`
    margin-top: 16px;
    border-radius: 6px;
    background: #fff;
  `;

  return (
    <>
      <NotifRemindButton onClick={(e) => setIsNotifOpen(true)}>
        Sign Up for Notifications
      </NotifRemindButton>
      {isNotifOpen && (
        <NotificationSettingsModal
          visible={isNotifOpen}
          onClose={() => setIsNotifOpen(false)}
        />
      )}
    </>
  );
}

interface QueueProps {
  questions: Question[];
  isHelping: boolean;
  onOpenCard: (q: Question) => void;
  title: ReactElement;
}
function QueueQuestions({
  questions,
  isHelping,
  onOpenCard,
  title,
}: QueueProps) {
  const { phoneNotifsEnabled, desktopNotifsEnabled } = useProfile();
  return (
    <div data-cy="queueQuestions">
      {questions.length === 0 ? (
        <>
          <NoQuestionsText>There are no questions in the queue</NoQuestionsText>
          {!isHelping && !phoneNotifsEnabled && !desktopNotifsEnabled && (
            <NotifReminderButton />
          )}
        </>
      ) : (
        <>
          <>
            <QueueHeader>{title}</QueueHeader>
          </>
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
          onOpen={(q) => onOpenCard(q)}
        />
      ))}
    </div>
  );
}
