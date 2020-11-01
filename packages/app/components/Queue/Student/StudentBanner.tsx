import {
  DeleteRowOutlined,
  EditOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { API } from "@koh/api-client";
import { OpenQuestionStatus } from "@koh/common";
import { Col, Popconfirm } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";
import { useDraftQuestion } from "../../../hooks/useDraftQuestion";
import { useStudentQuestion } from "../../../hooks/useStudentQuestion";
import { toOrdinal } from "../../../utils/ordinal";
import Banner, { BannerButton, BannerDangerButton } from "../Banner";

const BoldNumber = styled.span`
  font-weight: bold;
`;

const QuestionDetails = styled.div`
  display: flex;
`;
const InfoHeader = styled.div`
  font-weight: bold;
  font-size: 14px;
  font-variant: small-caps;
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
  const { studentQuestion, studentQuestionIndex } = useStudentQuestion(queueId);

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
              <BannerButton icon={<DeleteRowOutlined />} onClick={leaveQueue}>
                Delete Draft
              </BannerButton>
              <BannerButton
                data-cy="edit-question"
                icon={<EditOutlined />}
                onClick={async () => {
                  editQuestion();
                }}
              >
                Finish Draft
              </BannerButton>
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
              <BannerButton
                data-cy="edit-question"
                icon={<EditOutlined />}
                onClick={editQuestion}
              >
                Edit Question
              </BannerButton>
            </>
          }
          content={
            <QuestionDetails>
              <Col flex="1 1" style={{ marginRight: "32px" }}>
                <InfoHeader>question</InfoHeader>
                <div>{studentQuestion.text}</div>
              </Col>
              <Col flex="0 0 89px">
                <InfoHeader>type</InfoHeader>
                <div>{studentQuestion.questionType}</div>
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
              {studentQuestion.isOnline && (
                <BannerButton
                  icon={<TeamOutlined />}
                  onClick={() => {
                    window.open(
                      `https://teams.microsoft.com/l/chat/0/0?users=${studentQuestion.taHelped.email}`
                    );
                  }}
                >
                  Open Teams DM
                </BannerButton>
              )}
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
    case "ReQueueing":
      return (
        <Banner
          titleColor="#66BB6A"
          contentColor="#82C985"
          title={<span>Are you ready to re-join the queue?</span>}
          buttons={
            <>
              <LeaveQueueButton leaveQueue={leaveQueue} />
              {studentQuestion.isOnline && (
                <BannerButton
                  icon={<TeamOutlined />}
                  onClick={async () => {
                    await API.questions.update(studentQuestion.id, {
                      status: OpenQuestionStatus.PriorityQueued,
                    });
                  }}
                >
                  Re-join Queue
                </BannerButton>
              )}
            </>
          }
          content={
            <Bullets>
              <li>Have you finished doing what the TA has told you?</li>
              <li>
                Once you hit requeue, you will be placed at the top of the queue
              </li>
            </Bullets>
          }
        />
      );
    case "PriorityQueued":
      return (
        <Banner
          titleColor="#3684C6"
          contentColor="#ABD4F3"
          title={
            <span>
              You are now in a priority queue, you will be helped soon. You were
              last helped by {studentQuestion.taHelped.name}.
            </span>
          }
          buttons={
            <>
              <LeaveQueueButton leaveQueue={leaveQueue} />
              <BannerButton
                data-cy="edit-question"
                icon={<EditOutlined />}
                onClick={editQuestion}
              >
                Edit Question
              </BannerButton>
            </>
          }
          content={
            <QuestionDetails>
              <Col flex="1 1" style={{ marginRight: "32px" }}>
                <InfoHeader>question</InfoHeader>
                <div>{studentQuestion.text}</div>
              </Col>
              <Col flex="0 0 89px">
                <InfoHeader>type</InfoHeader>
                <div>{studentQuestion.questionType}</div>
              </Col>
            </QuestionDetails>
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
      <BannerDangerButton data-cy="leave-queue" icon={<DeleteRowOutlined />}>
        Leave Queue
      </BannerDangerButton>
    </Popconfirm>
  );
}
