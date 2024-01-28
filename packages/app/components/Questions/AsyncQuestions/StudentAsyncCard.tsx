import { AsyncQuestion, Question } from '@koh/common'
import { Card, Col, Tooltip } from 'antd'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { getAsyncWaitTime, getWaitTime } from '../../../utils/TimeUtil'
import { CenterRow, Text } from '../Shared/SharedComponents'
import { truncate } from '../Shared/QueueUtils'
import { QuestionType } from '../Shared/QuestionType'
import { KOHAvatar } from '../../common/SelfAvatar'
import HotnessBar from '../Shared/HotnessBar'

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

interface StudentAsyncCardProps {
  question: AsyncQuestion
  cid: number
  qid: number
  isStaff: boolean
}

export default function StudentAsyncCard({
  question,
  cid,
  qid,
  isStaff,
}: StudentAsyncCardProps): ReactElement {
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
          <h4>{question.questionAbstract}</h4>
          <Tooltip // only show tooltip if text is too long
            title={
              question.questionText.length > 110 ? question.questionText : ''
            }
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
              {question.questionText}
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
          <Text>{getAsyncWaitTime(question)}</Text>
        </Col>
        {/* {isStaff && (
          <Col>
            <TAQueueDetailButtons
              courseId={cid}
              queueId={qid}
              question={question}
              hasUnresolvedRephraseAlert={false}
            />
          </Col>
        )} */}
      </CenterRow>
    </HorizontalStudentCard>
  )
}
