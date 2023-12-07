import { Question } from '@koh/common'
import { Card, Col } from 'antd'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { getWaitTime } from '../../../utils/TimeUtil'
import { CenterRow, Text } from '../QueueCardSharedComponents'
import { truncate } from '../QueueUtils'
import TAQueueDetailButtons from '../TA/TAQueueDetailButtons'

const HorizontalStudentCard = styled(Card)`
  margin-bottom: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  border-radius: 6px;
  padding-left: 8px;
  padding-right: 8px;
  color: #595959;
`

interface StudentQueueCardProps {
  question: Question
  rank: number
  cid: number
  qid: number
  isStaff: boolean
}

/**
 * Renders the queue card and its contents for a student viewing.
 */
export default function StudentQueueCard({
  question,
  cid,
  qid,
  isStaff,
}: StudentQueueCardProps): ReactElement {
  return (
    <HorizontalStudentCard>
      <CenterRow>
        <Col flex="1 1">
          <Text>{truncate(question.text, 150)}</Text>
          <div
            style={{
              backgroundColor: 'lightblue',
              borderRadius: '10px',
              padding: '5px 10px',
              marginTop: '5px',
              display: 'inline-block',
            }}
          >
            <Text>{question.questionType}</Text>
          </div>
        </Col>
        <Col flex="0 0 80px">
          <Text>{getWaitTime(question)}</Text>
        </Col>
        {isStaff && (
          <Col>
            <TAQueueDetailButtons
              courseId={cid}
              queueId={qid}
              question={question}
              hasUnresolvedRephraseAlert={false}
            />
          </Col>
        )}
      </CenterRow>
    </HorizontalStudentCard>
  )
}
