import { Question, QuestionType } from "@template/common";
import { Button, Input, Radio, Alert } from "antd";
import styled from "styled-components";
import { useContext, useState } from "react";
import { RadioChangeEvent } from "antd/lib/radio";
import React from "react";
import { QuestionContext } from "../../contexts/QuestionContext";

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  color: #262626;
  margin-top: 32px;
  margin-bottom: 32px;
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
  margin-bottom: 80px;
`;

const FormButton = styled(Button)`
  float: right;
  margin-left: 8px;
`;

interface QuestionFormProps {
  prevQuestion: Question | undefined;
  leaveQueue: () => void;
  finishQuestion: (text: string, questionType: QuestionType) => void;
}

export default function QuestionForm({
  prevQuestion,
  leaveQueue,
  finishQuestion,
}: QuestionFormProps) {
  const setInitType = () => {
    if (prevQuestion != undefined) {
      return prevQuestion.questionType;
    } else {
      return undefined;
    }
  };

  const setInitText = () => {
    if (prevQuestion != undefined) {
      return prevQuestion.text;
    } else {
      return undefined;
    }
  };

  const { updateQuestionType, updateText } = useContext(QuestionContext);

  const [question, setQuestion] = useState<Question | undefined>(prevQuestion);
  const [questionType, setQuestionType] = useState<QuestionType | undefined>(
    setInitType
  );
  const [questionText, setQuestionText] = useState<string | undefined>(
    setInitText
  );

  // on question type change, update the question type state
  const onCategoryChange = (e: RadioChangeEvent) => {
    updateQuestionType(question, e.target.value);
    setQuestionType(e.target.value);
  };

  // on question text change, update the question text state
  const onQuestionTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateText(question, event.target.value);
    setQuestionText(event.target.value);
  };

  // on button submit click, conditionally choose to go back to the queue
  const onClickSubmit = () => {
    if (!!questionType && questionText && questionText !== "") {
      finishQuestion(questionText, questionType);
    }
  };

  return (
    <Container>
      <Alert
        message="You are currently 12th in queue"
        description="Your spot in queue has been temporarily reserved. Please describe your question to finish joining the queue."
        type="success"
        showIcon
      />

      <Title>Describe your question</Title>

      <QuestionText>What category does your question fall under?</QuestionText>
      <Radio.Group
        onChange={onCategoryChange}
        buttonStyle="solid"
        style={{ marginBottom: 48 }}
      >
        <Radio.Button value={QuestionType.Concept}>Concept</Radio.Button>
        <Radio.Button value={QuestionType.Clarification}>Concept</Radio.Button>
        <Radio.Button value={QuestionType.Testing}>Testing</Radio.Button>
        <Radio.Button value={QuestionType.Bug}>Bug</Radio.Button>
        <Radio.Button value={QuestionType.Setup}>Setup</Radio.Button>
        <Radio.Button value={QuestionType.Other}>Other</Radio.Button>
      </Radio.Group>

      <QuestionText>What do you need help with?</QuestionText>
      <Input.TextArea
        value={questionText}
        placeholder="I’m having trouble understanding list abstractions, particularly in Assignment 5."
        autoSize={{ minRows: 3, maxRows: 6 }}
        onChange={onQuestionTextChange}
      />
      <QuestionCaption>
        Be as descriptive and specific as possible in your answer. If your
        question matches another student’s, your wait time may be reduced.
      </QuestionCaption>

      <div>
        <FormButton
          type="primary"
          disabled={!questionType || !questionText || questionText === ""}
          onClick={onClickSubmit}
        >
          Finish
        </FormButton>
        <FormButton danger onClick={leaveQueue}>
          Leave Queue
        </FormButton>
      </div>
    </Container>
  );
}
