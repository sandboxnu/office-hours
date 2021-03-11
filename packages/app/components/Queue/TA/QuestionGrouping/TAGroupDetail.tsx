import { User, Question } from '@koh/common';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import AllQuestionsCheckList from './AllQuestionsChecklist';
import { CurrentGroupList } from './CurrentGroupList';

export default function TAGroupDetail({
  groupCreator,
  allQuestions,
  queueId,
}: {
  groupCreator: User;
  allQuestions: Question[];
  queueId: number;
}): ReactElement {
  const [isCalling, setIsCalling] = useState<boolean>(true);
  // TODO: possibly get rid of isCalling and just pass in groupedQuestions > check if there are any q's

  return isCalling ? ( 
    <CurrentGroupList questions={allQuestions} groupCreator={groupCreator} queueId={queueId} />
  ) : (
    <AllQuestionsCheckList allQuestions={allQuestions} groupCreator={groupCreator} queueId={queueId} />
  );
}
