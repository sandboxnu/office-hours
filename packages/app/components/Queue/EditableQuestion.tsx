import { Question, QuestionType } from "@template/common";
import styled from "styled-components";
import { Button, Tooltip, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";

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

const EditableQuestionCard = styled(Card)`
  margin-top: 115px;
`;

interface EditableQuestionProps {
  position: number;
  type: QuestionType;
  text: string;
}
export default function EditableQuestion({
  position,
  type,
  text,
}: EditableQuestionProps) {
  return (
    <EditableQuestionCard>
      <EditButton type="link" icon={<EditOutlined />} onclick={() => {}} />
      <div>Your spot</div>
      <SpotNum>{position}</SpotNum>
      <div>TYPE</div>
      <div>{type}</div>
      <div>QUESTION</div>
      <QuestionText>{text}</QuestionText>
    </EditableQuestionCard>
  );
}
