import { Question } from "@koh/common";
import { Skeleton } from "antd";
import React, { useState, useCallback, ReactElement } from "react";
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

const Detail = styled.div`
  border-left: 1px solid #cfd6de;
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
  const [currentQuestion, setCurrentQuestion] = useState<Question>(null);
  const { questions, questionsError, mutateQuestions } = useQuestions(queueId);

  const allQuestionsList = [
    ...questions?.questionsGettingHelp,
    ...questions?.queue,
    ...questions?.priorityQueue,
  ];
  // set currentQuestion to null if it no longer exists in the queue
  if (currentQuestion && !allQuestionsList.includes(currentQuestion)) {
    setCurrentQuestion(null);
  }

  if (!questions) {
    return <Skeleton />;
  }
  return (
    <Container>
      <List>
        <TAQueueListSection
          title="Currently Helping"
          questions={questions.questionsGettingHelp.filter(
            (q) => q.taHelped.id === user.id
          )}
          onClickQuestion={setCurrentQuestion}
          currentQuestion={currentQuestion}
        />
        <TAQueueListSection
          title="Priority Queue"
          questions={questions.priorityQueue}
          onClickQuestion={setCurrentQuestion}
          currentQuestion={currentQuestion}
          collapsible
        />
        <TAQueueListSection
          title="Waiting In Line"
          questions={questions.queue}
          onClickQuestion={setCurrentQuestion}
          currentQuestion={currentQuestion}
          collapsible
          showNumbers
        />
      </List>
      <Detail>
        {currentQuestion && (
          <TAQueueDetail queueId={queueId} question={currentQuestion} />
        )}
      </Detail>
    </Container>
  );
}
