import { API } from '@koh/api-client'
import { Button, message } from 'antd'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { useCourse } from '../../hooks/useCourse'
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons'

export const CheckinButton = styled(Button)`
  background: #1890ff;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 650px) {
    margin-bottom: 0px;
  }
`

export const CheckOutButton = styled(Button)`
  color: #da3236;
  font-weight: 500;
  font-size: 14px;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 650px) {
    margin-bottom: 0px;
  }
`

type CheckInButtonState =
  | 'CheckedIn'
  | 'CheckedOut'
  | 'CheckedIntoOtherQueueAlready'

interface TACheckinButtonProps {
  courseId: number
  room: string // name of room to check into
  state: CheckInButtonState // State of the button
  disabled?: boolean
  className?: string
}
export default function TACheckinButton({
  courseId,
  room,
  state,
  disabled = false,
  className,
}: TACheckinButtonProps): ReactElement {
  const router = useRouter()

  const { course, mutateCourse } = useCourse(courseId)
  async function checkInTA() {
    // to see old check in in person functionality look at commit b4768bbfb0f36444c80961703bdbba01ff4a5596
    //trying to limit changes to the frontend, all queues will have the room online

    try {
      const redirectID = await API.taStatus.checkIn(courseId, room)
      mutateCourse()
      //3 hrs before checking a TA out
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const checkoutTimer = setTimeout(
        async () => {
          message.warning('You are checked out automatically after 3 hours')
          await API.taStatus.checkOut(courseId, room)
          mutateCourse()
        },
        1000 * 60 * 60 * 3,
      )

      router.push(
        '/course/[cid]/queue/[qid]',
        `/course/${courseId}/queue/${redirectID.id}`,
      )
    } catch (err) {
      message.error(err.response?.data?.message)
    }
  }

  return (
    <>
      {state === 'CheckedIn' && (
        <CheckOutButton
          type="default"
          size="large"
          disabled={disabled}
          data-cy="check-out-button"
          onClick={async () => {
            await API.taStatus.checkOut(courseId, room)
            mutateCourse()
          }}
          className={className}
          icon={<LogoutOutlined />}
        >
          Check Out
        </CheckOutButton>
      )}
      {state === 'CheckedOut' && (
        <CheckinButton
          type="default"
          size="large"
          onClick={() => checkInTA()}
          disabled={disabled || !course}
          data-cy="check-in-button"
          className={className}
          icon={<LoginOutlined />}
        >
          Check In
        </CheckinButton>
      )}
    </>
  )
}
