import { LimboQuestionStatus, Question } from '@koh/common'
import { Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { ReactElement } from 'react'

type StudentRemovedFromQueueModalProps = {
  question: Question
  leaveQueue: () => void
  joinQueue: () => void
}

export default function StudentRemovedFromQueueModal(
  props: StudentRemovedFromQueueModalProps,
): ReactElement {
  return (
    <Modal
      visible={props.question?.status === LimboQuestionStatus.TADeleted}
      footer={[
        <Button key="leave" danger onClick={props.leaveQueue}>
          Leave Queue
        </Button>,
        <Button type="primary" key="rejoin" onClick={props.joinQueue}>
          Rejoin Queue
        </Button>,
      ]}
      closable={false}
    >
      You&apos;ve been removed from the queue by a TA. If you have any
      questions, please reach out to the TA. If you&apos;d like to join back
      into the queue with your previous question, click Rejoin Queue, otherwise
      click Leave Queue.
    </Modal>
  )
}
