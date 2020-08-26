import Banner, { BannerButton, BannerDangerButton } from "./Banner";
import styled from "styled-components";
import { Col, Popconfirm } from "antd";
import { toOrdinal } from "../../utils/ordinal";
import { useStudentQuestion } from "../../hooks/useStudentQuestion";
import {
  TeamOutlined,
  DeleteRowOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { ReactElement } from "react";
import { API } from "@template/api-client";
import { useDraftQuestion } from "../../hooks/useDraftQuestion";

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
              <BannerButton icon={<DeleteRowOutlined />} onClick={leaveQueue}>
                Delete Draft
              </BannerButton>
              <BannerButton
                data-cy="edit-question"
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
              <Col flex="1 1">
                <InfoHeader>question</InfoHeader>
                <div>{studentQuestion.text}</div>
              </Col>
              <Col flex="0 0 60px">
                <InfoHeader>type</InfoHeader>
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
