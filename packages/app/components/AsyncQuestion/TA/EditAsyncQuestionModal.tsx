import { ReactElement } from "react";
import Modal from "antd/lib/modal/Modal";
import { Form, Radio, message } from "antd";
import { API } from "@koh/api-client";
import { default as React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCourse } from "../../../hooks/useCourse";

interface EditQueueModalProps {
  visible: boolean;
  onClose: () => void;
}

export function EditAsyncQuestionModal({
  visible,
  onClose,
}: EditQueueModalProps): ReactElement {
  const [form] = Form.useForm();
  const [questionsTypeState, setQuestionsTypeState] = useState<string[]>([]);
  const [displayedTypeState, setDisplayTypeState] = useState<string[]>([]);
  const router = useRouter();
  const courseId = router.query["cid"];
  const { course } = useCourse(Number(courseId));
  useEffect(() => {
    getQuestions();
    setDisplayTypeState(course?.asyncQuestionDisplayTypes);
  }, [course]);
  const courseNumber = Number(courseId);
  const getQuestions = async () => {
    setQuestionsTypeState(await API.questions.questionTypes(courseNumber));
  };
  const changeDisplayTypes = async () => {
    await API.course.editCourseInfo(Number(courseId), {
      courseId: Number(courseId),
      asyncQuestionDisplayTypes: displayedTypeState,
    });
    message.success("Display types updated");
  };
  return (
    <Modal
      title="Edit Queue Details"
      visible={visible}
      onCancel={onClose}
      onOk={async () => {
        changeDisplayTypes();
        onClose();
      }}
    >
      <Form form={form}>
        <h4>
          Types of questions currently on display (click to remove from display)
        </h4>
        <Radio.Group buttonStyle="solid">
          {displayedTypeState?.length > 0 ? (
            displayedTypeState.map((q) => (
              <Radio.Button
                onClick={() => {
                  setDisplayTypeState(
                    displayedTypeState.filter((d) => d !== q)
                  );
                }}
                key={q}
                value={q}
              >
                {" "}
                {q}
              </Radio.Button>
            ))
          ) : (
            <p>No types of question displayed</p>
          )}
        </Radio.Group>
        <h4>Available types: (click to display)</h4>
        <Radio.Group buttonStyle="solid">
          {questionsTypeState.length > 0 ? (
            questionsTypeState.map((q) => (
              <Radio.Button
                onClick={() => {
                  if (displayedTypeState.includes(q)) {
                    message.warn("type already added");
                  } else {
                    setDisplayTypeState([...displayedTypeState, q]);
                  }
                }}
                key={q}
                value={q}
              >
                {" "}
                {q}
              </Radio.Button>
            ))
          ) : (
            <p>No Questions types</p>
          )}
        </Radio.Group>
        {/* <Form.Item label="Enter a new question type: " name="add">
            <Input
              allowClear={true}
              placeholder={""}
              value={questionTypeAddState}
              onChange={onAddChange}
            />
            <Button onClick={addQuestionType}> Add </Button>
          </Form.Item> */}
      </Form>
    </Modal>
  );
}
