import { UserOutlined } from "@ant-design/icons";
import {
  ClosedQuestionStatus,
  OpenQuestionStatus,
  Question,
  QuestionStatus,
} from "@template/common";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Popconfirm,
  Row,
  Tag,
  Tooltip,
} from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

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
  wait: number;
  visible: boolean;
  question: Question;
  isStaffCheckedIn: boolean;
}

const StudentPopupCard = ({
  updateQuestion,
  onClose,
  wait,
  question,
  visible,
  isStaffCheckedIn,
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
              onConfirm={() => {
                onClose();
                updateQuestion(question, ClosedQuestionStatus.Deleted);
              }}
            >
              <RemoveButton danger block disabled={!isStaffCheckedIn}>
                Remove from Queue
              </RemoveButton>
            </Popconfirm>
          </Tooltip>
          <Tooltip
            title={!isStaffCheckedIn && "You must check in to help students!"}
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
              disabled={!isStaffCheckedIn}
              data-cy="help-student"
            >
              Help
            </Button>
          </Tooltip>
        </ButtonDiv>
      }
    >
      <Container>
        <Avatar size={104} src={question.creator.photoURL} />

        <InfoTextDiv>
          <Title>{question.creator.name}</Title>
          <Email>{question.creator.email}</Email>
        </InfoTextDiv>

        <StatusTag color="purple">{question.status}</StatusTag>

        <StyledRow gutter={[8, 0]}>
          <Col span={12}>
            <HeadingText>wait</HeadingText>
            <BodyText>{wait}</BodyText>
          </Col>
          <Col span={12}>
            <HeadingText>type</HeadingText>
            <BodyText>{question.questionType.toString()}</BodyText>
          </Col>
        </StyledRow>

        <FullWidth>
          <HeadingText>question</HeadingText>
          <BodyText>{question.text}</BodyText>
        </FullWidth>
        <FullWidth>
          <HeadingText>location</HeadingText>
          <BodyText>
            {question.location || (question.isOnline && "Online")}
          </BodyText>
        </FullWidth>
      </Container>
    </Drawer>
  );
};

export default StudentPopupCard;
