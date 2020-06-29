import { Question, QuestionType } from "@template/common";
import styled from "styled-components";
import { Button, Tooltip, Card, Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const SpotNum = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 20px;
`;

const QuestionText = styled.div`
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 20px;
  color: #595959;
`;

const EditButton = styled(Button)`
  float: right;
`;

const EditableQuestionCard = styled(Card)`
  width: 370px;
`;

const HeadingText = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 22px;
  color: #bfbfbf;
  font-variant: small-caps;
  margin-bottom: 5px;
`;

const InfoText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #595959;
  margin-bottom: 20px;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

const HeaderText = styled.div`
  margin-top: 13px;
  margin-bottom: 13px;
  font-size: 12px;
  line-height: 22px;
  font-weight: 600;
  color: #bfbfbf;
`;

interface EditableQuestionProps {
  position: number;
  type: QuestionType;
  text: string;
  location: string;
  photoUrl: string;
  openEdit: () => void;
}
export default function EditableQuestion({
  position,
  type,
  text,
  location,
  photoUrl,
  openEdit,
}: EditableQuestionProps) {
  return (
    <div>
      <Row>
        <HeaderText>YOUR QUESTION</HeaderText>
      </Row>
      <Row>
        <EditableQuestionCard>
          <Row>
            <Col span={6}>
              <Avatar size={56} icon={<UserOutlined />} />
            </Col>
            <Col span={18}>
              <HeadingText>YOUR SPOT</HeadingText>
              <SpotNum>{position}rd</SpotNum>
              <HeadingText>TYPE</HeadingText>
              <InfoText>{type}</InfoText>
              <HeadingText>QUESTION</HeadingText>
              <InfoText>{text}</InfoText>
              <HeadingText>LOCATION</HeadingText>
              <InfoText>{location}</InfoText>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <FullWidthButton>AFK</FullWidthButton>
            </Col>
            <Col span={12}>
              <FullWidthButton>EDIT BUTTON</FullWidthButton>
            </Col>
          </Row>
          <Row>
            <FullWidthButton danger>LEAVE THE QUEUE</FullWidthButton>
          </Row>
        </EditableQuestionCard>
      </Row>
    </div>
  );
}
