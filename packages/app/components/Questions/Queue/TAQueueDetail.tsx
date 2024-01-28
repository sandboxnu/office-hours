import { Question } from '@koh/common'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import TAQueueDetailButtons from './TAQueueDetailButtons'
import TAQueueDetailQuestion from './TAQueueDetailQuestion'

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

/**
 *  Details about the stuent's question
 */
export default function TAQueueDetail({
  courseId,
  queueId,
  question,
  hasUnresolvedRephraseAlert,
}: {
  courseId: number
  queueId: number
  question: Question
  hasUnresolvedRephraseAlert: boolean
}): ReactElement {
  return (
    <Container>
      <Header>
        <div>
          <strong>{question.creator.name}</strong>
          <Email>{question.creator.email}</Email>
        </div>
        <div>
          <TAQueueDetailButtons
            courseId={courseId}
            queueId={queueId}
            question={question}
            hasUnresolvedRephraseAlert={hasUnresolvedRephraseAlert}
          />
        </div>
      </Header>
      <TAQueueDetailQuestion
        courseId={courseId}
        question={question}
        queueId={queueId}
        hasUnresolvedRephraseAlert={hasUnresolvedRephraseAlert}
      />
    </Container>
  )
}
