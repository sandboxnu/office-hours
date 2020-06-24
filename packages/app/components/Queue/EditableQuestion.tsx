import { Question, QuestionType } from "@template/common";
import styled from "styled-components";
import { Button, Tooltip, Card, Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const SpotNum = styled.div`
  font-size: 38px;
  line-height: 46px;
  color: #000000;
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

const EditableQuestionCard = styled(Card)``;

const HeaderText = styled.div`
  margin-top: 13px;
  margin-bottom: 13px;
  font-size: 12px;
  line-height: 22px;
  font-weight: 600;
  color: #bfbfbf;
  font-variant: small-caps;
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
              <Avatar size={64} icon={<UserOutlined />} />
            </Col>
            <Col span={18}>
              <div>Your spot</div>
              <SpotNum>{position}</SpotNum>
              <div>TYPE</div>
              <div>{type}</div>
              <div>QUESTION</div>
              <QuestionText>{text}</QuestionText>
              <div>Location</div>
              <QuestionText>{location}</QuestionText>
            </Col>
          </Row>
        </EditableQuestionCard>
      </Row>
    </div>
  );
}
