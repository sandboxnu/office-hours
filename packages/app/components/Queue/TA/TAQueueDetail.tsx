import { OpenQuestionStatus, Question } from "@koh/common";
import React, { ReactElement } from "react";
import styled from "styled-components";
import TAQueueDetailButtons from "./TAQueueDetailButtons";

const Container = styled.div``;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 12px;
  background: #e1e7ec;
`;
const Email = styled.div`
  font-size: 12px;
  color: #8895a6;
`;

export const QuestionTextBox = styled.div`
  margin: 12px;
  padding: 16px;
  background: #ecf0f3;
`;
const QuestionText = styled.div`
  font-size: 18px;
  color: #595959;
  margin-bottom: 20px;
`;
export const QuestionTypePill = styled.span`
  color: #264359;
  background: #abd4f3;
  padding: 3px 8px;
  border-radius: 4px;
`;

export const StillDrafting = styled.div`
  margin: 12px 30px;
  text-align: center;
  font-size: 16px;
`;

/**
 *  Details about the stuent's question
 */
export default function TAQueueDetail({
  queueId,
  question,
}: {
  queueId: number;
  question: Question;
}): ReactElement {
  return (
    <Container>
      <Header>
        <div>
          <strong>{question.creator.name}</strong>
          <Email>{question.creator.email}</Email>
        </div>
        <div>
          <TAQueueDetailButtons queueId={queueId} question={question} />
        </div>
      </Header>
      {question.status === OpenQuestionStatus.Drafting ? (
        <StillDrafting>
          {question.creator.name} is drafting their question...
        </StillDrafting>
      ) : (
        <QuestionTextBox>
          {question.text || question.questionType ? (
            <>
              <QuestionText>{question.text}</QuestionText>
              <QuestionTypePill>{question.questionType}</QuestionTypePill>
            </>
          ) : (
            <p>No question details</p>
          )}
        </QuestionTextBox>
      )}
    </Container>
  );
}
