import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ReactElement } from "react";
import { CantFindModalProps } from "./StudentCantFindModal";

export default function StudentRemovedFromQueueModal(
  props: CantFindModalProps
): ReactElement {
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
    >
      You&quot;ve been removed from the queue by the following TA: . If you have
      any questions, please reach out to the TA. If you&quot;d like to join back
      into the queue with your previous question, click Join, otherwise click
      Cancel.
    </Modal>
  );
}
