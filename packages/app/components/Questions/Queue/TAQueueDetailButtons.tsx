import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  PhoneOutlined,
  QuestionOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { API } from '@koh/api-client'
import {
  AlertType,
  ClosedQuestionStatus,
  LimboQuestionStatus,
  OpenQuestionStatus,
  Question,
  QuestionStatus,
  RephraseQuestionPayload,
} from '@koh/common'
import { message, Popconfirm, Tooltip } from 'antd'
import React, { ReactElement, useCallback } from 'react'
//import { useDefaultMessage } from "../../../hooks/useDefaultMessage";
import { useQuestions } from '../../../hooks/useQuestions'
import { useTAInQueueInfo } from '../../../hooks/useTAInQueueInfo'
import {
  BannerDangerButton,
  BannerOrangeButton,
  BannerPrimaryButton,
  CantFindButton,
  FinishHelpingButton,
  RequeueButton,
} from './Banner'
//import { useTeams } from "../../../hooks/useTeams";
import { useHotkeys } from 'react-hotkeys-hook'
import { useCourse } from '../../../hooks/useCourse'

const PRORITY_QUEUED_MESSAGE_TEXT =
  'This student has been temporarily removed from the queue. They must select to rejoin the queue and will then be placed at the top of the queue'

export default function TAQueueDetailButtons({
  courseId,
  queueId,
  question,
  hasUnresolvedRephraseAlert,
  className,
}: {
  courseId: number
  queueId: number
  question: Question
  hasUnresolvedRephraseAlert: boolean
  className?: string
}): ReactElement {
  //const defaultMessage = useDefaultMessage();
  const { course } = useCourse(courseId)
  const { mutateQuestions } = useQuestions(queueId)
  // const { queue }= useQueue(queueId);
  // eslint-disable-next-line prefer-const
  // let timerCheckout=useRef(null);
  const changeStatus = useCallback(
    async (status: QuestionStatus) => {
      await API.questions.update(question.id, { status })
      mutateQuestions()
      if (status === ClosedQuestionStatus.Resolved) {
        message.warning('Your Question is ended')
      }
      // if (status===LimboQuestionStatus.CantFind||status===ClosedQuestionStatus.Resolved){
      // timerCheckout.current = setTimeout(() => {
      //     message.warning("You are checked out due to inactivity");
      //     checkOutTA();
      //  }, 1000*20);
      // }
    },
    [question.id, mutateQuestions],
  )
  const { isCheckedIn, isHelping } = useTAInQueueInfo(queueId)

  // const checkOutTA = async ()=>{
  //     // await API.taStatus.checkOut(courseId, queue?.room);
  //     // mutateCourse();
  // }
  // function setCheckOutTimer() {
  //     timerCheckout.current = setTimeout(() => {
  //         message.warning("You are checked out due to inactivity");
  //         checkOutTA();
  //      }, 1000*20);
  // }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendRephraseAlert = async () => {
    const payload: RephraseQuestionPayload = {
      queueId,
      questionId: question.id,
      courseId,
    }
    try {
      await API.alerts.create({
        alertType: AlertType.REPHRASE_QUESTION,
        courseId,
        payload,
        targetUserId: question.creator.id,
      })
      await mutateQuestions()
      message.success('Successfully asked student to rephrase their question.')
    } catch (e) {
      //If the ta creates an alert that already exists the error is caught and nothing happens
    }
  }

  const helpStudent = () => {
    changeStatus(OpenQuestionStatus.Helping)
    //delete inactive timer
    // editing: shouldn't log students out after 15 minutes
    // reset timer if help another student

    if (course.questionTimer) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
      let questionTimer = setTimeout(
        () => {
          changeStatus(ClosedQuestionStatus.Resolved)
        },
        course.questionTimer * 60 * 1000,
      )
    }
  }
  const deleteQuestion = async () => {
    await changeStatus(
      question.status === OpenQuestionStatus.Drafting
        ? ClosedQuestionStatus.DeletedDraft
        : LimboQuestionStatus.TADeleted,
    )
    await API.questions.notify(question.id)
  }

  useHotkeys(
    'shift+d',
    () => {
      if (isCheckedIn) {
        deleteQuestion()
      }
    },
    [question],
  )

  if (question.status === OpenQuestionStatus.Helping) {
    return (
      <>
        <Popconfirm
          title="Are you sure you want to send this student back to the queue?"
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            message.success(PRORITY_QUEUED_MESSAGE_TEXT, 2)
            await changeStatus(LimboQuestionStatus.ReQueueing)
          }}
        >
          <Tooltip title="Requeue Student">
            <RequeueButton
              icon={<UndoOutlined />}
              data-cy="requeue-student-button"
            />
          </Tooltip>
        </Popconfirm>
        <Popconfirm
          title="Are you sure you can't find this student?"
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            message.success(PRORITY_QUEUED_MESSAGE_TEXT, 2)
            await changeStatus(LimboQuestionStatus.CantFind)
            await API.questions.notify(question.id)
          }}
        >
          <Tooltip title="Can't Find">
            <CantFindButton
              shape="circle"
              icon={<CloseOutlined />}
              data-cy="cant-find-button"
            />
          </Tooltip>
        </Popconfirm>
        <Tooltip title="Finish Helping">
          <FinishHelpingButton
            icon={<CheckOutlined />}
            onClick={() => {
              // setCheckOutTimer()
              changeStatus(ClosedQuestionStatus.Resolved)
            }}
            data-cy="finish-helping-button"
          />
        </Tooltip>
      </>
    )
  } else {
    const [canHelp, helpTooltip] = ((): [boolean, string] => {
      if (!isCheckedIn) {
        return [false, 'You must check in to help students!']
      } else if (isHelping) {
        return [false, 'You are already helping a student']
      } else {
        return [true, 'Help Student']
      }
    })()
    const [canRephrase, rephraseTooltip] = ((): [boolean, string] => {
      if (!isCheckedIn) {
        return [
          false,
          'You must check in to ask this student to rephrase their question',
        ]
      } else if (hasUnresolvedRephraseAlert) {
        return [
          false,
          'The student has already been asked to rephrase their question',
        ]
      } else if (question.status === OpenQuestionStatus.Drafting) {
        return [
          false,
          'The student must finish drafting before they can be asked to rephrase their question',
        ]
      } else {
        return [true, 'Ask the student to add more detail to their question']
      }
    })()
    return (
      <>
        <div className={className}>
          <Popconfirm
            title="Are you sure you want to delete this question from the queue?"
            disabled={!isCheckedIn}
            okText="Yes"
            cancelText="No"
            onConfirm={async () => {
              await deleteQuestion()
            }}
          >
            <Tooltip
              title={
                isCheckedIn
                  ? 'Remove From Queue'
                  : 'You must check in to remove students from the queue'
              }
            >
              <span>
                {/* This span is a workaround for tooltip-on-disabled-button 
              https://github.com/ant-design/ant-design/issues/9581#issuecomment-599668648 */}
                <BannerDangerButton
                  shape="circle"
                  icon={<DeleteOutlined />}
                  data-cy="remove-from-queue"
                  disabled={!isCheckedIn}
                />
              </span>
            </Tooltip>
          </Popconfirm>
          <Tooltip title={rephraseTooltip}>
            <span>
              <BannerOrangeButton
                shape="circle"
                icon={<QuestionOutlined />}
                onClick={sendRephraseAlert}
                data-cy="request-rephrase-question"
                disabled={!canRephrase}
              />
            </span>
          </Tooltip>
          <Tooltip title={helpTooltip}>
            <span>
              <BannerPrimaryButton
                icon={<PhoneOutlined />}
                onClick={() => {
                  // message.success("timer cleared")
                  // clearTimeout(timerCheckout.current);
                  helpStudent()
                }}
                disabled={!canHelp}
                data-cy="help-student"
              />
            </span>
          </Tooltip>
        </div>
      </>
    )
  }
}
