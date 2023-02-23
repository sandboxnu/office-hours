import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { API } from "@koh/api-client";
import { AsyncQuestion, asyncQuestionStatus } from "@koh/common";
import { Input, message, Popconfirm, Tooltip, Form, Modal, Button } from "antd";
import React, { ReactElement, useState } from "react";
// import { useTAInQueueInfo } from "../../../hooks/useTAInQueueInfo";
import { CantFindButton, FinishHelpingButton } from "../../Queue/Banner";
//import { useTeams } from "../../../hooks/useTeams";

export default function StudentQuestionDetailButtons({
  question
}: {
  question: AsyncQuestion;
}): ReactElement {
  //const defaultMessage = useDefaultMessage();

  const [answerQuestionVisible, setAnswerQuestionVisbile] = useState(false);
  const handleCancel = () => {
    setAnswerQuestionVisbile(false);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendRephraseAlert = async () => {
    // const payload: RephraseQuestionPayload = {
    //   queueId,
    //   questionId: question.id,
    //   courseId
    // };
    // try {
    //   await API.alerts.create({
    //     alertType: AlertType.REPHRASE_QUESTION,
    //     courseId,
    //     payload,
    //     targetUserId: question.creator.id
    //   });
    //   await mutateQuestions();
    //   message.success("Successfully asked student to rephrase their question.");
    // } catch (e) {
    //   //If the ta creates an alert that already exists the error is caught and nothing happens
    // }
  };
  const [form] = Form.useForm();

  return (
    <>
      {/* <Popconfirm
          title="Are you sure you want to send this student back to the queue?"
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            message.success(PRORITY_QUEUED_MESSAGE_TEXT, 2);
            await changeStatus(LimboQuestionStatus.ReQueueing);
          }}
        >
          <Tooltip title="Requeue Student">
            <RequeueButton
              icon={<UndoOutlined />}
              data-cy="requeue-student-button"
            />
          </Tooltip>
        </Popconfirm> */}
      <Popconfirm
        title="Are you sure you want to delete the question?"
        okText="Yes"
        cancelText="No"
        onConfirm={async () => {
          message.success("Question is removed");
          await API.asyncQuestions.update(question.id, {
            status: asyncQuestionStatus.StudentDeleted
          });
        }}
      >
        <Tooltip title="Delete Question">
          <CantFindButton
            shape="circle"
            icon={<CloseOutlined />}
            data-cy="cant-find-button"
          />
        </Tooltip>
      </Popconfirm>
      <Tooltip title="Edit Your Question">
        <FinishHelpingButton
          icon={<EditOutlined />}
          onClick={() => setAnswerQuestionVisbile(true)}
          data-cy="edit-question-button"
        />
      </Tooltip>
      <Modal
        visible={answerQuestionVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={async () => {
              const value = await form.validateFields();
              await API.asyncQuestions
                .update(question.id, { questionText: value.text })
                .then(() => message.success("Updated"))
                .catch(e => message.error(e));
              handleCancel();
            }}
          >
            Submit
          </Button>
        ]}
      >
        <Form form={form}>
          <Form.Item
            name="text"
            rules={[{ required: true, message: "Please input your response." }]}
          >
            <Input.TextArea placeholder="Change your response"></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
