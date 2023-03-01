import { ReactElement } from "react";
import Modal from "antd/lib/modal/Modal";
import { Input, Form, Button, message } from "antd";
import styled from "styled-components";
import { API } from "@koh/api-client";

import { default as React } from "react";
import { useRouter } from "next/router";

const Container = styled.div`
  max-width: 960px;
`;

const QuestionText = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
`;

const QuestionCaption = styled.div`
  font-weight: 300;
  font-size: 14px;
  line-height: 22px;
  color: #8c8c8c;
  margin-bottom: 32px;
`;

interface EditQueueModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AsyncQuestionForm({
  visible,
  onClose
}: EditQueueModalProps): ReactElement {
  const router = useRouter();
  const cid = router.query["cid"];
  const [form] = Form.useForm();

  // const [questionTypeInput, setQuestionTypeInput] = useState<string>("Default Type");

  // const [questionTypes, setQuestionTypes] = useState(null);
  // const onCategoryChange = (e: RadioChangeEvent) => {
  //   setQuestionTypeInput(e.target.value);
  // };
  // const courseId=Number(cid);
  // useEffect(() => {
  //   getQuestions();
  // }, []);
  // const getQuestions = async () => {
  //   await API.questions.questionTypes(courseId).then((result)=>{
  //     setQuestionTypes(result);
  //     console.log(result);
  //   })
  //   console.log(questionTypes);
  // };
  const onFinish = async value => {
    await API.asyncQuestions.create(
      { questionType: "default type", questionText: value.questionText },
      Number(cid)
    );
    message.success("Question Posted");
  };
  return (
    <Modal
      title="Question Form"
      visible={visible}
      onCancel={onClose}
      onOk={async () => {
        const value = await form.validateFields();
        onFinish(value);
        onClose();
      }}
    >
      <Container>
        <Form form={form}>
          <QuestionText>What do you need help with?</QuestionText>
          <Form.Item
            rules={[{ required: true, message: "Please input your question" }]}
            name="questionText"
          >
            <Input.TextArea
              allowClear={true}
              placeholder="I’m having trouble understanding list abstractions, particularly in Assignment 5."
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
          <QuestionCaption>
            Be as descriptive and specific as possible in your answer. Your name
            will be hidden to other students, but your question will be visible
            so don&apos;t frame your question in a way that gives away the
            answer.
          </QuestionCaption>

          <QuestionText>
            What category does your question fall under?
          </QuestionText>
          {/* <Radio.Group
          value={questionTypeInput}
          onChange={onCategoryChange}
          buttonStyle="solid"
          style={{ marginBottom: 48 }}
        >
          {questionTypes!==null? (
            questionTypes.map((q) => (
              <Radio.Button key={q} value={q}>
                {" "}
                {q}
              </Radio.Button>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </Radio.Group> */}
          <h1>{cid}</h1>
          <QuestionCaption>
            Clicking Yes may result in a shorter wait time if others have the
            same question as you.
          </QuestionCaption>
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Form>
      </Container>
    </Modal>
  );
}
