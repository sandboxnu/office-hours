import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { ReactElement } from "react";
import { useCourse } from "../../../hooks/useCourse";
import { useQuestions } from "../../../hooks/useQuestions";

type StudentQuestionRephraseModalProps = {
  courseId: number;
};
export default function StudentQuestionRephraseModal({
  courseId,
}: StudentQuestionRephraseModalProps): ReactElement {
  const { course } = useCourse(courseId);
  const queues = course?.queues;
  const questions = [];

  for (const queue of queues) {
    // questions.push(useQuestions(queue.id))
  }

  const question = { queueId: 2 };

  return (
    <Modal
      footer={[
        <Button
          type={"primary"}
          key={"continue"}
          target={`/course/${courseId}/queue/${question.queueId}`}
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
