import { UserOutlined } from "@ant-design/icons";
import { QuestionType } from "@template/common";
import { Avatar, Button, Card, Col, Popconfirm, Row } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";
import { toOrdinal } from "../../utils/ordinal";

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
}: EditableQuestionProps): ReactElement {
  return (
    <EditableQuestionCard>
      <Row>
        <Col span={7}>
          <Avatar src={photoUrl} size={64} icon={<UserOutlined />} />
        </Col>
        <Col span={17}>
          <HeadingText>your spot</HeadingText>
          <SpotNum>{toOrdinal(position)}</SpotNum>
          <HeadingText>type</HeadingText>
          <InfoText>{type}</InfoText>
          <HeadingText>question</HeadingText>
          <InfoText>{text}</InfoText>
          <HeadingText>location</HeadingText>
          <InfoText>{location}</InfoText>
        </Col>
      </Row>
      <Row style={{ marginBottom: 8 }}>
        <TopButton onClick={openEdit}>Edit Question</TopButton>
      </Row>
      <Popconfirm
        title={`Are you sure you want to leave the queue?`}
        okText="Yes"
        cancelText="No"
        onConfirm={leaveQueue}
      >
        <Row>
          <BottomButton danger data-cy="leave-queue">Leave Queue</BottomButton>
        </Row>
      </Popconfirm>
    </EditableQuestionCard>
  );
}
