import { Button, Input, Radio, Alert } from "antd";
import styled from "styled-components";
import { useState } from "react";
import { RadioChangeEvent } from "antd/lib/radio";

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding-top: 32px;
  padding-bottom: 32px;
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
  questionType: string;
  waitTime: number;
  status: string;
}

enum QuestionType {
  Concept = "concept",
  Testing = "testing",
  Bug = "bug",
  Dev_Environment = "dev-environment",
  Other = "other",
}

export default function QuestionForm({}: QuestionFormProps) {
  const [questionType, setQuestionType] = useState<QuestionType | undefined>(
    undefined
  );

  const onCategoryChange = (e: RadioChangeEvent) => {
    setQuestionType(e.target.value);
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
        <Radio.Button value={QuestionType.Dev_Environment}>
          Dev Environment
        </Radio.Button>
        <Radio.Button value={QuestionType.Other}>Other</Radio.Button>
      </Radio.Group>

      <QuestionText>What do you need help with?</QuestionText>
      <Input.TextArea
        placeholder="I’m having trouble understanding list abstractions, particularly in the
        context of Assignment 5."
        autoSize={{ minRows: 3 }}
      />
      <QuestionCaption>
        Be as descriptive and specific as possible in your answer. If your
        question matches another student’s, your wait time may be reduced.
      </QuestionCaption>

      <div>
        <FormButton type="primary">Finish</FormButton>
        <FormButton danger>Leave Queue</FormButton>
      </div>
    </Container>
  );
}
