import {
  DeleteRowOutlined,
  EditOutlined,
  TeamOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { API } from "@koh/api-client";
import { OpenQuestionStatus } from "@koh/common";
import { Button, Col, Popconfirm, Tooltip } from "antd";
import React, { ReactElement } from "react";
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

const ColWithRightMargin = styled(Col)`
  margin-right: 32px;
`;

const PriorityQueuedBanner = styled.span`
  display: flex;
  flex-direction: column;
  margin: 12px 0;
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
              <Tooltip title="Delete Draft">
                <BannerButton
                  icon={<DeleteRowOutlined />}
                  onClick={leaveQueue}
                />
              </Tooltip>
              <Tooltip title="Finish Draft">
                <BannerButton
                  data-cy="edit-question"
                  icon={<EditOutlined />}
                  onClick={async () => {
                    editQuestion();
                  }}
                />
              </Tooltip>
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
              <Tooltip title="Edit Question">
                <BannerButton
                  data-cy="edit-question"
                  icon={<EditOutlined />}
                  onClick={editQuestion}
                />
              </Tooltip>
            </>
          }
          content={
            <QuestionDetails>
              <ColWithRightMargin flex="1 1">
                <InfoHeader>question</InfoHeader>
                <div>{studentQuestion.text}</div>
              </ColWithRightMargin>
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
                <Tooltip title="Open Teams DM">
                  <BannerButton
                    icon={<TeamOutlined />}
                    onClick={() => {
                      window.open(
                        `https://teams.microsoft.com/l/chat/0/0?users=${studentQuestion.taHelped.email}`
                      );
                    }}
                  />
                </Tooltip>
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
              <Tooltip title="Rejoin Queue">
                <Button
                  shape="circle"
                  style={{
                    marginLeft: "16px",
                    border: 0,
                  }}
                  icon={<UndoOutlined />}
                  onClick={async () => {
                    await API.questions.update(studentQuestion.id, {
                      status: OpenQuestionStatus.PriorityQueued,
                    });
                  }}
                  type="primary"
                  data-cy="re-join-queue"
                  size="large"
                />
              </Tooltip>
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
            <PriorityQueuedBanner>
              You are now in a priority queue, you will be helped soon. <br />
              <span style={{ fontSize: 16 }}>
                You were last helped by{" "}
                <span style={{ fontWeight: "bold" }}>
                  {studentQuestion.taHelped.name}
                </span>
                .
              </span>
            </PriorityQueuedBanner>
          }
          buttons={
            <>
              <LeaveQueueButton leaveQueue={leaveQueue} />
              <Tooltip title="Edit Question">
                <BannerButton
                  data-cy="edit-question"
                  icon={<EditOutlined />}
                  onClick={editQuestion}
                />
              </Tooltip>
            </>
          }
          content={
            <QuestionDetails>
              <ColWithRightMargin flex="1 1">
                <InfoHeader>question</InfoHeader>
                <div>{studentQuestion.text}</div>
              </ColWithRightMargin>
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
      <Tooltip title="Leave Queue">
        <BannerDangerButton
          data-cy="leave-queue"
          icon={<DeleteRowOutlined />}
        />
      </Tooltip>
    </Popconfirm>
  );
}
