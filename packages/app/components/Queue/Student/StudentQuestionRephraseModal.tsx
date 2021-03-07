import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { ReactElement } from "react";
import { useCourse } from "../../../hooks/useCourse";
import { useQuestions } from "../../../hooks/useQuestions";
import { useQueue } from "../../../hooks/useQueue";
import useSWR from "swr/esm/use-swr";
import { API } from "@koh/api-client";

type StudentQuestionRephraseModalProps = {
  courseId: number;
};
export default function StudentQuestionRephraseModal({
  courseId,
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
          target={`/course/${courseId}/queue/${question.queueId}`}
        >
          Edit Question
        </Button>,
      ]}
      closable={true}
    >
      You have been requested to add more detail to your question by a member of
      the course staff. While you elaborate on your question your place in line
      will be reserved.
    </Modal>
  );
}
