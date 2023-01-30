import { ReactElement } from "react";
import Modal from "antd/lib/modal/Modal";
import { Switch, Input, Form, Button, Radio } from "antd";
import styled from "styled-components";
import { API } from "@koh/api-client";
import { useQueue } from "../../../hooks/useQueue";
import { UpdateQueueParams } from "@koh/common";
import { pick } from "lodash";
import { default as React, useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useCourse } from "../../../hooks/useCourse";
const NotesInput = styled(Input.TextArea)`
  border-radius: 6px;
  border: 1px solid #b8c4ce;
`;

interface EditQueueModalProps {
  queueId: number;
  visible: boolean;
  onClose: () => void;
}

export function EditQueueModal({
  queueId,
  visible,
  onClose,
}: EditQueueModalProps): ReactElement {
  const { queue, mutateQueue } = useQueue(queueId);
  const [form] = Form.useForm();
  const [questionsTypeState, setQuestionsTypeState] = useState<string[]>([]);
  const [questionTypeAddState, setQuestionTypeAddState] = useState("");
  const router = useRouter();
  const courseId = router.query["cid"];
  const course = useCourse(Number(courseId));

  const [zoomLink, setZoomLink] = useState("");
  useEffect(() => {
    getQuestions();
  }, []);

  const editQueue = async (updateQueue: UpdateQueueParams) => {
    const newQueue = { ...queue, ...updateQueue };
    mutateQueue(newQueue, false);
    await API.queues.update(
      newQueue.id,
      pick(newQueue, ["notes", "allowQuestions"])
    );
    mutateQueue();
  };

  const courseNumber = Number(courseId);
  const getQuestions = async () => {
    setQuestionsTypeState(await API.questions.questionTypes(courseNumber));
  };

  const onclick = useCallback(
    async (s: string) => {
      await API.questions.deleteQuestionType(courseNumber, s);
      const temp = await API.questions.questionTypes(courseNumber);
      console.log(temp);
      await setQuestionsTypeState(temp);
    },
    [courseNumber]
  );

  const onAddChange = (e) => {
    setQuestionTypeAddState(e.target.value);
  };
  const onZoomLinkChange = (e) => {
    setZoomLink(e.target.value);
  };
  const addQuestionType = useCallback(async () => {
    await API.questions.addQuestionType(courseNumber, questionTypeAddState);
    setQuestionsTypeState(await API.questions.questionTypes(courseNumber));
  }, [courseNumber, questionTypeAddState]);
  const changeZoomLink = async () => {
    console.log(zoomLink);
    await API.course.editCourseInfo(Number(courseId), {
      courseId: Number(courseId),
      zoomLink: zoomLink,
    });
  };
  return (
    <Modal
      title="Edit Queue Details"
      visible={visible}
      onCancel={onClose}
      onOk={async () => {
        const value = await form.validateFields();
        await editQueue(value);
        onClose();
      }}
    >
      {queue && (
        <Form form={form} initialValues={queue}>
          <Form.Item label="Queue Notes" name="notes">
            <NotesInput allowClear={true} placeholder={""} />
          </Form.Item>
          <Form.Item
            label="Allow New Questions"
            name="allowQuestions"
            valuePropName="checked"
          >
            <Switch data-cy="allow-questions-toggle" />
          </Form.Item>
          <h4>Current Question Types: (click to delete)</h4>
          <Radio.Group buttonStyle="solid">
            {questionsTypeState.length > 0 ? (
              questionsTypeState.map((q) => (
                <Radio.Button onClick={() => onclick(q)} key={q} value={q}>
                  {" "}
                  {q}
                </Radio.Button>
              ))
            ) : (
              <p>No Questions types</p>
            )}
          </Radio.Group>

          <Form.Item label="Enter a new question type: " name="add">
            <Input
              allowClear={true}
              placeholder={""}
              value={questionTypeAddState}
              onChange={onAddChange}
            />
            <Button onClick={addQuestionType}> Add </Button>
          </Form.Item>
          <h4 style={{ marginTop: "20px" }}>
            Current Zoom link:{" "}
            {course.course.zoomLink && course.course.zoomLink}
          </h4>
          <Form.Item>
            <Input allowClear={true} onChange={onZoomLinkChange} />
            <Button onClick={changeZoomLink}> Change Link </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
