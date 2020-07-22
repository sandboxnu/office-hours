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
} from "./QueueCardSharedComponents";
interface TAQueueCardProps {
  rank: number;

  question: Question;
  onOpen: (question: Question) => void;
}

export default function TAQueueCard({
  rank,
  question,
  onOpen,
}: TAQueueCardProps): ReactElement {
  return (
    <HorizontalTACard onClick={() => onOpen(question)}>
      <CenterRow justify="space-between">
        <Col xs={2} lg={1}>
          <Rank>{rank}</Rank>
        </Col>
        <Col xs={14} sm={11} lg={5}>
          <CenterRow>
            <Photo icon={<UserOutlined />} src={question.creator.photoURL} />
            <Text>{question.creator.name}</Text>
          </CenterRow>
        </Col>
        <Col xs={0} lg={2}>
          <Text>
            {question.questionType.charAt(0).toUpperCase() +
              question.questionType.substr(1).toLowerCase()}
          </Text>
        </Col>
        <Col xs={0} lg={7}>
          <Text>{question.text}</Text>
        </Col>
        <Col xs={0} lg={2}>
          <Text>
            {
              30 //figure out later
            }
          </Text>
        </Col>
        <Col span={2}>
          <StatusTag color="purple">{question.status}</StatusTag>
        </Col>
        <Col>
          <RightOutlined />
        </Col>
      </CenterRow>
    </HorizontalTACard>
  );
}
