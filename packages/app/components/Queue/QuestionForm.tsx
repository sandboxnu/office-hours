import { Question, QuestionType } from "@template/common";
import { Alert, Button, Input, Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import numbro from "numbro";
import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

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
  margin-bottom: 32px;
`;

const FormButton = styled(Button)`
  float: right;
  margin-left: 8px;
`;

interface QuestionFormProps {
  question: Question;
  leaveQueue: () => void;
  finishQuestion: (
    text: string,
    questionType: QuestionType,
    isOnline: boolean,
    location: string
  ) => void;
  position: number;
}

export default function QuestionForm({
  question,
  leaveQueue,
  finishQuestion,
  position,
}: QuestionFormProps): ReactElement {
  const [questionTypeInput, setQuestionTypeInput] = useState<QuestionType>(
    question?.questionType || null
  );
  const [questionText, setQuestionText] = useState<string>(question.text || "");
  const [isOnline, setIsOnline] = useState(question.isOnline || false);
  const [location, setLocation] = useState(question.location || "");

  useEffect(() => {
    if (question) {
      setQuestionText(question.text);
      setQuestionTypeInput(question.questionType);
    }
  }, [question]);

  // on question type change, update the question type state
  const onCategoryChange = (e: RadioChangeEvent) => {
    setQuestionTypeInput(e.target.value);
  };

  // on question text change, update the question text state
  const onQuestionTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestionText(event.target.value);
  };

  // on button submit click, conditionally choose to go back to the queue
  const onClickSubmit = () => {
    if (questionTypeInput && questionText && questionText !== "") {
      finishQuestion(questionText, questionTypeInput, isOnline, location);
    }
  };

  const onOfflineOrInPersonChange = (e: RadioChangeEvent) => {
    if (e.target.value === "Online") {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  };

  return (
    <Container>
      <Alert
        message={`You are currently ${numbro(position).format({
          output: "ordinal",
        })} in queue`}
        description="Your spot in queue has been temporarily reserved. Please describe your question to finish joining the queue."
        type="success"
        showIcon
      />

      <Title>Describe your question</Title>

      <QuestionText>What category does your question fall under?</QuestionText>
      <Radio.Group
        value={questionTypeInput}
        onChange={onCategoryChange}
        buttonStyle="solid"
        style={{ marginBottom: 48 }}
      >
        <Radio.Button value={QuestionType.Concept}>Concept</Radio.Button>
        <Radio.Button value={QuestionType.Clarification}>
          Clarification
        </Radio.Button>
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
      <QuestionText>Where are you joining office hours?</QuestionText>

      <Radio.Group
        style={{ marginBottom: "16px" }}
        onChange={onOfflineOrInPersonChange}
        value={isOnline ? "Online" : "In person"}
      >
        <Radio style={{ display: "block" }} value={"In person"}>
          In Person
        </Radio>
        <Radio style={{ display: "block" }} value={"Online"}>
          Online
        </Radio>
      </Radio.Group>

      {!isOnline && (
        <div>
          <QuestionText>Where in the room are you located?</QuestionText>
          <Input.TextArea
            value={location}
            placeholder="Outside room, by the couches"
            autoSize={{ minRows: 1, maxRows: 1 }}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <QuestionCaption></QuestionCaption>
        </div>
      )}

      <div style={{ display: "block" }}>
        <FormButton
          type="primary"
          disabled={!questionTypeInput || !questionText || questionText === ""}
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
