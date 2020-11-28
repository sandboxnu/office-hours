import { QuestionCircleOutlined } from "@ant-design/icons";
import { Skeleton, Tooltip } from "antd";
import React, { useState, ReactElement } from "react";
import styled from "styled-components";
import { useProfile } from "../../../hooks/useProfile";
import { useQuestions } from "../../../hooks/useQuestions";
import TAQueueDetail from "./TAQueueDetail";
import TAQueueListSection from "./TAQueueListSection";

// The min screen width at which the list and detail become side-by-side
const SPLIT_DETAIL_BKPT = 767;

const Container = styled.div`
  flex: 1;

  background: white;

  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    display: flex;
    flex-direction: row;
  }
`;

const List = styled.div`
  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    width: 350px;
  }
`;

const PriorityQueueQuestionBubble = styled(QuestionCircleOutlined)`
  margin-right: 8px;
`;

const Detail = styled.div`
  border-left: 1px solid #cfd6de;
  border-right: 1px solid #cfd6de;
  flex: 1;
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
  return (
    <Container>
      <List>
        <TAQueueListSection
          title={"Currently Helping"}
          questions={helpingQuestions}
          onClickQuestion={setSelectedQuestionId}
          selectedQuestionId={selectedQuestionId}
        />
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
        <TAQueueListSection
          title="Waiting In Line"
          questions={questions.queue}
          onClickQuestion={setSelectedQuestionId}
          selectedQuestionId={selectedQuestionId}
          collapsible
          showNumbers
        />
      </List>
      <Detail>
        {selectedQuestion && (
          <TAQueueDetail queueId={queueId} question={selectedQuestion} />
        )}
      </Detail>
    </Container>
  );
}
