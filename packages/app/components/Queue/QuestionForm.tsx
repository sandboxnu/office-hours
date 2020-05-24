import { Button, Input, Radio, Alert } from "antd";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { RadioChangeEvent } from "antd/lib/radio";
import Router from "next/router";
import Link from "next/link";
import React from "react";

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
  const [questionText, setQuestionText] = useState<string | undefined>(
    undefined
  );
  const [didSubmit, setDidSubmit] = useState(false);

  // when attempting to navigate off form page, alert the user
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
    // if the user already submitted, then don't warn
    if (!didSubmit) {
      e.preventDefault();
      e.returnValue = EXIT_MESSAGE;
      return EXIT_MESSAGE;
    }
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
    if (!didSubmit && !confirm(EXIT_MESSAGE)) {
      // only warn if the user hasn't submitted yet
      router.abortComponentLoad(url);
      router.events.emit("routeChangeError");

      // I know this is janky, but there's no other way to prevent navigation in Next.js
      throw "Abort link navigation - ignore this error."; // eslint-disable-line
    }
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
      setDidSubmit(true);
      Router.push("/queue");
    } else {
      // student hasn't finished filling out the forms
    }
  };

  // compute the button-type of the submit button, based on if everything is filled out
  const computeQuestionType = () => {
    if (!!questionType && questionText && questionText !== "") {
      return "primary";
    } else {
      return "disabled";
    }
  };

  // on question type change, update the question type state
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
          <FormButton danger>Leave Queue</FormButton>
        </Link>
      </div>
    </Container>
  );
}
