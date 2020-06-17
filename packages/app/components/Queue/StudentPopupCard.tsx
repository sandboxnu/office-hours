import { Row, Button, Avatar, Tag, Col, Drawer } from "antd";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import {
  Question,
  QuestionStatus,
  ClosedQuestionStatus,
  OpenQuestionStatus,
} from "@template/common";

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
  email: string;
  wait: number;
  location: string;
  visible: boolean;
  question: Question;
}

const StudentPopupCard = ({
  updateQuestion,
  onClose,
  email,
  wait,
  location,
  question,
  visible,
}: StudentPopupCardProps) => {
  return (
    <Drawer
      placement="right"
      closable={true}
      visible={visible}
      width={272}
      onClose={onClose}
      footer={
        <ButtonDiv>
          <RemoveButton
            danger
            block
            onClick={() => {
              onClose();
              updateQuestion(question, ClosedQuestionStatus.Deleted);
            }}
          >
            Remove from Queue
          </RemoveButton>
          <Button
            block
            type="primary"
            onClick={() => updateQuestion(question, OpenQuestionStatus.Helping)}
          >
            Help
          </Button>
        </ButtonDiv>
      }
    >
      <Container>
        <Avatar size={104} icon={<UserOutlined />} />

        <InfoTextDiv>
          <Title>{question.creator.name}</Title>
          <Email>{email}</Email>
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
          <BodyText>{location}</BodyText>
        </FullWidth>
      </Container>
    </Drawer>
  );
};

export default StudentPopupCard;
