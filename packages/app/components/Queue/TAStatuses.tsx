import { Question } from '@koh/common'
import { Badge, Col, Row } from 'antd'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { useQuestions } from '../../hooks/useQuestions'
import { useQueue } from '../../hooks/useQueue'
import { formatWaitTime } from '../../utils/TimeUtil'
import { KOHAvatar } from '../common/SelfAvatar'
import { RenderEvery } from '../RenderEvery'

interface StatusRowProps {
  queueId: number
}
/**
 * Row of ta statuses
 */
export function TAStatuses({ queueId }: StatusRowProps): ReactElement {
  const { questions } = useQuestions(queueId)
  const {
    queue: { staffList },
  } = useQueue(queueId)
  if (!questions) {
    return null
  }

  const taToQuestion: Record<number, Question> = {}
  const taIds = staffList.map((t) => t.id)
  const helpingQuestions = questions.questionsGettingHelp
  const groups = questions.groups
  for (const question of helpingQuestions) {
    if (taIds.includes(question.taHelped?.id)) {
      taToQuestion[question.taHelped.id] = question
    }
  }

  return (
    <Col className="mb-3 sm:mb-0">
      {staffList.map((ta) => (
        <Col key={ta.id}>
          <StatusCard
            taName={ta.name}
            taPhotoURL={ta.photoURL}
            studentName={taToQuestion[ta.id]?.creator?.name}
            helpedAt={taToQuestion[ta.id]?.helpedAt}
            grouped={groups.some((g) => g.creator.id === ta.id)}
          />
        </Col>
      ))}
    </Col>
  )
}

const StyledCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  padding: 16px;
  display: flex;
  margin-bottom: 16px;

  /* decrease margins and padding on mobile */
  @media (max-width: 650px) {
    padding: 12px;
    margin-bottom: 8px;
  }
`

const CardContent = styled.div`
  margin-left: 16px;
  flex-grow: 1;
`
const TAName = styled.div`
  font-weight: bold;
  color: #212934;
`
const HelpingInfo = styled.div`
  margin-top: 5px;
  font-style: italic;
`

interface StatusCardProps {
  taName: string
  taPhotoURL: string
  studentName?: string
  helpedAt?: Date
  grouped?: boolean
}
/**
 * View component just renders TA status
 */
function StatusCard({
  taName,
  taPhotoURL,
  studentName,
  helpedAt,
  grouped,
}: StatusCardProps): ReactElement {
  const isBusy = !!helpedAt
  return (
    <StyledCard data-cy="ta-status-card">
      <KOHAvatar
        size={48}
        name={taName}
        photoURL={taPhotoURL}
        style={{ flexShrink: 0 }}
      />
      <CardContent>
        <Row justify="space-between">
          <TAName>{taName}</TAName>
          <span>
            <Badge status={isBusy ? 'processing' : 'success'} />
            {isBusy ? 'Busy' : 'Available'}
          </span>
        </Row>
        <HelpingInfo>
          {grouped ? (
            'Helping a group'
          ) : isBusy ? (
            <HelpingFor studentName={studentName} helpedAt={helpedAt} />
          ) : (
            'Looking for my next student...'
          )}
        </HelpingInfo>
      </CardContent>
    </StyledCard>
  )
}

const BlueSpan = styled.span`
  color: #66a3d6;
`
interface HelpingForProps {
  studentName: string
  helpedAt: Date
}
function HelpingFor({ studentName, helpedAt }: HelpingForProps): ReactElement {
  return (
    <RenderEvery
      render={() => (
        <span>
          Helping <BlueSpan>{studentName ?? 'a student'}</BlueSpan> for{' '}
          <BlueSpan>
            {formatWaitTime((Date.now() - helpedAt.getTime()) / 60000)}
          </BlueSpan>
        </span>
      )}
      interval={60 * 1000}
    />
  )
}
