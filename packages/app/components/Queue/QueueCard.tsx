import { RightOutlined, UserOutlined } from "@ant-design/icons";
import { Question, Role } from "@template/common";
import { Avatar, Card, Col, Row, Tag } from "antd";
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
  helping: boolean;
  rank: number;
  waitTime: number;
  question: Question;
  onOpen: (question: Question) => void;
}

export default function QueueCard({
  role,
  helping,
  rank,
  waitTime,
  question,
  onOpen,
}: QueueCardProps) {
  /**
   * Renders the queue card and its contents for a TA to view when they aren't helping anyone.
   */
  const renderTACard = () => {
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
  };

  /**
   * Renders the queue card and its contents for a TA that is helping someone.
   */
  const renderHelpingCard = () => {
    return (
      <HorizontalTACard onClick={() => onOpen(question)}>
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
            <Text>{waitTime}</Text>
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
  };

  /**
   * Renders the queue card and its contents for a student viewing.
   */
  const renderStudentCard = () => {
    return (
      <HorizontalStudentCard>
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
            <StatusTag color="purple">{question.status}</StatusTag>
          </Col>
        </CenterRow>
      </HorizontalStudentCard>
    );
  };

  return (
    <div>
      {role === "ta" && !helping && renderTACard()}
      {role === "ta" && helping && renderHelpingCard()}
      {role === "student" && renderStudentCard()}
    </div>
  );
}
