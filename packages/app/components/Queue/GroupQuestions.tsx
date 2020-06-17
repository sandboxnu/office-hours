import React, { useMemo, useState, Fragment } from "react";
import styled from "styled-components";
import { Card, Row, Col, Checkbox, Collapse, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Question } from "@template/common";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const { Panel } = Collapse;

const QuestionCard = styled(Card)`
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  margin-bottom: 8px;
`;

const QuestionText = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #595959;
`;

const AddButton = styled(Button)`
  margin-top: 8px;
`;

const CenterRow = styled(Row)`
  align-items: center;
  padding-right: 4px;
`;

interface GroupQuestionProps {
  questions: Question[];
  addQuestions: (selected: Question[]) => void;
}

const GroupQuestions = ({ questions, addQuestions }: GroupQuestionProps) => {
  const [selected, setSelected] = useState<Question[]>([]);

  const onCheck = (e: CheckboxChangeEvent, question: Question) => {
    if (e.target.checked) {
      setSelected((prev) => [...prev, question]);
    } else {
      setSelected(selected.filter((q) => q !== question));
    }
  };

  return (
    <Collapse>
      <Panel header="Select similar questions to help a group" key="1">
        {questions &&
          questions.map((question) => (
            <QuestionCard key={question.id} bodyStyle={{ padding: "16px" }}>
              <CenterRow justify="space-between">
                <Col span={22}>
                  <QuestionText>{question.text}</QuestionText>
                </Col>
                <Col span={1}>
                  <Checkbox
                    onChange={(e: CheckboxChangeEvent) => onCheck(e, question)}
                  />
                </Col>
              </CenterRow>
            </QuestionCard>
          ))}
        <AddButton
          icon={<UserAddOutlined />}
          block
          type="primary"
          onClick={() => addQuestions(selected)}
        >
          Add Questions
        </AddButton>
      </Panel>
    </Collapse>
  );
};

export default GroupQuestions;
