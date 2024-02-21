import { Question } from '@koh/common'
import { Card, Col, Tooltip } from 'antd'
import { ReactElement } from 'react'
import { getWaitTime } from '../../../utils/TimeUtil'
import { CenterRow, Text } from '../../Questions/Shared/SharedComponents'
import TAQueueDetailButtons from '../../Questions/Queue/TAQueueDetailButtons'
import { QuestionType } from '../../Questions/Shared/QuestionType'
import { KOHAvatar } from '../../common/SelfAvatar'
import styled from 'styled-components'
//import HotnessBar from '../../Shared/HotnessBar/HotnessBar'

const HorizontalStudentCard = styled(Card)`
  margin-bottom: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  padding-left: 8px;
  padding-right: 8px;
  color: #595959;
  .ant-card-body {
    padding: 10px 8px;

    @media (max-width: 650px) {
      padding: 10px 0px;
    }
  }
`

interface StudentQueueCardProps {
  question: Question
  cid: number
  qid: number
  isStaff: boolean
  className?: string // used to highlight questions or add other classes
}

export default function StudentQueueCard({
  question,
  cid,
  qid,
  isStaff,
  className,
}: StudentQueueCardProps): ReactElement {
  return (
    <HorizontalStudentCard className={className}>
      <CenterRow>
        {/* Temporary removal of hotness bar
        <Col flex="0 1 auto" style={{ margin: '0 6px 0 0' }}>
          <HotnessBar hotness={Math.floor(Math.random() * 101)} />
        </Col> */}
        {isStaff && ( // only show avatar if staff for now. TODO: fix endpoint to allow queues to access student avatars and names if prof enabled it
          <Col flex="0 1 auto" className="mr-2">
            <KOHAvatar
              size={46}
              name={question.creator.name}
              photoURL={question.creator.photoURL}
            />
          </Col>
        )}
        <Col flex="1 1">
          <Tooltip // only show tooltip if text is too long TODO: replace with expand card details feature
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
          <Col className="w-full sm:w-auto">
            <TAQueueDetailButtons
              courseId={cid}
              queueId={qid}
              question={question}
              hasUnresolvedRephraseAlert={false}
              className="flex items-center justify-around sm:block"
            />
          </Col>
        )}
      </CenterRow>
    </HorizontalStudentCard>
  )
}
