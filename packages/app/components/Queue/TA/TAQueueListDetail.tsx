import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useWindowWidth } from "@react-hook/window-size";
import { Button, Skeleton, Tooltip } from "antd";
import React, { useState, ReactElement } from "react";
import styled from "styled-components";
import { useProfile } from "../../../hooks/useProfile";
import { useQuestions } from "../../../hooks/useQuestions";
import { NotificationSettingsModal } from "../../Nav/NotificationSettingsModal";
import { COMPACT_BKPT, SPLIT_DETAIL_BKPT } from "./TAQueueBreakpoints";
import TAQueueDetail from "./TAQueueDetail";
import TAQueueListSection from "./TAQueueListSection";

const Container = styled.div`
  flex: 1;

  background: white;
  border: 1px solid #cfd6de;
  margin-bottom: 30px;

  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    border: none;
    border-left: 1px solid #cfd6de;
    margin-bottom: 0px;
    display: flex;
    flex-direction: row;
    height: calc(
      100vh - 46px - 67px
    ); // - (height of footer) - (height of navbar)
  }
`;

const List = styled.div`
  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    width: 230px;
    overflow: scroll;
  }
  @media (min-width: ${COMPACT_BKPT}px) {
    width: 320px;
  }
`;

const PriorityQueueQuestionBubble = styled(QuestionCircleOutlined)`
  margin-right: 8px;
`;

const Detail = styled.div`
  border-left: 1px solid #cfd6de;
  border-right: 1px solid #cfd6de;
  flex: 1;
  overflow: scroll;
`;

const BackToQueue = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  color: #1890ff;
  cursor: pointer;
`;

/**
 * List and detail panel of the TA queue
 */
export default function TAQueueListDetail({
  queueId,
}: {
  queueId: number;
}): ReactElement {
  const user = useProfile();
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(null);
  const { questions, questionsError, mutateQuestions } = useQuestions(queueId);
  const isSideBySide = useWindowWidth() >= SPLIT_DETAIL_BKPT;

  const helpingQuestions = questions?.questionsGettingHelp?.filter(
    (q) => q.taHelped.id === user.id
  );
  const allQuestionsList = questions
    ? [...helpingQuestions, ...questions.queue, ...questions.priorityQueue]
    : [];
  const selectedQuestion = allQuestionsList.find(
    (q) => q.id === selectedQuestionId
  );
  // set currentQuestion to null if it no longer exists in the queue
  if (selectedQuestionId && !selectedQuestion) {
    setSelectedQuestionId(null);
  }

  if (!questions) {
    return <Skeleton />;
  }

  if (allQuestionsList.length === 0) {
    return (
      <EmptyQueueInfo>
        <NoQuestionsText>There are no questions in the queue</NoQuestionsText>
        {!user.phoneNotifsEnabled && !user.desktopNotifsEnabled && (
          <NotifReminderButton />
        )}
      </EmptyQueueInfo>
    );
  }
  const list = (
    <List>
      <div data-cy="list-helping">
        <TAQueueListSection
          title={"Currently Helping"}
          questions={helpingQuestions}
          onClickQuestion={setSelectedQuestionId}
          selectedQuestionId={selectedQuestionId}
        />
      </div>
      <div data-cy="list-priority">
        <TAQueueListSection
          title={
            <span>
              <Tooltip title="Students in the priority queue were at the top of the queue before for some reason (e.g. they were at the top but AFK, or a TA helped them previously, and then hit 'requeue student.' You should communicate with your fellow staff members to prioritize these students first.">
                <PriorityQueueQuestionBubble />
              </Tooltip>
              Priority Queue
            </span>
          }
          questions={questions.priorityQueue}
          onClickQuestion={setSelectedQuestionId}
          selectedQuestionId={selectedQuestionId}
          collapsible
        />
      </div>
      <div data-cy="list-queue">
        <TAQueueListSection
          title="Waiting In Line"
          questions={questions.queue}
          onClickQuestion={setSelectedQuestionId}
          selectedQuestionId={selectedQuestionId}
          collapsible
          showNumbers
        />
      </div>
    </List>
  );
  const detail = (
    <Detail>
      {selectedQuestion && (
        <TAQueueDetail queueId={queueId} question={selectedQuestion} />
      )}
    </Detail>
  );

  if (isSideBySide) {
    return (
      <Container>
        {list}
        {detail}
      </Container>
    );
  } else if (selectedQuestionId) {
    return (
      <Container>
        <BackToQueue onClick={() => setSelectedQuestionId(null)}>
          <span>
            <ArrowLeftOutlined />
            {" Back To Queue"}
          </span>
        </BackToQueue>
        {detail}
      </Container>
    );
  } else {
    return <Container>{list}</Container>;
  }
}

const EmptyQueueInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const NoQuestionsText = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #212934;
`;

const NotifRemindButton = styled(Button)`
  margin-top: 16px;
  border-radius: 6px;
  background: #fff;
`;

function NotifReminderButton() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
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