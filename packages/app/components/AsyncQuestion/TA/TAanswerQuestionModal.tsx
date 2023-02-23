import { ReactElement } from "react";
import Modal from "antd/lib/modal/Modal";
import { Input, Form, Button, message } from "antd";
import styled from "styled-components";
import { API } from "@koh/api-client";
import { AsyncQuestion, asyncQuestionStatus } from "@koh/common";
import { default as React } from "react";

const QuestionHeader = styled.div`
  font-size: 18px;
  color: #595959;
`;
const QuestionAsker = styled(QuestionHeader)`
  font-weight: 600;
`;
const QuestionDetails = styled.div`
  font-size: 18px;
  color: #595959;
  border: 1px black;
`;
interface EditQueueModalProps {
  visible: boolean;
  onClose: () => void;
  question: AsyncQuestion;
}

export function AnswerQuestionModal({
  visible,
  question,
  onClose
}: EditQueueModalProps): ReactElement {
  const [form] = Form.useForm();

  const postReponse = async value => {
    await API.asyncQuestions
      .update(question.id, {
        answerText: value.response,
        status: asyncQuestionStatus.Resolved
      })
      .then(value => {
        if (value) {
          message.success("Response posted/edited");
        } else {
          message.error("Couldn't post response");
        }
      });
  };
  return (
    <Modal
      title="Post/Edit response to Student question"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={async () => {
            const value = await form.validateFields();
            postReponse(value);
            onClose();
          }}
        >
          Submit
        </Button>
      ]}
    >
      <div>
        <>
          <QuestionAsker>
            <p>Question:</p>{" "}
          </QuestionAsker>
          <QuestionDetails>{question.questionText}</QuestionDetails>
        </>
      </div>
      <Form form={form}>
        <Form.Item
          name="response"
          rules={[{ required: true, message: "Please input your response." }]}
        >
          <Input.TextArea
            style={{ height: 150, marginBottom: 24 }}
            allowClear={true}
            placeholder={"Your response to the question"}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
