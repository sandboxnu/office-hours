import { Card, Row, Col, Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

const HorizontalCard = styled(Card)`
  margin-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #595959;
`;

const NameContainer = styled.div`
  margin-left: 16px;
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
  questionType: string;
  waitTime: number;
  status: string;
}

export default function QueueCard({
  rank,
  name,
  questionType,
  waitTime,
  status,
}: QueueCardProps) {
  return (
    <HorizontalCard>
      <CenterRow justify="space-between">
        <Col span={1}>
          <Text>{rank}</Text>
        </Col>
        <Col xs={16} sm={11} lg={6}>
          <CenterRow>
            <Avatar icon={<UserOutlined />} />
            <NameContainer>
              <Text>{name}</Text>
            </NameContainer>
          </CenterRow>
        </Col>
        <Col xs={0} lg={2}>
          <Text>{questionType}</Text>
        </Col>
        <Col span={2}>
          <Text>{waitTime}</Text>
        </Col>
        <Col xs={0} lg={2}>
          <StatusTag color="purple">{status}</StatusTag>
        </Col>
      </CenterRow>
    </HorizontalCard>
  );
}
