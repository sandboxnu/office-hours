import { Question } from "@template/common";
import { Card, Col } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";
import { getWaitTime } from "../../utils/TimeUtil";
import { CenterRow, Text } from "./QueueCardSharedComponents";

const HorizontalStudentCard = styled(Card)`
  margin-bottom: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  border-radius: 6px;
  padding-left: 8px;
  padding-right: 8px;
  color: #595959;
`;

const bodyStyle = {
  backgroundColor: "#F6FFED",
};

interface StudentQueueCardProps {
  question: Question;
  rank: number;
  highlighted: boolean;
}

/**
 * Renders the queue card and its contents for a student viewing.
 */
export default function StudentQueueCard({
  question,
  rank,
  highlighted,
}: StudentQueueCardProps): ReactElement {
  return (
    <HorizontalStudentCard
      style={highlighted ? bodyStyle : {}}
      bordered={!highlighted}
    >
      <CenterRow>
        <Col flex="0 0 64px">
          <Text>{rank}</Text>
        </Col>
        <Col flex="1 1">
          <Text>{question.text}</Text>
        </Col>
        <Col flex="0 0 80px">
          <Text>{getWaitTime(question)}</Text>
        </Col>
      </CenterRow>
    </HorizontalStudentCard>
  );
}
