import { UserOutlined } from "@ant-design/icons";
import { Question } from "@template/common";
import { Avatar, Card, Col } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";
import {
  CenterRow,
  questionStatusToColor,
  StatusTag,
  Text,
} from "./QueueCardSharedComponents";

const HorizontalStudentCard = styled(Card)`
  margin-bottom: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  border-radius: 6px;
  padding-left: 8px;
  padding-right: 8px;
  color: #595959;
`;

const NameContainer = styled.div`
  margin-left: 16px;
`;

const bodyStyle = {
  backgroundColor: "#F6FFED",
};

interface StudentQueueCardProps {
  question: Question;
  waitTime: number;
  rank: number;
  highlighted: boolean;
}

/**
 * Renders the queue card and its contents for a student viewing.
 */
export default function StudentQueueCard({
  question,
  waitTime,
  rank,
  highlighted,
}: StudentQueueCardProps): ReactElement {
  return (
    <HorizontalStudentCard
      style={highlighted ? bodyStyle : {}}
      bordered={!highlighted}
    >
      <CenterRow justify="space-between">
        <Col span={1}>
          <Text>{rank}</Text>
        </Col>
        <Col xs={16} sm={11} lg={6}>
          <CenterRow>
            <Avatar icon={<UserOutlined />} src={question.creator.photoURL} />
            <NameContainer>
              <Text>{question.creator.name}</Text>
            </NameContainer>
          </CenterRow>
        </Col>
        <Col xs={0} lg={2}>
          <Text>
            {question.questionType.charAt(0).toUpperCase() +
              question.questionType.substr(1).toLowerCase()}
          </Text>
        </Col>
        <Col span={2}>
          <Text>{waitTime}</Text>
        </Col>
        <Col xs={0} lg={2}>
          <StatusTag color={questionStatusToColor(question.status)}>
            {question.status}
          </StatusTag>
        </Col>
      </CenterRow>
    </HorizontalStudentCard>
  );
}
