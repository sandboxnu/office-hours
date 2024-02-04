import { NotificationOutlined, StopOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Divider,
  Input,
  Row,
  Skeleton,
  Space,
  Tag,
  Tooltip,
} from 'antd'
import Linkify from 'react-linkify'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'
import { QueuePartial } from '../../../common/index'
import { KOHAvatar } from '../common/SelfAvatar'

type QueueCard = {
  queue: QueuePartial
  isTA: boolean
  updateQueueNotes: (queue: QueuePartial, queueNotes: string) => Promise<void>
}

const PaddedCard = styled(Card)`
  margin-top: 32px;
  margin-bottom: 25px;
  border-radius: 6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
`

const HeaderDiv = styled.div`
  font-size: 14px;
  color: #212934;
`

const QueueInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const RightQueueInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const QueueInfoTags = styled.div`
  display: flex;
`

const QuestionNumberSpan = styled.span`
  font-size: 18px;
`

const QueueSizeSpan = styled.span`
  font-size: 18px;
`

const HeaderText = styled.div`
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: #bfbfbf;
  font-variant: small-caps;
  margin-bottom: 8px;
`

const OpenQueueButton = styled(Button)`
  border-radius: 6px;
  font-size: 14px;
  margin-left: 16px;
`

const EditNotesButton = styled(Button)`
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
`

const SaveButton = styled(Button)`
  background: #2a9187;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  font-size: 14px;
`

const NotesDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  margin: 10px 10px auto 0;
`

const RightQueueNotesRow = styled.div`
  display: flex;
`
const NotesInput = styled(Input.TextArea)`
  border-radius: 6px;
  border: 1px solid #b8c4ce;
  //display: flex;
  //flex-grow: 1;
  margin: auto 0px auto 10px;
`

const Notes = styled.div`
  overflow-wrap: break-word;
  white-space: pre-wrap;
`

const StyledKOHAvatar = styled(KOHAvatar)`
  margin-right: 1rem;
`

const QueueCardButtonRow = styled(Row)`
  padding-top: 10px;
`

const QueueCardDivider = styled(Divider)`
  margin-top: 12px;
  margin-bottom: 0;
`

const NotesSkeleton = styled(Skeleton)`
  width: 60%;
`

const QueueCard = ({
  queue,
  isTA,
  updateQueueNotes,
}: QueueCard): ReactElement => {
  const [editingNotes, setEditingNotes] = useState(false)
  const [updatedNotes, setUpdatedNotes] = useState(queue.notes)
  const router = useRouter()
  const { cid } = router.query

  const staffList = queue.staffList

  const handleUpdate = () => {
    setEditingNotes(false)
    updateQueueNotes(queue, updatedNotes)
  }
  return (
    <PaddedCard
      headStyle={{
        background: queue.isOpen ? '#25426C' : '#25426cbf',
        color: '#FFFFFF',
        borderRadius: '6px 6px 0 0',
      }}
      // make the card glow if there are staff members in the queue
      className={
        'open-queue-card ' + (queue.staffList.length >= 1 ? 'glowy' : '')
      }
      title={
        <span>
          {queue.room}{' '}
          <QueueInfoTags>
            {queue?.isProfessorQueue && (
              <Tag color="#337589" style={{ margin: 0 }}>
                Professor Queue
              </Tag>
            )}
            {queue.isOpen && !queue.allowQuestions && (
              <Tooltip title="This queue is no longer accepting questions">
                <Tag
                  icon={<StopOutlined />}
                  color="#6C2526"
                  style={{ margin: 0 }}
                >
                  Not Accepting Questions
                </Tag>
              </Tooltip>
            )}
          </QueueInfoTags>{' '}
        </span>
      }
      extra={
        <span>
          <QueueSizeSpan>{queue.queueSize}</QueueSizeSpan> in queue
        </span>
      }
    >
      <QueueInfoRow>
        <HeaderDiv>
          <QuestionNumberSpan>{queue.staffList.length}</QuestionNumberSpan>{' '}
          staff checked in
        </HeaderDiv>
        <RightQueueInfoRow>
          <Space direction="vertical" align="end" size="middle">
            <Link
              href="/course/[cid]/queue/[qid]"
              as={`/course/${cid}/queue/${queue.id}`}
            >
              <OpenQueueButton
                size="large"
                data-cy="open-queue-button"
                type={(queue.staffList.length >= 1 ? 'primary' : 'secondary')}
              >
                Open Queue ＞
              </OpenQueueButton>
            </Link>
          </Space>
        </RightQueueInfoRow>
      </QueueInfoRow>
      {
        staffList.length > 1 && (
          <HeaderText>checked-in staff</HeaderText>
        ) /*todo: add better text*/
      }

      <Row justify="space-between" align="middle">
        <div>
          {staffList.map((staffMember) => (
            <Tooltip key={staffMember.id} title={staffMember.name}>
              <StyledKOHAvatar
                size={48}
                photoURL={staffMember.photoURL}
                name={staffMember.name}
              />
            </Tooltip>
          ))}
        </div>
        <QueueCardDivider />
        {editingNotes ? (
          <NotesDiv>
            <NotesInput
              defaultValue={queue.notes}
              value={updatedNotes}
              onChange={(e) => setUpdatedNotes(e.target.value as any)}
            />
          </NotesDiv>
        ) : queue.notes ? (
          <div>
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={decoratedHref}
                  key={key}
                >
                  {decoratedText}
                </a>
              )}
            >
              <Notes>
                <NotificationOutlined /> <i>{queue.notes}</i>
              </Notes>
            </Linkify>
          </div>
        ) : null}
        <RightQueueNotesRow>
          {editingNotes && (
            <SaveButton onClick={handleUpdate} size="large">
              Save Changes
            </SaveButton>
          )}
          {!editingNotes && (
            <QueueCardButtonRow>
              {isTA && (
                <EditNotesButton
                  size="large"
                  onClick={() => {
                    setEditingNotes(true)
                  }}
                >
                  Edit Notes
                </EditNotesButton>
              )}
            </QueueCardButtonRow>
          )}
        </RightQueueNotesRow>
      </Row>
    </PaddedCard>
  )
}

export default QueueCard

export function QueueCardSkeleton(): ReactElement {
  return (
    <PaddedCard
      headStyle={{
        background: '#25426C',
        color: '#FFFFFF',
        borderRadius: '6px 6px 0 0',
      }}
      className={'open-queue-card'}
      title={<Skeleton title={false} paragraph={{ rows: 1 }} />}
    >
      <QueueInfoRow>
        <Skeleton title paragraph={{ rows: 0 }} />
        <Skeleton.Button size="large" />
      </QueueInfoRow>
      <Skeleton.Avatar size={96} />
      <QueueCardDivider />
      <Row justify="space-between" align="bottom">
        <NotesSkeleton title={false} paragraph={{ rows: 1 }} />
        <Skeleton.Button size="large" style={{ marginTop: '12px' }} />
      </Row>
    </PaddedCard>
  )
}
