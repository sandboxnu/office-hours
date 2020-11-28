import { Question } from "@koh/common";
import { Skeleton } from "antd";
import { useState, useCallback, ReactElement } from "react";
import styled from "styled-components";
import { useProfile } from "../../../hooks/useProfile";
import { useQuestions } from "../../../hooks/useQuestions";
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

  const onOpenCard = useCallback((question: Question): void => {
    setCurrentQuestion(question);
  }, []);

  // set currentQuestion to null if it no longer exists in the queue
  if (
    currentQuestion &&
    !questions?.queue?.includes(currentQuestion) &&
    !questions?.priorityQueue?.includes(currentQuestion)
  ) {
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
        />
        <TAQueueListSection
          title="Priority Queue"
          questions={questions.priorityQueue}
          onClickQuestion={setCurrentQuestion}
          collapsible
        />
        <TAQueueListSection
          title="Waiting In Line"
          questions={questions.queue}
          onClickQuestion={setCurrentQuestion}
          collapsible
          showNumbers
        />
      </List>
    </Container>
  );
}
