import { RephraseQuestionPayload } from "@koh/common";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { ReactElement } from "react";

type StudentQuestionRephraseModalProps = {
  courseId: number;
  payload: RephraseQuestionPayload;
  handleClose: (courseId: number, queueId: number) => void;
};
export default function StudentQuestionRephraseModal({
  courseId,
  payload,
  handleClose,
}: StudentQuestionRephraseModalProps): ReactElement {
  return (
    <Modal
      visible={true}
      footer={[
        <Button
          type={"primary"}
          key={"continue"}
          onClick={() => handleClose(payload.courseId, payload.queueId)}
        >
          Edit Question
        </Button>,
      ]}
      closable={false}
    >
      You have been requested to add more detail to your question by a member of
      the course staff. While you elaborate on your question your place in line
      will be reserved.
    </Modal>
  );
}
