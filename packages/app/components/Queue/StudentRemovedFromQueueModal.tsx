import { ClosedQuestionStatus, Question } from "@template/common";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ReactElement } from "react";

type StudentRemovedFromQueueModalProps = {
  question: Question;
  leaveQueue: () => void;
  joinQueue: () => void;
};

export default function StudentRemovedFromQueueModal(
  props: StudentRemovedFromQueueModalProps
): ReactElement {
  return (
    <Modal
      visible={props.question.status === ClosedQuestionStatus.Deleted}
      footer={[
        <Button key="leave" danger onClick={props.leaveQueue}>
          Leave Queue
        </Button>,
        <Button type="primary" key="rejoin" onClick={props.joinQueue}>
          Rejoin Queue
        </Button>,
      ]}
    >
      You&quot;ve been removed from the queue by the following TA:{" "}
      {props.question.taHelped.name}. If you have any questions, please reach
      out to the TA. If you&quot;d like to join back into the queue with your
      previous question, click Join, otherwise click Cancel.
    </Modal>
  );
}
