import { Question } from '@koh/common'
import { Card, Col, Tooltip } from 'antd'
import { ReactElement } from 'react'
import { getWaitTime } from '../../../utils/TimeUtil'
import { truncate } from '../Shared/QueueUtils'
import TAQueueDetailButtons from './TAQueueDetailButtons'
import { QuestionType } from '../Shared/QuestionType'
import { KOHAvatar } from '../../common/SelfAvatar'
import HotnessBar from '../Shared/HotnessBar'
import {
  HorizontalStudentCard,
  Text,
  CenterRow,
} from '../Shared/SharedComponents'

interface StudentQueueCardProps {
  question: Question
  cid: number
  qid: number
  isStaff: boolean
}

export default function StudentQueueCard({
  question,
  cid,
  qid,
  isStaff,
}: StudentQueueCardProps): ReactElement {
  return (
    <HorizontalStudentCard>
      <CenterRow>
        {/* Temporary removal of hotness bar
        <Col flex="0 1 auto" style={{ margin: '0 6px 0 0' }}>
          <HotnessBar hotness={Math.floor(Math.random() * 101)} />
        </Col> */}
        {isStaff && ( // only show avatar if staff for now. TODO: fix endpoint to allow queues to access student avatars and names if prof enabled it
          <Col flex="0 1 auto" style={{ margin: '0 12px 0 0' }}>
            <KOHAvatar
              size={46}
              name={question.creator.name}
              photoURL={question.creator.photoURL}
            />
          </Col>
        )}
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
          {isStaff && (
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
              {question.creator.name}
            </Text>
          )}

          {question.questionTypes?.map((questionType, index) => (
            <QuestionType
              key={index}
              typeName={questionType.name}
              typeColor={questionType.color}
            />
          ))}
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
