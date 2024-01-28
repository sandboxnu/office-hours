import React, { ReactElement } from 'react'
import styled from 'styled-components'
import TAquestionDetailButtons from './TAquestionDetailButtons'
import { AsyncQuestion, asyncQuestionStatus } from '@koh/common'
//test with test data
const Container = styled.div``

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 12px;
  background: #e1e7ec;
`
const Email = styled.div`
  font-size: 12px;
  color: #8895a6;
`

const QuestionCardBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px;
  padding: 16px;
  background: #ecf0f3;
`
const QuestionHeader = styled.div`
  font-size: 18px;
  color: #595959;
  margin-bottom: 20px;
`
const QuestionAsker = styled(QuestionHeader)`
  font-weight: 600;
  margin-bottom: 10px;
`
const QuestionDetails = styled.div`
  font-size: 18px;
  color: #595959;
  width: 400px;
  border: 1px solid black;
  padding: 5px;
  border-radius: 4px;
  margin-top: 5px;
  margin-bottom: 20px;
`
const QuestionTypePill = styled.span`
  color: #264359;
  background: #abd4f3;
  padding: 3px 8px;
  border-radius: 4px;
`
/**
 *  Details about the stuent's question, can edit if already resonded, delete, or answer.
 */

export default function TAquestionDetail({
  question,
}: {
  courseId: number
  question: AsyncQuestion
}): ReactElement {
  return (
    <Container>
      <Header>
        <div>
          <strong>{question.creator?.name}</strong>
          <Email>{question.creator?.email}</Email>
        </div>
        <div>{<TAquestionDetailButtons question={question} />}</div>
      </Header>
      <QuestionCardBox>
        <div>
          <>
            <QuestionAsker>
              <p>Question:</p>{' '}
            </QuestionAsker>
            <QuestionTypePill>{question.questionType}</QuestionTypePill>
            <QuestionDetails>{question.questionText}</QuestionDetails>
          </>
          {question.status === asyncQuestionStatus.Resolved ? (
            <>
              <QuestionAsker>
                <p>Response:</p>{' '}
              </QuestionAsker>
              <QuestionDetails>{question.answerText}</QuestionDetails>
            </>
          ) : (
            <></>
          )}
        </div>
      </QuestionCardBox>
    </Container>
  )
}
