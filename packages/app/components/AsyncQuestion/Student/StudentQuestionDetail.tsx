import React, { ReactElement } from "react";
import styled from "styled-components";
// import TAquestionDetailButtons from "./TAquestionDetailButtons";
import { AsyncQuestion, asyncQuestionStatus } from "@koh/common";
import StudentQuestionDetailButtons from "./StudentQuestionDetailButtons";

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

const QuestionCardBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px;
  padding: 16px;
  background: #ecf0f3;
`;

const QuestionHeader = styled.div`
  font-size: 18px;
  color: #595959;
  margin-bottom: 20px;
`;
const QuestionAsker = styled(QuestionHeader)`
  font-weight: 600;
  margin-bottom: 10px;
`;
const QuestionDetails = styled.div`
  font-size: 14px;
  color: #595959;
  margin-bottom: 20px;
`;
const QuestionTypePill = styled.span`
  color: #264359;
  background: #abd4f3;
  padding: 3px 8px;
  border-radius: 4px;
`;
/**
 *  Details about the stuent's question
 */

export default function StudentQuestionDetail({
  question,
  studentId
}: {
  question: AsyncQuestion;
  studentId: number;
}): ReactElement {
  return (
    <Container>
      <Header>
        {studentId === question.creatorId ? (
          <div>
            <strong>{question.creator?.name}</strong>
            <Email>{question.creator?.email}</Email>
          </div>
        ) : (
          <div>
            <strong> Posted by a curious Student</strong>
          </div>
        )}

        <div>{<StudentQuestionDetailButtons question={question} />}</div>
      </Header>
      <QuestionCardBox>
        <div>
          <>
            <QuestionAsker>
              <p>Question:</p>{" "}
            </QuestionAsker>
            <QuestionTypePill>{question.questionType}</QuestionTypePill>
            <QuestionDetails>{question.questionText}</QuestionDetails>
          </>
          {question.status === asyncQuestionStatus.Resolved ? (
            <>
              <QuestionAsker>
                <p>Response:</p>{" "}
              </QuestionAsker>
              <QuestionDetails>{question.answerText}</QuestionDetails>
            </>
          ) : (
            <></>
          )}
        </div>
      </QuestionCardBox>
      <QuestionCardBox></QuestionCardBox>
    </Container>
  );
}
