import {
  EditOutlined,
  NotificationOutlined,
  RightOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Button, Card, Divider, Input, Row, Skeleton, Tag, Tooltip } from 'antd'
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

const CustomCard = styled(Card)`
  margin-top: 32px;
  margin-bottom: 25px;
  border-radius: 6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);

  // make the box shadow more pronounced on mobile to make it look more clickable
  @media (max-width: 650px) {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  }

  .ant-card-body {
    padding-top: 16px;
  }

  // hover effect
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.45);

    .ant-card-head {
      background: rgb(47, 76, 128) !important;
      transition: color 0.3s ease-in-out !important;
    }

    // make the green arrow right on hover (still uncertain on whether to keep this)
    .anticon.anticon-right {
      color: lightgreen;
      transition: color 0.3s ease-in-out;
    }
  }
`

const QueueInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const QueueInfoTags = styled.div`
  display: flex;
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
  color: rgb(125, 125, 125);
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
  const [isLinkEnabled, setIsLinkEnabled] = useState(true) // for enabling/disabling the link to the queue when editing notes
  const router = useRouter()
  const { cid } = router.query

  const staffList = queue.staffList

  const handleUpdate = (e) => {
    e.stopPropagation()
    setIsLinkEnabled(true)
    setEditingNotes(false)
    updateQueueNotes(queue, updatedNotes)
  }
  return (
    <Link
      href={isLinkEnabled ? '/course/[cid]/queue/[qid]' : ''}
      as={isLinkEnabled ? `/course/${cid}/queue/${queue.id}` : ''}
    >
      <CustomCard
        headStyle={{
          background: queue.isOpen ? '#25426C' : '#25426cbf',
          color: '#FFFFFF',
          borderRadius: '6px 6px 0 0',
        }}
        // make the card glow if there are staff members in the queue
        className={
          'open-queue-card' +
          (queue.staffList.length >= 1 ? ' glowy ' : '') +
          (isLinkEnabled ? ' cursor-pointer ' : '')
        }
        title={
          <span className="mr-8 flex flex-row flex-wrap items-center justify-between">
            <div>
              {queue.room}

              <QueueInfoTags>
                {queue?.isProfessorQueue && (
                  <Tag color="#337589" className="m-0 mr-1 text-gray-200">
                    Professor Queue
                  </Tag>
                )}
                {queue.isOpen && !queue.allowQuestions && (
                  <Tooltip title="This queue is no longer accepting questions">
                    <Tag
                      icon={<StopOutlined />}
                      color="#591e40"
                      className="m-0 text-gray-300"
                    >
                      Not Accepting Questions
                    </Tag>
                  </Tooltip>
                )}
              </QueueInfoTags>
            </div>
            <div className="mr-8 h-fit text-sm font-normal text-gray-200">
              <span className="text-lg font-medium">{queue.queueSize}</span> in
              queue
            </div>
          </span>
        }
        extra={<RightOutlined className=" text-3xl text-gray-100" />}
      >
        <div className="flex flex-row items-center justify-start">
          <div className=" mr-3 text-sm">
            <span className=" text-base">{queue.staffList.length} </span>
            staff checked in{queue.staffList.length > 0 ? ':' : ''}
          </div>
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
        </div>

        <Row justify="space-between" align="middle">
          <QueueCardDivider />
          {/* If notes being edited, show input box.
          Else if there are notes, show the notes.
          Else if you're a TA, show placeholder.
          Else show nothing */}
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
          ) : isTA ? (
            <i className="font-light text-gray-400"> no notes provided </i>
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
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsLinkEnabled(false)
                      setEditingNotes(true)
                    }}
                    icon={<EditOutlined />}
                  />
                )}
              </QueueCardButtonRow>
            )}
          </RightQueueNotesRow>
        </Row>
      </CustomCard>
    </Link>
  )
}

export default QueueCard

export function QueueCardSkeleton(): ReactElement {
  return (
    <CustomCard
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
    </CustomCard>
  )
}
