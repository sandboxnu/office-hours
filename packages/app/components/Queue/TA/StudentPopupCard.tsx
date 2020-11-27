import { API } from "@koh/api-client";
import {
  LimboQuestionStatus,
  OpenQuestionStatus,
  Question,
  QuestionStatus,
} from "@koh/common";
import { Button, Col, Drawer, Popconfirm, Row, Tag, Tooltip } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";
import { getWaitTime } from "../../../utils/TimeUtil";
import AvatarWithInitals from "../../common/AvatarWithInitials";
import { questionStatusToColor } from "../QueueCardSharedComponents";

const FullWidth = styled.div`
  margin-top: 32px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 24px;
`;

const Email = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #bfbfbf;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;

const InfoTextDiv = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const StatusTag = styled(Tag)`
  width: 96px;
  text-align: center;
  margin: 0 auto;
  margin-top: 12px;
`;

const HeadingText = styled.div`
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: #bfbfbf;
  font-variant: small-caps;
`;

const StyledRow = styled(Row)`
  width: 100%;
  margin-top: 40px;
`;

const ButtonDiv = styled.div`
  padding: 8px;
`;

const RemoveButton = styled(Button)`
  margin-bottom: 8px;
`;

const BodyText = styled.div`
  font-size: 14px;
  line-height: 22px;
  margin-top: 8px;
  color: #595959;
`;

interface StudentPopupCardProps {
  updateQuestion: (question: Question, status: QuestionStatus) => void;
  onClose: () => void;
  visible: boolean;
  question: Question;
  isStaffCheckedIn: boolean;
  isHelping: boolean;
}

const StudentPopupCard = ({
  updateQuestion,
  onClose,
  question,
  visible,
  isStaffCheckedIn,
  isHelping,
}: StudentPopupCardProps): ReactElement => {
  return (
    <Drawer
      placement="right"
      closable={true}
      visible={visible}
      width={272}
      onClose={onClose}
      footer={
        <ButtonDiv>
          <Tooltip
            title={!isStaffCheckedIn && "You must check in to help students!"}
          >
            <Popconfirm
              title="Are you sure you want to delete this question from the queue?"
              okText="Yes"
              cancelText="No"
              onConfirm={async () => {
                await onClose();
                await updateQuestion(question, LimboQuestionStatus.TADeleted);
                await API.questions.notify(question.id);
              }}
              disabled={!isStaffCheckedIn}
            >
              <RemoveButton
                danger
                block
                disabled={!isStaffCheckedIn}
                data-cy="remove-from-queue"
              >
                Remove from Queue
              </RemoveButton>
            </Popconfirm>
          </Tooltip>
          <Tooltip
            title={
              !isStaffCheckedIn
                ? "You must check in to help students!"
                : isHelping && "You are already helping a student"
            }
          >
            <Button
              block
              type="primary"
              onClick={() => {
                updateQuestion(question, OpenQuestionStatus.Helping);
                if (question.isOnline) {
                  window.open(
                    `https://teams.microsoft.com/l/chat/0/0?users=${question.creator.email}`
                  );
                }
              }}
              disabled={
                !isStaffCheckedIn || question.status === "Drafting" || isHelping
              }
              data-cy="help-student"
            >
              Help
            </Button>
          </Tooltip>
        </ButtonDiv>
      }
    >
      <Container>
        {
          //TODO: bring back photo URL && get rid of RegeX
          //src={question.creator.photoURL}
        }
        <AvatarWithInitals
          size={104}
          fontSize={56}
          name={question.creator.name}
        />
        <InfoTextDiv>
          <Title>{question.creator.name}</Title>
          <Email>{question.creator.email}</Email>
        </InfoTextDiv>

        <StatusTag color={questionStatusToColor(question.status)}>
          {question.status === LimboQuestionStatus.CantFind
            ? "Can't Find"
            : question.status}
        </StatusTag>

        <StyledRow gutter={[8, 0]}>
          <Col span={12}>
            <HeadingText>wait</HeadingText>
            <BodyText>{getWaitTime(question)}</BodyText>
          </Col>
          <Col span={12}>
            <HeadingText>type</HeadingText>
            <BodyText>{question.questionType}</BodyText>
          </Col>
        </StyledRow>

        {question.taHelped ? (
          <FullWidth>
            <HeadingText>last helped by</HeadingText>
            <BodyText>{question.taHelped.name}</BodyText>
          </FullWidth>
        ) : null}

        <FullWidth>
          <HeadingText>question</HeadingText>
          <BodyText>{question.text}</BodyText>
        </FullWidth>
        {/* TODO: Add this back for in person office hours */}
        {/* <FullWidth>
          <HeadingText>location</HeadingText>
          <BodyText>
            {question.location || (question.isOnline && "Online")}
          </BodyText>
        </FullWidth> */}
      </Container>
    </Drawer>
  );
};

export default StudentPopupCard;
