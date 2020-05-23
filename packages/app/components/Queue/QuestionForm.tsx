import { Button, Input, Radio, Alert } from "antd";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { RadioChangeEvent } from "antd/lib/radio";
import Router from "next/router";
import Link from "next/link";

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

const EXIT_MESSAGE =
  "Leaving this page without submitting will remove you from the queue. Are you sure you want to leave?";

export default function QuestionForm({}: QuestionFormProps) {
  const [questionType, setQuestionType] = useState<QuestionType | undefined>(
    undefined
  );
  const [didSubmit, setDidSubmit] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeunload", confirmExit);
    Router.events.on("routeChangeStart", confirmRouteChange);

    return () => {
      if (!didSubmit) {
        // TODO: Send request to server to delete temporary queue card.
      }

      window.removeEventListener("beforeunload", confirmExit);
      Router.events.off("routeChangeStart", confirmRouteChange);
    };
  }, []);

  const confirmExit = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = EXIT_MESSAGE;
    return EXIT_MESSAGE;
  };

  const confirmRouteChange = (url: string) => {
    const { router } = Router;

    /**
     * One potential bug exists if users try and click the back button or close the tab while the confirm dialog is open,
     * it actually lets them leave the page and might not trigger useEffect unmount.
     * TODO: Verify that useEffect unmount is triggering in these cases, and if not figure out a solution.
     *
     * Note: I couldn't find a way to listen for browser back/close events, and Next.js doesn't support preventing navigation in the first place.
     *
     * This bug seems pretty unlikely to happen, but we should still enforce some kind of safety net because it could cause
     * some confusion in the queue regarding "ghost" question drafts. Maybe, when a student exits in this way, their
     * question draft remains for 5 minutes (counter on the backend), but before it expires,
     * when they navigate back to /queue they'll be alerted that they have X amount of time left to finish their question.
     */
    if (!confirm(EXIT_MESSAGE)) {
      router.abortComponentLoad(url);
      router.events.emit("routeChangeError");

      // I know this is janky, but there's no other way to prevent navigation in Next.js
      throw "Abort link navigation - ignore this error."; // eslint-disable-line
    }
  };

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
        <Link href="/queue">
          <FormButton danger>Leave Queue</FormButton>
        </Link>
      </div>
    </Container>
  );
}
