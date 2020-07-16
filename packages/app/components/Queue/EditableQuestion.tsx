import { Question, QuestionType } from "@template/common";
import styled from "styled-components";
import { Button, Tooltip, Card, Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const EditableQuestionCard = styled(Card)`
  margin-bottom: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  border-radius: 6px;
  color: #595959;
  font-size: 14px;
`;

const SpotNum = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 20px;
`;

const HeadingText = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: #8895a6;
  font-variant: small-caps;
`;

const InfoText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #595959;
  margin-bottom: 20px;
`;

const BottomButton = styled(Button)`
  width: 100%;
  color: #da3236;
  font-weight: 500;
  font-size: 14px;
  background: #f8f9fa;
  border: 1px solid #cfd6de;
  border-radius: 6px;
`;

const TopButton = styled(Button)`
  width: 100%;
  color: #5f6b79;
  font-weight: 500;
  font-size: 14px;
  border: 1px solid #cfd6de;
  border-radius: 6px;
`;

interface EditableQuestionProps {
  position: number;
  type: QuestionType;
  text: string;
  location: string;
  photoUrl: string;
  openEdit: () => void;
  leaveQueue: () => void;
}
export default function EditableQuestion({
  position,
  type,
  text,
  location,
  photoUrl,
  openEdit,
  leaveQueue,
}: EditableQuestionProps) {
  return (
    <EditableQuestionCard>
      <Row>
        <Col span={7}>
          <Avatar size={64} icon={<UserOutlined />} />
        </Col>
        <Col span={17}>
          <HeadingText>your spot</HeadingText>
          <SpotNum>{position}rd</SpotNum>
          <HeadingText>type</HeadingText>
          <InfoText>{type}</InfoText>
          <HeadingText>question</HeadingText>
          <InfoText>{text}</InfoText>
          <HeadingText>location</HeadingText>
          <InfoText>{location}</InfoText>
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }} gutter={[8, 8]}>
        <Col span={12}>
          <TopButton>AFK</TopButton>
        </Col>
        <Col span={12}>
          <TopButton onClick={openEdit}>Edit Question</TopButton>
        </Col>
      </Row>
      <Row>
        <BottomButton danger onClick={leaveQueue}>
          Leave Queue
        </BottomButton>
      </Row>
    </EditableQuestionCard>
  );
}
