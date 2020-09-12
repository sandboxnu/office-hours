import { RightOutlined } from "@ant-design/icons";
import { OpenQuestionStatus, Question } from "@koh/common";
import { Col } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";
import { getWaitTime } from "../../../utils/TimeUtil";
import AvatarWithInitals from "../../common/AvatarWithInitials";
import {
  CenterRow,
  HorizontalTACard,
  questionStatusToColor,
  Rank,
  StatusTag,
  Text,
} from "../QueueCardSharedComponents";

const AvatarWithMargin = styled(AvatarWithInitals)`
  margin-right: 16px;
`;

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
    <HorizontalTACard onClick={() => onOpen(question)} data-cy="ta-queue-card">
      <CenterRow justify="space-between">
        <Col xs={2} lg={1}>
          <Rank>{rank}</Rank>
        </Col>
        <Col xs={14} sm={11} lg={5}>
          <CenterRow>
            {
              //bring back photo URL && get rid of RegeX
              /*<Photo icon={<UserOutlined />} src={question.creator.photoURL} />*/
            }
            <AvatarWithMargin
              size={32}
              fontSize={16}
              name={question.creator.name}
            />
            <Text>{question.creator.name}</Text>
          </CenterRow>
        </Col>
        <Col xs={0} lg={2}>
          <Text>{question.questionType}</Text>
        </Col>
        <Col xs={0} lg={7}>
          <Text>{question.text}</Text>
        </Col>
        <Col xs={0} lg={2}>
          <Text>{getWaitTime(question)}</Text>
        </Col>
        <Col span={2}>
          <StatusTag color={questionStatusToColor(question.status)}>
            {question.status === OpenQuestionStatus.CantFind
              ? "Can't Find"
              : question.status}
          </StatusTag>
        </Col>
        <Col>
          <RightOutlined />
        </Col>
      </CenterRow>
    </HorizontalTACard>
  );
}
