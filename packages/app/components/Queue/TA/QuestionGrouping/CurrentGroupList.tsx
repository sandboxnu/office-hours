import React from 'react';
import styled from 'styled-components';
import { ClosedQuestionStatus, OpenQuestionStatus, Question, User } from '@koh/common';
import { Header, QuestionTextBox, QuestionTypePill, StillDrafting } from '../TAQueueDetail';
import { Description } from './AllQuestionsChecklist';
import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { FinishHelpingButton } from '../../Banner';
import TAQueueDetailButtons from '../TAQueueDetailButtons';

const QuestionAsker = styled.div`
  font-size: 18px;
  font-weight: bold
  color: #595959;
  margin-bottom: 20px;
`;
const QuestionText = styled.div`
  font-size: 14px;
  color: #595959;
  margin-bottom: 20px;
`;
const QuestionCardBox = styled(QuestionTextBox)`
    display: flex;
    justify-content: space-between;
    align-items: center
`;

export function CurrentGroupList({
  groupCreator,
  questions,
  queueId,
}: {
  groupCreator: User;
  questions: Question[];
  queueId: number;
}) {
  return (
    <div>
      <Header>
        <div>
          <strong>{`${groupCreator.name}'s Group Session`}</strong>
          <Description>{questions.map((q) => q.creator.name).join(', ')}</Description>
        </div>
        <div>
          <Tooltip title="Finish Helping">
            <FinishHelpingButton
              icon={<CheckOutlined />}
              // TODO:  onClick={() => changeStatus(ClosedQuestionStatus.Resolved)}
              data-cy="finish-helping-button"
            />
          </Tooltip>
        </div>
      </Header>
      {questions.map((q) => (
        <div key={q.id}>
          <QuestionCard question={q} queueId={queueId} />
        </div>
      ))}
    </div>
  );
}

function QuestionCard({ question, queueId }: { question: Question, queueId: number}) {
  return question.status === OpenQuestionStatus.Drafting ? (
    <StillDrafting>{question.creator.name} is drafting their question...</StillDrafting>
  ) : (
    <QuestionCardBox>
      <div>
        {question.text || question.questionType ? (
          <>
            <QuestionAsker>{question.creator.name}</QuestionAsker>
            <QuestionText>{question.text}</QuestionText>
            <QuestionTypePill>{question.questionType}</QuestionTypePill>
          </>
        ) : (
          <p>No question details</p>
        )}
      </div>
      <div><TAQueueDetailButtons queueId={queueId} question={question} /></div>
    </QuestionCardBox>
  );
}
