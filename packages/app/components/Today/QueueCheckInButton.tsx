import { API } from '@koh/api-client'
import { QueuePartial, Role } from '@koh/common'
import { message } from 'antd'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { useCourse } from '../../hooks/useCourse'
import { useProfile } from '../../hooks/useProfile'
import { useRoleInCourse } from '../../hooks/useRoleInCourse'
import QueueCheckInModal from './QueueCheckInModal'
import QueueCreateModal from './QueueCreateModal'
import TACheckinButton, { CheckinButton } from './TACheckinButton'
import { LoginOutlined } from '@ant-design/icons'

interface TodayPageCheckinButtonProps {
  createQueueModalVisible: boolean
  setCreateQueueModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TodayPageCheckinButton({
  createQueueModalVisible,
  setCreateQueueModalVisible,
}: TodayPageCheckinButtonProps): ReactElement {
  // state for check in modal
  const [checkInModalVisible, setCheckInModalVisible] = useState(false)

  const profile = useProfile()
  const router = useRouter()
  const { cid } = router.query
  const { course, mutateCourse } = useCourse(Number(cid))
  const role = useRoleInCourse(Number(cid))
  const availableQueues = course?.queues.filter((q) =>
    role === Role.TA ? !q.isProfessorQueue : true,
  )
  const queueCheckedIn = course?.queues.find((queue) =>
    queue.staffList.find((staff) => staff.id === profile?.id),
  )

  const numQueues = course?.queues.length

  const renderProperModal = () => {
    numQueues !== 0
      ? setCheckInModalVisible(true)
      : setCreateQueueModalVisible(true)
  }

  const submitMakeQueue = async (submittedForm) => {
    const queueRequest = await submittedForm.validateFields()
    try {
      await API.taStatus.makeQueue(
        Number(cid),
        queueRequest.officeHourName,
        !queueRequest.allowTA,
        queueRequest.notes,
      )
      message.success(`Created a new queue ${queueRequest.officeHourName}`)
      mutateCourse()

      setCreateQueueModalVisible(false)
    } catch (err) {
      message.error(err.response?.data?.message)
    }
  }

  return (
    <>
      {checkInModalVisible && (
        <QueueCheckInModal
          visible={checkInModalVisible}
          onSubmit={async (queueId: number) => {
            let redirectID: QueuePartial
            try {
              redirectID = await API.taStatus.checkIn(
                Number(cid),
                availableQueues[queueId].room,
              )
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const checkoutTimer = setTimeout(
                async () => {
                  message.warning(
                    'You are checked out automatically after 3 hours',
                  )
                  await API.taStatus.checkOut(
                    Number(cid),
                    availableQueues[queueId].room,
                  )
                  mutateCourse()
                },
                1000 * 60 * 60 * 3,
              )
              mutateCourse()
              router.push(
                '/course/[cid]/queue/[qid]',
                `/course/${Number(cid)}/queue/${redirectID.id}`,
              )
            } catch (err) {
              message.error(err.response?.data?.message)
            }
          }}
          onCancel={() => setCheckInModalVisible(false)}
          queues={availableQueues}
        />
      )}
      {createQueueModalVisible && (
        <QueueCreateModal
          visible={createQueueModalVisible}
          onSubmit={submitMakeQueue}
          onCancel={() => setCreateQueueModalVisible(false)}
          role={role}
          lastName={profile?.lastName}
        />
      )}
      {!queueCheckedIn && role !== Role.STUDENT && (
        <CheckinButton
          type="default"
          size="large"
          data-cy="check-in-modal-button"
          onClick={() => renderProperModal()}
          className="w-fit"
          icon={<LoginOutlined />}
        >
          Check In
        </CheckinButton>
      )}
      {queueCheckedIn && role !== Role.STUDENT && (
        <TACheckinButton
          courseId={Number(cid)}
          room={queueCheckedIn.room}
          state="CheckedIn"
          className="w-fit"
        />
      )}
    </>
  )
}
