import { ArrowLeftOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Question, RephraseQuestionPayload } from '@koh/common'
import { useWindowWidth } from '@react-hook/window-size'
import { Button, Skeleton, Tooltip } from 'antd'
import Link from 'next/link'
import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'
import { useProfile } from '../../../hooks/useProfile'
import { useQuestions } from '../../../hooks/useQuestions'
import { SettingsOptions } from '../../Settings/SettingsPage'
import EmptyGroupList from './QuestionGrouping/EmptyGroupList'
import TAGroupDetail from './QuestionGrouping/TAGroupDetail'
import TAQueueDetail from './TAQueueDetail'
import TAQueueListSection from './TAQueueListSection'
import { useHotkeys } from 'react-hotkeys-hook'

// The min screen width at which the list and detail become side-by-side
const SPLIT_DETAIL_BKPT = 900

const Container = styled.div`
  flex: 1;

  background: white;
  border: 1px solid #cfd6de;
  margin-bottom: 30px;

  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    border: none;
    border-left: 1px solid #cfd6de;
    margin-bottom: 0px;
    display: flex;
    flex-direction: row;
    min-height: calc(
      100vh - 46px - 67px
    ); // - (height of footer) - (height of navbar)
  }
`

const List = styled.div`
  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    width: 320px;
    overflow-y: scroll;
  }
`

const PriorityQueueQuestionBubble = styled(QuestionCircleOutlined)`
  margin-right: 8px;
`

const Detail = styled.div`
  border-left: 1px solid #cfd6de;
  border-right: 1px solid #cfd6de;
  flex: 1;
  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    overflow-y: scroll;
  }
`

const BackToQueue = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  color: #1890ff;
  cursor: pointer;
`

/**
 * List and detail panel of the TA queue
 */
export default function TAQueueListDetail({
  queueId,
  courseId,
}: {
  queueId: number
  courseId: number
}): ReactElement {
  const user = useProfile()
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(null)
  const { questions } = useQuestions(queueId)
  const [isGrouping, setIsGrouping] = useState<boolean>(false)
  const isSideBySide = useWindowWidth() >= SPLIT_DETAIL_BKPT

  const onSelectQuestion = (qId: number) => {
    setSelectedQuestionId(qId)
    setIsGrouping(false)
  }
  const helpingQuestions = questions?.questionsGettingHelp?.filter(
    (q) => q.taHelped.id === user.id,
  )
  const myGroup = questions?.groups.find(
    (group) => group.creator.id === user.id,
  )
  const groupedQuestions = myGroup ? myGroup.questions : []
  const allQuestionsList: Question[] = questions
    ? [
        ...helpingQuestions,
        ...questions.queue,
        ...questions.priorityQueue,
        ...questions.groups.flatMap((e) => e.questions),
      ]
    : []
  const selectedQuestion = allQuestionsList.find(
    (q) => q.id === selectedQuestionId,
  )
  const navigateQuestions = (isUp: boolean) => {
    const priorityAndWaitingQuestionIds = [
      ...questions.priorityQueue,
      ...questions.queue,
    ].map((question) => question.id)
    const numOfQuestions = priorityAndWaitingQuestionIds.length
    if (numOfQuestions > 0) {
      setSelectedQuestionId((prevId) => {
        const addMinus = isUp ? -1 : 1
        const qIdIndex = priorityAndWaitingQuestionIds.indexOf(prevId)
        const modulusMagic =
          (((qIdIndex + addMinus) % numOfQuestions) + numOfQuestions) %
          numOfQuestions
        return priorityAndWaitingQuestionIds[prevId ? modulusMagic : 0]
      })
    }
  }

  useHotkeys('up', () => navigateQuestions(true), [questions])
  useHotkeys('down', () => navigateQuestions(false), [questions])

  const hasUnresolvedRephraseAlert = questions?.unresolvedAlerts
    ?.map((payload) => (payload as RephraseQuestionPayload).questionId)
    .includes(selectedQuestionId)
  // set currentQuestion to null if it no longer exists in the queue
  if (selectedQuestionId && !selectedQuestion) {
    onSelectQuestion(null)
  }
  // set current question to first helping question if none is selected (used when help next is clicked)
  if (!selectedQuestionId && helpingQuestions.length) {
    onSelectQuestion(helpingQuestions[0].id)
  }

  if (!questions) {
    return <Skeleton />
  }

  if (allQuestionsList.length === 0) {
    return (
      <EmptyQueueInfo>
        <NoQuestionsText>There are no questions in the queue</NoQuestionsText>
        {!user.phoneNotifsEnabled && !user.desktopNotifsEnabled && (
          <NotifReminderButton courseId={courseId} />
        )}
      </EmptyQueueInfo>
    )
  }
  const list = (
    <List>
      <div data-cy="list-helping">
        <TAQueueListSection
          title={'Currently Helping'}
          questions={helpingQuestions}
          onClickQuestion={onSelectQuestion}
          selectedQuestionId={selectedQuestionId}
        />
      </div>
      <div data-cy="list-group">
        <TAQueueListSection
          title="Group Students"
          questions={groupedQuestions}
          onClickQuestion={() => {
            setIsGrouping(true)
            setSelectedQuestionId(null)
          }}
          collapsible
          emptyDisplay={
            <EmptyGroupList
              onClick={() => {
                setIsGrouping(true)
                setSelectedQuestionId(null)
              }}
            />
          }
        />
      </div>
      <div data-cy="list-priority">
        <TAQueueListSection
          title={
            <span>
              <Tooltip title="Students in the priority queue were at the top of the queue before for some reason (e.g. they were at the top but AFK, or a TA helped them previously, and then hit 'requeue student.' You should communicate with your fellow staff members to prioritize these students first.">
                <PriorityQueueQuestionBubble />
              </Tooltip>
              Priority Queue
            </span>
          }
          questions={questions.priorityQueue}
          onClickQuestion={onSelectQuestion}
          selectedQuestionId={selectedQuestionId}
          collapsible
        />
      </div>
      <div data-cy="list-queue">
        <TAQueueListSection
          title="Waiting In Line"
          questions={questions.queue}
          onClickQuestion={onSelectQuestion}
          selectedQuestionId={selectedQuestionId}
          collapsible
          showNumbers
        />
      </div>
    </List>
  )
  const detail = (
    <Detail>
      {selectedQuestion && (
        <TAQueueDetail
          courseId={courseId}
          queueId={queueId}
          question={selectedQuestion}
          hasUnresolvedRephraseAlert={hasUnresolvedRephraseAlert}
        />
      )}
      {isGrouping && (
        <TAGroupDetail
          courseId={courseId}
          queueId={queueId}
          groupCreator={user}
        />
      )}
    </Detail>
  )

  if (isSideBySide) {
    return (
      <Container>
        {list}
        {detail}
      </Container>
    )
  } else if (selectedQuestionId) {
    return (
      <Container>
        <BackToQueue onClick={() => onSelectQuestion(null)}>
          <span>
            <ArrowLeftOutlined />
            {' Back To Queue'}
          </span>
        </BackToQueue>
        {detail}
      </Container>
    )
  } else {
    return <Container>{list}</Container>
  }
}

const EmptyQueueInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`

const NoQuestionsText = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #212934;
`

const NotifRemindButton = styled(Button)`
  margin-top: 16px;
  border-radius: 6px;
  background: #fff;
`

function NotifReminderButton({ courseId }: { courseId: number }) {
  return (
    <>
      <Link
        href={{
          pathname: '/settings',
          query: { cid: courseId, defaultPage: SettingsOptions.NOTIFICATIONS },
        }}
      >
        <NotifRemindButton>Sign Up for Notifications</NotifRemindButton>
      </Link>
    </>
  )
}
