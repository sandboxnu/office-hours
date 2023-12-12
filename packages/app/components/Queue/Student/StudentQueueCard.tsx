import { Question } from '@koh/common'
import { Card, Col, Tooltip } from 'antd'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { getWaitTime } from '../../../utils/TimeUtil'
import { CenterRow, Text } from '../QueueCardSharedComponents'
import { truncate } from '../QueueUtils'
import TAQueueDetailButtons from '../TA/TAQueueDetailButtons'
import { KOHAvatar } from '../../common/SelfAvatar'
import HotnessBar from './HotnessBar'

const HorizontalStudentCard = styled(Card)`
  margin-bottom: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  border-radius: 6px;
  padding-left: 8px;
  padding-right: 8px;
  color: #595959;
  .ant-card-body {
    padding: 10px 8px;
  }
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
        <Col flex="0 1 auto" style={{ margin: '0 6px 0 0' }}>
          <HotnessBar hotness={Math.floor(Math.random() * 101)} />
        </Col>
        <Col flex="0 1 auto" style={{ margin: '0 12px 0 0' }}>
          <KOHAvatar
            size={46}
            name={question.creator.name}
            photoURL={question.creator.photoURL}
          />
        </Col>
        <Col flex="1 1">
          <Tooltip // only show tooltip if text is too long
            title={question.text.length > 110 ? question.text : ''}
            overlayStyle={{ maxWidth: '60em' }}
          >
            <Text
              style={
                {
                  // shorten question text dynamically
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  maxWidth: '55em',
                } as React.CSSProperties
              }
            >
              {question.text}
            </Text>
          </Tooltip>
          <Text
            style={
              // question creator name
              {
                fontSize: 'smaller',
                color: '#595959',
                display: 'inline-block',
                marginTop: '2px',
                marginRight: '5px',
                fontStyle: 'italic',
                minWidth: '120px',
              } as React.CSSProperties
            }
          >
            {truncate(question.creator.name, 25)}
          </Text>
          <div //tag for question type
            style={{
              backgroundColor: 'lightblue',
              borderRadius: '15px',
              padding: '0px 7px',
              marginTop: '2px',
              display: 'inline-block',
            }}
          >
            <Text style={{ fontSize: 'smaller' }}>{question.questionType}</Text>{' '}
            {/* Decreased text size */}
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
