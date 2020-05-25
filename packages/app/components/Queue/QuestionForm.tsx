import { QuestionType } from "@template/common";
import { Button, Input, Radio, Alert } from "antd";
import styled from "styled-components";
import { useState } from "react";
import { RadioChangeEvent } from "antd/lib/radio";
import Router from "next/router";
import Link from "next/link";
import React from "react";

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
  rank: number;
  name: string;
  questionType: QuestionType;
  waitTime: number;
  status: string;
}

export default function QuestionForm() {
  const [questionType, setQuestionType] = useState<QuestionType | undefined>(
    undefined
  );
  const [questionText, setQuestionText] = useState<string | undefined>(
    undefined
  );

  // on question type change, update the question type state
  const onCategoryChange = (e: RadioChangeEvent) => {
    setQuestionType(e.target.value);
  };

  // on question text change, update the question text state
  const onQuestionTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestionText(event.target.value);
  };

  // on button submit click, conditionally choose to go back to the queue
  const onClickSubmit = () => {
    if (!!questionType && questionText && questionText !== "") {
      // todo: submit question (send http server whatnot)
      // bring the user back to the queue page, assuming it was successful
      Router.push("/queue");
    }
  };

  // on button leave queue click, delete question draft
  const onClickLeave = () => {
    // TODO: delete question (send http request)
  };

  // compute the button-type of the submit button, based on if everything is filled out
  const computeQuestionType = () => {
    if (!!questionType && questionText && questionText !== "") {
      return "primary";
    } else {
      return "disabled";
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
        <Radio.Button value={QuestionType.Testing}>Testing</Radio.Button>
        <Radio.Button value={QuestionType.Bug}>Bug</Radio.Button>
        <Radio.Button value={QuestionType.Setup}>Setup</Radio.Button>
        <Radio.Button value={QuestionType.Other}>Other</Radio.Button>
      </Radio.Group>

      <QuestionText>What do you need help with?</QuestionText>
      <Input.TextArea
        placeholder="I’m having trouble understanding list abstractions, particularly in the
        context of Assignment 5."
        autoSize={{ minRows: 3 }}
        onChange={onQuestionTextChange}
      />
      <QuestionCaption>
        Be as descriptive and specific as possible in your answer. If your
        question matches another student’s, your wait time may be reduced.
      </QuestionCaption>

      <div>
        <FormButton type={computeQuestionType()} onClick={onClickSubmit}>
          Finish
        </FormButton>
        <Link href="/queue">
          <FormButton danger onClick={onClickLeave}>
            Leave Queue
          </FormButton>
        </Link>
      </div>
    </Container>
  );
}
