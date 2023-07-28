import { Question } from "@koh/common";
import { Card, Col } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { getWaitTime } from "../../../utils/TimeUtil";
import { CenterRow, Text } from "../QueueCardSharedComponents";
import { truncate } from "../QueueUtils";

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
  const isMobile = useIsMobile();
  const waitTime = getWaitTime(question);

  return (
    <HorizontalStudentCard
      style={highlighted ? bodyStyle : {}}
      bordered={!highlighted}
      bodyStyle={isMobile ? { padding: "20px 10px" } : {}}
    >
      <CenterRow>
        <Col flex={isMobile ? "0 0 30px" : "0 0 64px"}>
          <Text>{rank}</Text>
        </Col>
        <Col flex="1 1">
          <Text>
            {isMobile
              ? truncate(question.text, 30)
              : truncate(question.text, 150)}
          </Text>
        </Col>
        <Col flex={isMobile ? "0 0 70px" : "0 0 80px"}>
          <Text>{isMobile ? truncate(waitTime, 10) : waitTime}</Text>
        </Col>
      </CenterRow>
    </HorizontalStudentCard>
  );
}
