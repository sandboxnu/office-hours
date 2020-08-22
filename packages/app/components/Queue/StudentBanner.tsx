import Banner from "./Banner";
import styled from "styled-components";
import { Button, Row, Col, Popconfirm } from "antd";
import { toOrdinal } from "../../utils/ordinal";
import { useStudentQuestion } from "../../hooks/useStudentQuestion";
import { Text } from "./QueueCardSharedComponents";
import {
  TeamOutlined,
  DeleteRowOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useState, ReactElement } from "react";
import { OpenQuestionStatus, Question } from "@template/common";
import { API } from "@template/api-client";
import { useDraftQuestion } from "../../hooks/useDraftQuestion";

const BoldNumber = styled.span`
  font-weight: bold;
`;
const DangerButton = styled(Button)`
  margin-right: 16px;
  border-radius: 6px;
  border: 0;
  background: #e26567;
  color: #fff;
  &:hover,
  &:focus {
    background: #fc7f81;
    color: #fff;
  }
`;
const WhiteButton = styled(Button)`
  margin-right: 16px;
  border-radius: 6px;
  border: 0;
  background: #fff;
`;

const QuestionDetails = styled.div`
  display: flex;
`;
const InfoHeader = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
`;

const Bullets = styled.ul`
  color: #000;
`;

interface StudentBannerProps {
  queueId: number;
  editQuestion: () => void;
  leaveQueue: () => void;
}
export default function StudentBanner({
  queueId,
  editQuestion,
  leaveQueue,
}: StudentBannerProps): ReactElement {
  const {
    studentQuestion,
    studentQuestionIndex,
    mutateStudentQuestion,
  } = useStudentQuestion(queueId);

  const { draftQuestion } = useDraftQuestion();

  switch (studentQuestion?.status) {
    case "Drafting":
      return (
        <Banner
          titleColor="#faad14"
          contentColor="#ffd666"
          title="Please finish writing your question"
          content="Your spot in queue has been temporarily reserved. Please finish describing your question to receive help and finish joining the queue."
          buttons={
            <>
              <WhiteButton icon={<DeleteRowOutlined />} onClick={leaveQueue}>
                Delete Draft
              </WhiteButton>
              <WhiteButton
                icon={<EditOutlined />}
                onClick={async () => {
                  mutateStudentQuestion(
                    await API.questions.update(draftQuestion?.id, {
                      questionType: draftQuestion.questionType,
                      text: draftQuestion.text,
                      queueId: Number(queueId),
                    })
                  );

                  editQuestion();
                }}
              >
                Finish Draft
              </WhiteButton>
            </>
          }
        />
      );
    case "Queued":
      return (
        <Banner
          titleColor="#3684C6"
          contentColor="#ABD4F3"
          title={
            <span>
              You are{" "}
              <BoldNumber>{toOrdinal(studentQuestionIndex + 1)}</BoldNumber> in
              queue
            </span>
          }
          buttons={
            <>
              <LeaveQueueButton leaveQueue={leaveQueue} />
              <WhiteButton icon={<EditOutlined />} onClick={editQuestion}>
                Edit Question
              </WhiteButton>
            </>
          }
          content={
            <QuestionDetails>
              <Col flex="1 1">
                <InfoHeader>Question</InfoHeader>
                <div>{studentQuestion.text}</div>
              </Col>
              <Col flex="0 0 60px">
                <InfoHeader>Type</InfoHeader>
                <div>
                  {studentQuestion.questionType.charAt(0).toUpperCase() +
                    studentQuestion.questionType.substr(1).toLowerCase()}
                </div>
              </Col>
            </QuestionDetails>
          }
        />
      );
    case "Helping":
      return (
        <Banner
          titleColor="#66BB6A"
          contentColor="#82C985"
          title={
            <span>
              <BoldNumber>{studentQuestion.taHelped.name}</BoldNumber> is coming
              to help you
            </span>
          }
          buttons={
            <>
              <LeaveQueueButton leaveQueue={leaveQueue} />
              <WhiteButton icon={<TeamOutlined />}>Open Teams DM</WhiteButton>
            </>
          }
          content={
            <Bullets>
              <li>Please be dressed appropriately</li>
              <li>Be respectful of the TA’s time</li>
              <li>Come prepared with your question!</li>
            </Bullets>
          }
        />
      );
    default:
      return <div />;
  }
}

function LeaveQueueButton({ leaveQueue }: { leaveQueue: () => void }) {
  return (
    <Popconfirm
      title={`Are you sure you want to leave the queue?`}
      okText="Yes"
      cancelText="No"
      onConfirm={leaveQueue}
    >
      <DangerButton icon={<DeleteRowOutlined />}>Leave Queue</DangerButton>
    </Popconfirm>
  );
}
