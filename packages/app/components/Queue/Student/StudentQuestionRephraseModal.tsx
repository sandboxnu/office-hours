import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ReactElement } from "react";
import { Question } from "@koh/common";

type StudentQuestionRephraseModalProps = {
  question: Question;
  editQuestion: () => void;
};
export default function StudentQuestionRephraseModal(
  props: StudentQuestionRephraseModalProps
): ReactElement {
  return (
    <Modal
      footer={[
        <Button type={"primary"} key={"continue"} onClick={props.editQuestion}>
          Continue
        </Button>,
      ]}
      closable={false}
    >
      You have been requested to add more detail about your question by a member
      of the course staff.
    </Modal>
  );
}
