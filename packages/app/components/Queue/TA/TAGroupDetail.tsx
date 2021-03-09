import { User, Question } from '@koh/common';
import { Checkbox } from 'antd';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Header } from './TAQueueDetail';
import TAQueueDetailButtons from './TAQueueDetailButtons';
import TAQueueListItem from "./TAQueueListItem";

const Container = styled.div``;

const Description = styled.div`
  font-size: 12px;
  color: #8895a6;
`;

export default function TAGroupDetail({
  groupCreator,
  allQuestions,
  queueId,
}: {
  groupCreator: User;
  allQuestions: Question[];
  queueId: number;
}): ReactElement {
  const [isCalling, setIsCalling] = useState<boolean>(false);

  return (
      isCalling ? <AllQuestionsCheckList allQuestions={allQuestions} groupCreator={groupCreator} queueId={queueId}/> : null
  );
}

function AllQuestionsCheckList({  groupCreator, allQuestions,   queueId, }: { groupCreator: User, allQuestions: Question[],  queueId: number}): ReactElement {
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [checkedQuestions, setCheckedQuestions] = useState<Set<number>>(new Set());
  
  const onQuestionChecked = (e, q) => {
    if (e.target.checked) {
        setCheckedQuestions(checkedQuestions.add(q.id)) 
    } else {
        checkedQuestions.delete(q.id);
        setCheckedQuestions(checkedQuestions);
    }
  }

  return (
    <Container>
    <Header>
      <div>
        <strong>{`${groupCreator.name}'s Group Session`}</strong>
        <Description>Select Students to Create Group</Description>
      </div>
      <div>
        <TAQueueDetailButtons queueId={queueId} question={null} />
      </div>
    </Header>
    <div>
      <Checkbox onChange={() => setAllSelected(!allSelected)}>{allSelected ? 'Deselect All' : 'Select All'}</Checkbox>
      {allQuestions.map((q, i) => (
        <Checkbox 
          key={q.id}
          onChange={(e) => onQuestionChecked(e, q)}>
              <TAQueueListItem 
                question={q}
                index={i + 1}
                selected={checkedQuestions.has(q.id)}
                onClick={()=>{}}
              />
        </Checkbox>))}
    </div>
  </Container>
  );
}
