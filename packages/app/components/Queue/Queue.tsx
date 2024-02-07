import { ReactElement, useCallback, useState } from 'react'
import { useQueue } from '../../hooks/useQueue'
import { useQuestions } from '../../hooks/useQuestions'
import { useProfile } from '../../hooks/useProfile'
import {
  AddQuestionTypeParams,
  ClosedQuestionStatus,
  ERROR_MESSAGES,
  LimboQuestionStatus,
  OpenQuestionStatus,
  Question,
  QuestionStatusKeys,
  Role,
} from '@koh/common'
import { useTAInQueueInfo } from '../../hooks/useTAInQueueInfo'
import { useCourse } from '../../hooks/useCourse'
import {
  QueueInfoColumn,
  QueueInfoColumnButton,
} from './QueueListSharedComponents'
import { Popconfirm, Tooltip, message, notification } from 'antd'
import TACheckinButton from '../Today/TACheckinButton'
import styled from 'styled-components'
import { useStudentQuestion } from '../../hooks/useStudentQuestion'
import { API } from '@koh/api-client'
import { useRoleInCourse } from '../../hooks/useRoleInCourse'
import CantFindModal from './Student/StudentCantFindModal'
import StudentRemovedFromQueueModal from './Student/StudentRemovedFromQueueModal'
import StudentQueueCard from './Student/StudentQueueCard'
import StudentBanner from './Student/StudentBanner'
import { mutate } from 'swr'
import QuestionForm from './Student/QuestionForm'
import { useDraftQuestion } from '../../hooks/useDraftQuestion'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { AddStudentsModal } from './TA/TAAddStudent'
import { EditQueueModal } from './TA/EditQueueModal'
import PropTypes from 'prop-types'
import { EditOutlined, LoginOutlined, PlusOutlined } from '@ant-design/icons'

const EditQueueButton = styled(QueueInfoColumnButton)`
  color: #212934;
`

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  @media (min-width: 650px) {
    margin-top: 0;
    flex-direction: row;
    height: 100%;
  }
`

const QueueListContainer = styled.div`
  flex-grow: 1;
  @media (min-width: 650px) {
    margin-top: 32px;
  }
`

const JoinButton = styled(QueueInfoColumnButton)`
  background-color: #3684c6;
  color: white;
  align-items: center;
  display: flex;
`

const VerticalDivider = styled.div`
  @media (min-width: 650px) {
    border-right: 1px solid #cfd6de;
    margin: 0 16px;
  }
  @media (min-width: 1000px) {
    margin: 0 32px;
  }
`

const PopConfirmTitle = styled.div`
  max-width: 400px;
`

interface QueuePageProps {
  qid: number
  cid: number
}

export default function QueuePage({ qid, cid }: QueuePageProps): ReactElement {
  const { queue } = useQueue(qid)
  const { questions, mutateQuestions } = useQuestions(qid)
  const { isCheckedIn, isHelping } = useTAInQueueInfo(qid)
  const [queueSettingsModal, setQueueSettingsModal] = useState(false)
  const [addStudentsModal, setAddStudentsModal] = useState(false)
  const { studentQuestion, studentQuestionIndex } = useStudentQuestion(qid)
  const [showJoinPopconfirm, setShowJoinPopconfirm] = useState(false)
  const profile = useProfile()
  const { course } = useCourse(cid)
  const [popupEditQuestion, setPopupEditQuestion] = useState(false)
  const role = useRoleInCourse(cid)
  const { deleteDraftQuestion } = useDraftQuestion()
  const [isJoining, setIsJoining] = useState(
    questions &&
      studentQuestion &&
      studentQuestion?.status !== OpenQuestionStatus.Queued,
  )
  const [isFirstQuestion, setIsFirstQuestion] = useLocalStorage(
    'isFirstQuestion',
    true,
  )

  const helpingQuestions = questions?.questionsGettingHelp?.filter(
    (q) => q.taHelped.id === profile.id,
  )

  const nextQuestion =
    questions?.priorityQueue[0] || // gets the first item of priority queue if it exists
    questions?.queue?.find(
      (question) => question.status === QuestionStatusKeys.Queued,
    )

  const staffCheckedIntoAnotherQueue = course?.queues.some(
    (q) =>
      q.id !== qid &&
      q.staffList.some((staffMember) => staffMember.id === profile?.id),
  )

  let isStaff = false
  profile.courses.forEach((course) => {
    if (
      course.course.id === cid &&
      (course.role === Role.PROFESSOR || course.role === Role.TA)
    ) {
      isStaff = true
    }
  })

  const studentQuestionId = studentQuestion?.id
  const studentQuestionStatus = studentQuestion?.status

  const leaveQueue = useCallback(async () => {
    await API.questions.update(studentQuestionId, {
      status: ClosedQuestionStatus.ConfirmedDeleted,
    })

    setIsJoining(false)
    await mutateQuestions()
  }, [mutateQuestions, studentQuestionId])

  const rejoinQueue = useCallback(async () => {
    await API.questions.update(studentQuestionId, {
      status: OpenQuestionStatus.Queued,
    })
    await mutateQuestions()
  }, [mutateQuestions, studentQuestionId])

  const joinQueueAfterDeletion = useCallback(async () => {
    await API.questions.update(studentQuestion?.id, {
      status: ClosedQuestionStatus.ConfirmedDeleted,
    })
    await mutateQuestions()
    const newQuestion = await API.questions.create({
      text: studentQuestion.text,
      questionTypes: studentQuestion?.questionTypes ?? [],
      queueId: qid,
      location: studentQuestion?.location,
      force: true,
      groupable: false,
    })
    await API.questions.update(newQuestion.id, {
      status: OpenQuestionStatus.Queued,
    })
    await mutateQuestions()
  }, [mutateQuestions, qid, studentQuestion])

  async function onHelpQuestion(questionId: number): Promise<void> {
    try {
      await API.questions.update(questionId, {
        status: OpenQuestionStatus.Helping,
      })
    } catch (e) {
      if (
        e.response?.status === 401 &&
        e.response?.data?.message ===
          ERROR_MESSAGES.questionController.updateQuestion.otherTAHelping
      ) {
        notification.open({
          message: 'Another TA is currently helping the student',
          description:
            'This happens when another TA clicks help at the exact same time',
          type: 'error',
          duration: 3,
          className: 'hide-in-percy',
          style: {
            width: 450,
          },
        })
      }
    }
  }

  const joinQueueOpenModal = useCallback(
    async (force: boolean) => {
      try {
        const createdQuestion = await API.questions.create({
          queueId: Number(qid),
          text: '',
          force: force,
          questionTypes: null,
          groupable: false,
        })
        const newQuestionsInQueue = [...questions?.queue, createdQuestion]
        await mutateQuestions({ ...questions, queue: newQuestionsInQueue })
        setPopupEditQuestion(true)
        return true
      } catch (e) {
        if (
          e.response?.data?.message?.includes(
            ERROR_MESSAGES.questionController.createQuestion.oneQuestionAtATime,
          )
        ) {
          return false
        }
        message.error(e.response?.data?.message)
        return true
      }
    },
    [mutateQuestions, qid, questions],
  )

  const openEditModal = useCallback(async () => {
    mutate(`/api/v1/queues/${qid}/questions`)
    setPopupEditQuestion(true)
  }, [qid])

  const closeEditModal = useCallback(() => {
    console.log('closeEditModal')
    setPopupEditQuestion(false)
    setIsJoining(false)
  }, [])

  const leaveQueueAndClose = useCallback(() => {
    //delete draft when they leave the queue
    deleteDraftQuestion()
    leaveQueue()
    closeEditModal()
  }, [deleteDraftQuestion, leaveQueue, closeEditModal])

  const finishQuestion = useCallback(
    async (
      text: string,
      questionTypes: AddQuestionTypeParams[],
      groupable: boolean,
      location: string,
    ) => {
      const updateStudent = {
        text,
        questionTypes,
        groupable: false, //temporary
        status:
          studentQuestionStatus === OpenQuestionStatus.Drafting
            ? OpenQuestionStatus.Queued
            : studentQuestionStatus,
        location,
      }

      const updatedQuestionFromStudent = await API.questions.update(
        studentQuestionId,
        updateStudent,
      )

      const newQuestionsInQueue = questions?.queue?.map((question: Question) =>
        question.id === studentQuestionId
          ? updatedQuestionFromStudent
          : question,
      )

      // questions are the old questions and newQuestionsInQueue are questions that've been added since.
      mutateQuestions({
        ...questions,
        yourQuestion: updatedQuestionFromStudent,
        queue: newQuestionsInQueue,
      })
    },
    [studentQuestionStatus, studentQuestionId, questions, mutateQuestions],
  )

  const finishQuestionAndClose = useCallback(
    (
      text: string,
      qt: AddQuestionTypeParams[],
      groupable: false,
      router: Router,
      cid: number,
      location: string,
    ) => {
      deleteDraftQuestion()
      finishQuestion(text, qt, groupable, location)
      closeEditModal()
      if (isFirstQuestion) {
        notification.warn({
          style: { cursor: 'pointer' },
          message: 'Enable Notifications',
          className: 'hide-in-percy',
          description:
            "Turn on notifications for when it's almost your turn to get help.",
          placement: 'bottomRight',
          duration: 0,
          onClick: () => {
            notification.destroy()
            setIsFirstQuestion(false)
            router.push(`/settings?cid=${cid}`)
          },
        })
      }
    },
    [
      deleteDraftQuestion,
      finishQuestion,
      closeEditModal,
      isFirstQuestion,
      setIsFirstQuestion,
    ],
  )

  function RenderQueueInfoCol(): ReactElement {
    return isStaff ? (
      <QueueInfoColumn
        queueId={qid}
        isStaff={true}
        buttons={
          <>
            <Tooltip
              title={queue.isDisabled && 'Cannot check into a disabled queue!'}
            >
              <TACheckinButton
                courseId={cid}
                room={queue?.room}
                disabled={
                  staffCheckedIntoAnotherQueue ||
                  isHelping ||
                  (queue.isProfessorQueue && role !== Role.PROFESSOR) ||
                  queue.isDisabled
                }
                state={isCheckedIn ? 'CheckedIn' : 'CheckedOut'}
                className="w-1/3 sm:w-full"
              />
            </Tooltip>
            <EditQueueButton
              data-cy="editQueue"
              onClick={() => setQueueSettingsModal(true)}
              icon={<EditOutlined />}
            >
              {/* only show the "Details" part on desktop to keep button small on mobile */}
              <span>
                Edit Queue <span className="hidden sm:inline">Details</span>
              </span>
            </EditQueueButton>
            <EditQueueButton
              data-cy="addStudents"
              disabled={!isCheckedIn}
              onClick={() => setAddStudentsModal(true)}
              icon={<PlusOutlined />}
            >
              {/* "+ Add Students to Queue" on desktop, "+ Students" on mobile */}
              <span>
                <span className="hidden sm:inline">Add</span> Students{' '}
                <span className="hidden sm:inline">to Queue</span>
              </span>
            </EditQueueButton>
          </>
        }
      />
    ) : (
      <QueueInfoColumn
        queueId={qid}
        isStaff={false}
        buttons={
          !studentQuestion && (
            <Popconfirm
              title={
                <PopConfirmTitle>
                  You already have a question in a queue for this course, so
                  your previous question will be deleted in order to join this
                  queue. Do you want to continue?
                </PopConfirmTitle>
              }
              onConfirm={() => joinQueueOpenModal(true)}
              okText="Yes"
              cancelText="No"
              disabled
              visible={showJoinPopconfirm}
              onVisibleChange={setShowJoinPopconfirm}
            >
              <JoinButton
                type="primary"
                disabled={!queue?.allowQuestions || queue?.isDisabled}
                data-cy="join-queue-button"
                onClick={async () =>
                  setShowJoinPopconfirm(!(await joinQueueOpenModal(false)))
                }
                icon={<LoginOutlined />}
              >
                Join Queue
              </JoinButton>
            </Popconfirm>
          )
        }
      />
    )
  }
  const QueueHeader = styled.h2`
    font-weight: 500;
    font-size: 24px;
    color: #212934;
    margin-bottom: 0.25em;
  `

  const NoQuestionsText = styled.div`
    font-weight: 500;
    font-size: 24px;
    color: #212934;
  `
  interface QueueProps {
    questions: Question[]
  }

  function RenderQueueQuestions({ questions }: QueueProps) {
    return (
      <div data-cy="queueQuestions">
        {questions?.length === 0 ? (
          <NoQuestionsText>There are no questions in the queue</NoQuestionsText>
        ) : (
          <>
            {/* only show this queue header on desktop */}
            <QueueHeader className="hidden sm:block">Queue</QueueHeader>
            {/* <StudentHeaderCard bordered={false}>
              <CenterRow>
                <Col flex="1 1">
                  <HeaderText>question</HeaderText>
                </Col>
                <Col flex="0 0 80px">
                  <HeaderText>wait</HeaderText>
                </Col>
              </CenterRow>
            </StudentHeaderCard> */}
          </>
        )}
        {questions?.map((question: Question, index: number) => {
          const background_color =
            question.id === studentQuestionId ? 'bg-teal-200/25' : 'bg-white'
          return (
            <StudentQueueCard
              key={question.id}
              rank={index + 1}
              question={question}
              cid={cid}
              qid={qid}
              isStaff={isStaff}
              className={background_color}
            />
          )
        })}
      </div>
    )
  }

  return (
    <>
      <Container>
        <RenderQueueInfoCol />
        <VerticalDivider />
        <QueueListContainer>
          {isStaff && helpingQuestions && helpingQuestions.length > 0 ? (
            <>
              <QueueHeader>You are Currently Helping</QueueHeader>

              {helpingQuestions?.map((question: Question, index: number) => {
                return (
                  <StudentQueueCard
                    key={question.id}
                    rank={index + 1}
                    question={question}
                    cid={cid}
                    qid={qid}
                    isStaff={isStaff}
                  />
                )
              })}
            </>
          ) : (
            <>
              <StudentBanner
                queueId={qid}
                editQuestion={openEditModal}
                leaveQueue={leaveQueue}
              />
            </>
          )}
          <RenderQueueQuestions questions={questions?.queue} />
        </QueueListContainer>
      </Container>
      {isStaff ? (
        <>
          <EditQueueModal
            queueId={qid}
            visible={queueSettingsModal}
            onClose={() => setQueueSettingsModal(false)}
          />
          <AddStudentsModal
            queueId={qid}
            visible={addStudentsModal}
            onClose={() => setAddStudentsModal(false)}
          />
        </>
      ) : (
        <>
          <QuestionForm
            visible={
              (questions && !studentQuestion && isJoining) ||
              // && studentQuestion.status !== QuestionStatusKeys.Drafting)
              popupEditQuestion
            }
            question={studentQuestion}
            leaveQueue={leaveQueueAndClose}
            finishQuestion={finishQuestionAndClose}
            position={studentQuestionIndex + 1}
            cancel={closeEditModal}
          />
          <CantFindModal
            visible={studentQuestion?.status === LimboQuestionStatus.CantFind}
            leaveQueue={leaveQueue}
            rejoinQueue={rejoinQueue}
          />
          <StudentRemovedFromQueueModal
            question={studentQuestion}
            leaveQueue={leaveQueue}
            joinQueue={joinQueueAfterDeletion}
          />
        </>
      )}
    </>
  )
}

QueuePage.propTypes = {
  questions: PropTypes.shape({
    queue: PropTypes.arrayOf(PropTypes.instanceOf(Question)),
  }),
}
