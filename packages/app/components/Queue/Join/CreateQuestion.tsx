import React, { useState } from "react";
import { Row, Alert, Radio, Input } from "antd";
import styled from "styled-components";
import { Question, QuestionType } from "@template/common";
import { RadioChangeEvent } from "antd/es/radio";

interface CreateQuestionProps {
  place: number;
  prevQuestion: Question;
}

const PlaceInLineAlert = styled(Alert)`
  width: 100%;
`;

const { TextArea } = Input;

export default function CreateQuestion({
  place,
  prevQuestion,
}: CreateQuestionProps) {
  const [question, setQuestion] = useState<Question>(prevQuestion);

  const onChangeType = (e: RadioChangeEvent) => {};

  return (
    <div>
      <Row>
        <PlaceInLineAlert
          message={`You are currently ${place}st in queue`}
          type="success"
          description="Your spot in queue has been temporarily reserved. Please describe your question to finish joining the queue."
          showIcon
        />
      </Row>
      <h1>Describe your question</h1>
      <div>What category does your question fall under?</div>
      <Radio.Group onChange={onChangeType} defaultValue={""}>
        <Radio.Button value={QuestionType.Concept}>Concept</Radio.Button>
        <Radio.Button value={QuestionType.Concept}>Clarification</Radio.Button>
        <Radio.Button value={QuestionType.Bug}>Bug</Radio.Button>
        <Radio.Button value={QuestionType.Testing}>Testing</Radio.Button>
        <Radio.Button value={QuestionType.Setup}>Setup</Radio.Button>
        <Radio.Button value={QuestionType.Other}>Other</Radio.Button>
      </Radio.Group>
      <div>What do you need help with?</div>
      <TextArea
        placeholder={
          "I’m having trouble understanding list abstractions, particularly in Assignment 5."
        }
        autoSize={{ minRows: 3, maxRows: 6 }}
      />
      <div>Where in the room are you located?</div>
      <TextArea
        placeholder={"Outside room, by the couches"}
        autoSize={{ minRows: 1, maxRows: 1 }}
      />
    </div>
  );
}
