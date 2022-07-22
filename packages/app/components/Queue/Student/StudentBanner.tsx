import {
  CheckOutlined,
  CloseOutlined,
  DeleteRowOutlined,
  EditOutlined,
  TeamOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { API } from "@koh/api-client";
import { OpenQuestionStatus, Question } from "@koh/common";
import { Col, Tooltip } from "antd";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { useQueue } from "../../../hooks/useQueue";
import { useStudentQuestion } from "../../../hooks/useStudentQuestion";
import { toOrdinal } from "../../../utils/ordinal";
import { ResponsivePopconfirm } from "../../common/ResponsivePopconfirm";
import Banner, {
  BannerButton,
  BannerDangerButton,
  BannerPrimaryButton,
} from "../Banner";
import { truncate } from "../QueueUtils";

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

const StyledBannerButton = styled(BannerButton)`
  @media (max-width: 650px) {
    margin: 5px 2px;
    border: 1px solid #d9d9d9;
  }
`;
const StyledBannerDangerButton = styled(BannerDangerButton)`
  @media (max-width: 650px) {
    margin: 5px 2px;
  }
`;
const StyledBannerPrimaryButton = styled(BannerPrimaryButton)`
  @media (max-width: 650px) {
    margin: 5px 2px;
  }
`;

interface StudentBannerProps {
  queueId: number;
  editQuestion: () => void;
  leaveQueue: () => void;
}
interface BannerButtonProps {
  queueId: number;
  editQuestion: () => void;
  leaveQueue: () => void;
}

export default function StudentBanner({
  queueId,
  editQuestion,
  leaveQueue,
}: StudentBannerProps): ReactElement {
  const isMobile = useIsMobile();
  const { studentQuestion, studentQuestionIndex } = useStudentQuestion(queueId);

  switch (studentQuestion?.status) {
    case "Drafting":
      return (
        <Banner
          titleColor="#faad14"
          contentColor="#ffd666"
          title="Please finish writing your question"
          content="Your spot in queue has been temporarily reserved. Please finish describing your question to receive help and finish joining the queue."
          buttons={
            !isMobile && (
              <StudentBannerButtons
                queueId={queueId}
                editQuestion={editQuestion}
                leaveQueue={leaveQueue}
              />
            )
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
            !isMobile && (
              <StudentBannerButtons
                queueId={queueId}
                editQuestion={editQuestion}
                leaveQueue={leaveQueue}
              />
            )
          }
          content={<QuestionDetailRow studentQuestion={studentQuestion} />}
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
            !isMobile && (
              <StudentBannerButtons
                queueId={queueId}
                editQuestion={editQuestion}
                leaveQueue={leaveQueue}
              />
            )
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
            !isMobile && (
              <StudentBannerButtons
                queueId={queueId}
                editQuestion={editQuestion}
                leaveQueue={leaveQueue}
              />
            )
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
            !isMobile && (
              <StudentBannerButtons
                queueId={queueId}
                editQuestion={editQuestion}
                leaveQueue={leaveQueue}
              />
            )
          }
          content={<QuestionDetailRow studentQuestion={studentQuestion} />}
        />
      );
    default:
      return <div />;
  }
}

function LeaveQueueButton({
  leaveQueue,
  children,
}: {
  leaveQueue: () => void;
  children?: React.ReactChild;
}) {
  return (
    <ResponsivePopconfirm
      title={`Are you sure you want to leave the queue?`}
      okText="Yes"
      cancelText="No"
      onConfirm={leaveQueue}
    >
      <Tooltip title="Leave Queue">
        <StyledBannerDangerButton
          data-cy="leave-queue"
          icon={<DeleteRowOutlined />}
        >
          {children}
        </StyledBannerDangerButton>
      </Tooltip>
    </ResponsivePopconfirm>
  );
}

function QuestionDetailRow({ studentQuestion }: { studentQuestion: Question }) {
  const isMobile = useIsMobile();
  return (
    <QuestionDetails>
      <ColWithRightMargin flex="4 4">
        <InfoHeader>question</InfoHeader>
        <div>
          {isMobile ? truncate(studentQuestion.text, 32) : studentQuestion.text}
        </div>
      </ColWithRightMargin>
      <Col flex="0.5 0.5 95px">
        <InfoHeader>type</InfoHeader>
        <div>{studentQuestion.questionType}</div>
      </Col>
      <Col flex={isMobile ? "0 0 68px" : "0 0 89px"}>
        <InfoHeader>groupable</InfoHeader>
        <div>
          {studentQuestion.groupable ? <CheckOutlined /> : <CloseOutlined />}
        </div>
      </Col>
    </QuestionDetails>
  );
}

export function StudentBannerButtons({
  queueId,
  editQuestion,
  leaveQueue,
}: BannerButtonProps): ReactElement {
  const isMobile = useIsMobile();
  const isQueueOnline = useQueue(queueId).queue?.room.startsWith("Online");
  const { studentQuestion } = useStudentQuestion(queueId);

  switch (studentQuestion?.status) {
    case "Drafting":
      return (
        <>
          <Tooltip title="Delete Draft">
            <StyledBannerButton
              icon={<DeleteRowOutlined />}
              onClick={leaveQueue}
            >
              {isMobile && "Leave Queue"}
            </StyledBannerButton>
          </Tooltip>
          <Tooltip title="Finish Draft">
            <StyledBannerButton
              data-cy="edit-question"
              icon={<EditOutlined />}
              onClick={async () => {
                editQuestion();
              }}
            >
              {isMobile && "Finish Draft"}
            </StyledBannerButton>
          </Tooltip>
        </>
      );
    case "Queued":
    case "PriorityQueued":
      return (
        <>
          <LeaveQueueButton leaveQueue={leaveQueue}>
            {isMobile && "Leave Queue"}
          </LeaveQueueButton>
          <Tooltip title="Edit Question">
            <StyledBannerButton
              data-cy="edit-question"
              icon={<EditOutlined />}
              onClick={editQuestion}
            >
              {isMobile && "Edit Question"}
            </StyledBannerButton>
          </Tooltip>
        </>
      );
    case "Helping":
      return (
        <>
          <LeaveQueueButton leaveQueue={leaveQueue}>
            {isMobile && "Leave Queue"}
          </LeaveQueueButton>
          {isQueueOnline && (
            <Tooltip title="Open Teams DM">
              <StyledBannerButton
                icon={<TeamOutlined />}
                onClick={() => {
                  window.open(
                    `https://teams.microsoft.com/l/chat/0/0?users=${studentQuestion.taHelped.email}`
                  );
                }}
              >
                {isMobile && "Open Teams"}
              </StyledBannerButton>
            </Tooltip>
          )}
        </>
      );
    case "ReQueueing":
      return (
        <>
          <LeaveQueueButton leaveQueue={leaveQueue}>
            {isMobile && "Leave Queue"}
          </LeaveQueueButton>
          <Tooltip title="Rejoin Queue">
            <StyledBannerPrimaryButton
              icon={<UndoOutlined />}
              onClick={async () => {
                await API.questions.update(studentQuestion.id, {
                  status: OpenQuestionStatus.PriorityQueued,
                });
              }}
              data-cy="re-join-queue"
              size="large"
            >
              {isMobile && "Rejoin Queue"}
            </StyledBannerPrimaryButton>
          </Tooltip>
        </>
      );
    default:
      return <div />;
  }
}
