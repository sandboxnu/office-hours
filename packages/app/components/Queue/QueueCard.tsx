import { QuestionType } from "@template/common";
import { Card, Row, Col, Avatar, Tag, Button } from "antd";
import { UserOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";

const HorizontalCard = styled(Card)`
  margin-bottom: 8px;

  &:hover {
    cursor: pointer;
  }
`;

const Photo = styled(Avatar)`
  margin-right: 16px;

  @media (max-width: 992px) {
    display: none;
  }
`;

const Rank = styled.div`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: #595959;
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #595959;
`;

const StatusTag = styled(Tag)`
  width: 96px;
  text-align: center;
  float: right;
  margin-right: 0;
`;

const CenterRow = styled(Row)`
  align-items: center;
`;

interface QueueCardProps {
  rank: number;
  name: string;
  questionType: QuestionType;
  waitTime: number;
  status: string;
  onOpen: (name: string) => void;
}

export default function QueueCard({
  rank,
  name,
  questionType,
  waitTime,
  status,
  onOpen,
}: QueueCardProps) {
  return (
    <HorizontalCard onClick={() => onOpen(name)}>
      <CenterRow justify="space-between">
        <Col xs={2} lg={1}>
          <Rank>{rank}</Rank>
        </Col>
        <Col xs={14} sm={11} lg={5}>
          <CenterRow>
            <Photo icon={<UserOutlined />} />
            <Text>{name}</Text>
          </CenterRow>
        </Col>
        <Col xs={0} lg={2}>
          <Text>
            {questionType.charAt(0).toUpperCase() +
              questionType.substr(1).toLowerCase()}
          </Text>
        </Col>
        <Col xs={0} lg={7}>
          <Text>
            Help with working out how to use an accumulator for problem 1
          </Text>
        </Col>
        <Col xs={0} lg={2}>
          <Text>{waitTime}</Text>
        </Col>
        <Col span={2}>
          <StatusTag color="purple">{status}</StatusTag>
        </Col>
        <Col>
          <RightOutlined />
        </Col>
      </CenterRow>
    </HorizontalCard>
  );
}
