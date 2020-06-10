import { QuestionType, Role } from "@template/common";
import { Card, Row, Col, Avatar, Tag, Button } from "antd";
import { UserOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";

const HorizontalTACard = styled(Card)`
  margin-bottom: 8px;

  &:hover {
    cursor: pointer;
  }
`;

const HorizontalStudentCard = styled(Card)`
  margin-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
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
  role: Role;
  rank: number;
  name: string;
  questionType: QuestionType;
  waitTime: number;
  status: string;
  onOpen: (name: string) => void;
}

export default function QueueCard({
  role,
  rank,
  name,
  questionType,
  waitTime,
  status,
  onOpen,
}: QueueCardProps) {
  return (
    <div>
      {role === "ta" && (
        <HorizontalTACard onClick={() => onOpen(name)}>
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
        </HorizontalTACard>
      )}
      {role === "student" && (
        <HorizontalStudentCard>
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
              <Text>
                {questionType.charAt(0).toUpperCase() +
                  questionType.substr(1).toLowerCase()}
              </Text>
            </Col>
            <Col span={2}>
              <Text>{waitTime}</Text>
            </Col>
            <Col xs={0} lg={2}>
              <StatusTag color="purple">{status}</StatusTag>
            </Col>
          </CenterRow>
        </HorizontalStudentCard>
      )}
    </div>
  );
}
