import React from 'react'
import styled from 'styled-components'
import { OpenQuestionStatus, Question } from '@koh/common'
import TAQueueDetailButtons from './TAQueueDetailButtons'

const QuestionCardBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px;
  padding: 16px;
  background: #ecf0f3;
`
const StillDrafting = styled.div`
  margin: 12px 30px;
  text-align: center;
  font-size: 16px;
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
  font-size: 14px;
  color: #595959;
  margin-bottom: 20px;
`
const QuestionTypePill = styled.span`
  color: #264359;
  background: #abd4f3;
  padding: 3px 8px;
  border-radius: 4px;
`

export default function TAQueueDetailQuestion({
  question,
  queueId,
  courseId,
  showName,
  showButtons,
  hasUnresolvedRephraseAlert,
}: {
  question: Question
  queueId: number
  courseId: number
  showName?: boolean
  showButtons?: boolean
  hasUnresolvedRephraseAlert: boolean
}) {
  return question.status === OpenQuestionStatus.Drafting ? (
    <StillDrafting>
      {question.creator.name} is drafting their question...
    </StillDrafting>
  ) : (
    <QuestionCardBox>
      <div>
        {question.text || question.questionType ? (
          <>
            {showName ? (
              <>
                <QuestionAsker>{question.creator.name}</QuestionAsker>
                <QuestionDetails>{question.text}</QuestionDetails>
              </>
            ) : (
              <QuestionHeader>{question.text}</QuestionHeader>
            )}
            <QuestionTypePill>{question.questionType}</QuestionTypePill>
          </>
        ) : (
          <p>No question details</p>
        )}
      </div>
      <div>
        {showButtons && (
          <TAQueueDetailButtons
            courseId={courseId}
            queueId={queueId}
            question={question}
            hasUnresolvedRephraseAlert={hasUnresolvedRephraseAlert}
          />
        )}
      </div>
    </QuestionCardBox>
  )
}
