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

const RankContainer = styled.div`
  margin-left: 32px;
`;

const ProfileContainer = styled.div`
  position: absolute;
  left: 128px;
`;

const NameContainer = styled.div`
  margin-left: 16px;
`;

const TypeContainer = styled.div`
  position: absolute;
  left: 440px;
`;

const WaitContainer = styled.div`
  position: absolute;
  right: 272px;
  width: 26.8px;
`;

const StatusContainer = styled.div`
  margin-right: 32px;
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
        <Col span={6}>
          <CenterRow>
            <Avatar icon={<UserOutlined />} />
            <NameContainer>
              <Text>{name}</Text>
            </NameContainer>
          </CenterRow>
        </Col>
        <Col span={2}>
          <Text>{questionType}</Text>
        </Col>
        <Col span={2}>
          <Text>{waitTime}</Text>
        </Col>
        <Col span={3}>
          <StatusTag color="purple">{status}</StatusTag>
        </Col>
      </CenterRow>
    </HorizontalCard>
  );
}
