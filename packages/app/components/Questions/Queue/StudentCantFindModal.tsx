import { Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { ReactElement } from 'react'

type CantFindModalProps = {
  visible: boolean
  leaveQueue: () => void
  rejoinQueue: () => void
}

export default function CantFindModal(props: CantFindModalProps): ReactElement {
  return (
    <Modal
      visible={props.visible}
      footer={[
        <Button key="leave" danger onClick={props.leaveQueue}>
          Leave Queue
        </Button>,
        <Button type="primary" key="rejoin" onClick={props.rejoinQueue}>
          Rejoin Queue
        </Button>,
      ]}
      closable={false}
      title="You couldn't be found!"
    >
      A TA tried to help you, but couldn&apos;t reach you. Are you still in the
      queue? If you are, make sure you have Teams open, and rejoin the queue.
    </Modal>
  )
}
