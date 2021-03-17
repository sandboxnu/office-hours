import { API } from "@koh/api-client";
import { RephraseQuestionPayload } from "@koh/common";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { ReactElement } from "react";
import useSWR from "swr";
import { useCourse } from "../../../hooks/useCourse";

type StudentQuestionRephraseModalProps = {
  courseId: number;
  payload: RephraseQuestionPayload;
  handleClose: (number) => void;
};
export default function StudentQuestionRephraseModal({
  courseId,
  payload,
  handleClose,
}: StudentQuestionRephraseModalProps): ReactElement {
  const { course } = useCourse(courseId);
  const queues = course?.queues;

  const { data: question } = useSWR(
    "/api/v1/get_student_question",
    async () => {
      return await API.questions.getStudentQuestion();
    }
  );

  return (
    <Modal
      visible={true}
      footer={[
        <Button
          type={"primary"}
          key={"continue"}
          target={`/course/${courseId}/queue/${question?.queueId}`}
        >
          Edit Question
        </Button>,
      ]}
      onCancel={handleClose}
    >
      You have been requested to add more detail to your question by a member of
      the course staff. While you elaborate on your question your place in line
      will be reserved.
    </Modal>
  );
}
