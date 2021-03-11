import { User, Question } from '@koh/common';
import { Checkbox } from 'antd';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Header } from '../TAQueueDetail';
import TAQueueListItem from '../TAQueueListItem';
import {GroupCreationButton} from './TAGroupDetailButtons';


export const Description = styled.div`
  font-size: 12px;
  color: #8895a6;
`;

const QuestionsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionCheckbox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

export default function AllQuestionsCheckList({
  groupCreator,
  allQuestions,
  queueId,
}: {
  groupCreator: User;
  allQuestions: Question[];
  queueId: number;
}): ReactElement {
  const [checkedQuestions, setCheckedQuestions] = useState<Set<number>>(new Set());

  const onQuestionChecked = (q) => {
    if (!checkedQuestions.has(q.id)) {
      setCheckedQuestions(new Set(checkedQuestions.add(q.id)));
    } else {
      checkedQuestions.delete(q.id);
      setCheckedQuestions(new Set(checkedQuestions));
    }
  };

  return (
    <div>
      <Header>
        <div>
          <strong>{`${groupCreator.name}'s Group Session`}</strong>
          <Description>Select Students to Create Group</Description>
        </div>
        <div>
          <GroupCreationButton queueId={queueId} />
        </div>
      </Header>
      {/*TODO: think abt the UX for this more
       <Checkbox onChange={() => setCheckedQuestions(new Set(allQuestions.map(q => q.id)))}>Select All</Checkbox>
          <Checkbox onChange={() => setCheckedQuestions(new Set())}>Deselect All</Checkbox> */}
      <QuestionsList>
        {allQuestions.map((q, i) => (
          <QuestionCheckbox key={q.id}>
            <Checkbox checked={checkedQuestions.has(q.id)} onChange={(e) => onQuestionChecked(q)} />
            <div style={{ flexGrow: 1, marginLeft: '5px' }}>
              <TAQueueListItem
                question={q}
                index={i + 1}
                selected={checkedQuestions.has(q.id)}
                onClick={() => onQuestionChecked(q)}
              />
            </div>
          </QuestionCheckbox>
        ))}
      </QuestionsList>
    </div>
  );
}
