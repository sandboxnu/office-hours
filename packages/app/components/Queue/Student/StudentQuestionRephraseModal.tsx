import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { ReactElement } from "react";
import { Question } from "@koh/common";

type StudentQuestionRephraseModalProps = {
  visible: boolean;
  question: Question;
  editQuestion: () => void;
};
export default function StudentQuestionRephraseModal(
  props: StudentQuestionRephraseModalProps
): ReactElement {
  return (
    <Modal
      visible={props.visible}
      footer={[
        <Button type={"primary"} key={"continue"} onClick={props.editQuestion}>
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
