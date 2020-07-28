import { RightOutlined, UserOutlined } from "@ant-design/icons";
import { Question } from "@template/common";
import { Col } from "antd";
import { ReactElement } from "react";
import {
  CenterRow,
  HorizontalTACard,
  Photo,
  Rank,
  StatusTag,
  Text,
  questionStatusToColor,
} from "./QueueCardSharedComponents";

interface TAHelpingQueueCardProps {
  rank: number;
  question: Question;
}

export default function TAHelpingCard({
  rank,
  question,
}: TAHelpingQueueCardProps): ReactElement {
  return (
    <HorizontalTACard>
      <CenterRow justify="space-between">
        <Col xs={2} lg={1}>
          <Rank>{rank}</Rank>
        </Col>
        <Col xs={14} sm={9} lg={11} xl={9} xxl={4}>
          <CenterRow>
            <Photo icon={<UserOutlined />} src={question.creator.photoURL} />
            <Text>{question.creator.name}</Text>
          </CenterRow>
        </Col>
        <Col xs={0} xxl={7}>
          <Text>{question.text}</Text>
        </Col>
        <Col xs={0} xl={3}>
          <Text>30</Text>
        </Col>
        <Col span={2}>
          <StatusTag color={questionStatusToColor(question.status)}>
            {question.status}
          </StatusTag>
        </Col>
        <Col>
          <RightOutlined />
        </Col>
      </CenterRow>
    </HorizontalTACard>
  );
}
