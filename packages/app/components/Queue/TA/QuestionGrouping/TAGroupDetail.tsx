import { User } from "@koh/common";
import React, { ReactElement } from "react";
import { useQuestions } from "../../../../hooks/useQuestions";
import AllQuestionsCheckList from "./AllQuestionsChecklist";
import { CurrentGroupList } from "./CurrentGroupList";

export default function TAGroupDetail({
  groupCreator,
  queueId,
  courseId,
}: {
  groupCreator: User;
  queueId: number;
  courseId: number;
}): ReactElement {
  const { questions, mutateQuestions } = useQuestions(queueId);
  const allQuestions = [...questions.queue, ...questions.priorityQueue];
  const myGroup = questions?.groups.find(
    (group) => group.creator.id === groupCreator.id
  );
  const groupedQuestions = myGroup ? myGroup.questions : [];

  return groupedQuestions.length ? (
    <CurrentGroupList courseId={courseId} group={myGroup} queueId={queueId} />
  ) : (
    <AllQuestionsCheckList
      allQuestions={allQuestions}
      groupCreator={groupCreator}
      queueId={queueId}
      onStartCall={() => {
        mutateQuestions();
      }}
    />
  );
}
