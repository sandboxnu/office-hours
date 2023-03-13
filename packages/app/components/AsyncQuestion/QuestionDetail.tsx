import React, { ReactElement } from "react";
import styled from "styled-components";
// import TAquestionDetailButtons from "./TAquestionDetailButtons";
import { AsyncQuestion, asyncQuestionStatus } from "@koh/common";
import StudentQuestionDetailButtons from "./Student/StudentQuestionDetailButtons";
import { Image } from "antd";
import TAquestionDetailButtons from "./TA/TAquestionDetailButtons";

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
`;
const QuestionAsker = styled(QuestionHeader)`
  font-weight: 600;
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

export function QuestionDetail({
  userId,
  isStudent,
  question,
}: {
  userId: number;
  isStudent: boolean;
  question: AsyncQuestion;
}): ReactElement {
  return (
    <Container>
      <Header>
        {isStudent ? (
          userId === question.creatorId ? (
            <>
              <div>
                <strong> Posted by a curious Student</strong>
              </div>
              <div>{<StudentQuestionDetailButtons question={question} />}</div>
            </>
          ) : (
            <>
              <div>
                <strong> Posted by a curious Student</strong>
              </div>
            </>
          )
        ) : (
          <>
            <div>
              <strong>{question.creator?.name}</strong>
              <Email>{question.creator?.email}</Email>
            </div>
            <div>{<TAquestionDetailButtons question={question} />}</div>
          </>
        )}
      </Header>
      <QuestionCardBox>
        <div>
          <>
            <QuestionAsker>
              <p>Question: {question.questionAbstract}</p>
            </QuestionAsker>
            <QuestionTypePill>{question.questionType}</QuestionTypePill>
            <QuestionDetails>{question.questionText}</QuestionDetails>
            {question?.images.map((i) => {
              return (
                <Image
                  height={100}
                  src={`/api/v1/image/${i.id}`}
                  alt="none"
                  key={i.id}
                />
              );
            })}
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
    </Container>
  );
}
