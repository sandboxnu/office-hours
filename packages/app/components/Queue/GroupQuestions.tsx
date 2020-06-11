import React, { useMemo } from "react";
import styled from "styled-components";
import { Card, Row, Col, Checkbox, Collapse, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

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

const GroupQuestions = () => {
  return useMemo(() => {
    return (
      <Collapse>
        <Panel header="Select similar questions to help a group" key="1">
          <QuestionCard bodyStyle={{ padding: "16px" }}>
            <CenterRow justify="space-between">
              <Col span={22}>
                <QuestionText>
                  How to keep track of count while using recursion
                </QuestionText>
              </Col>
              <Col span={1}>
                <Checkbox />
              </Col>
            </CenterRow>
          </QuestionCard>
          <QuestionCard bodyStyle={{ padding: "16px" }}>
            <CenterRow justify="space-between">
              <Col span={22}>
                <QuestionText>Need help fixing a bug</QuestionText>
              </Col>
              <Col span={1}>
                <Checkbox />
              </Col>
            </CenterRow>
          </QuestionCard>
          <QuestionCard bodyStyle={{ padding: "16px" }}>
            <CenterRow justify="space-between">
              <Col span={22}>
                <QuestionText>
                  Confusion with design recipe/accumulators
                </QuestionText>
              </Col>
              <Col span={1}>
                <Checkbox />
              </Col>
            </CenterRow>
          </QuestionCard>
          <AddButton icon={<UserAddOutlined />} block type="primary">
            Add Questions
          </AddButton>
        </Panel>
      </Collapse>
    );
  }, []);
};

export default GroupQuestions;
