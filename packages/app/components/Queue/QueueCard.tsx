import { Card, Row, Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

const HorizontalCard = styled(Card)`
  margin-bottom: 8px;
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
`;

const CenterRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
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
      <CenterRow>
        <div>
          <CenterRow>
            <RankContainer>
              <Text>{rank}</Text>
            </RankContainer>
            <ProfileContainer>
              <CenterRow>
                <Avatar icon={<UserOutlined />} />
                <NameContainer>
                  <Text>{name}</Text>
                </NameContainer>
              </CenterRow>
            </ProfileContainer>
            <TypeContainer>
              <Text>{questionType}</Text>
            </TypeContainer>
          </CenterRow>
        </div>
        <div>
          <CenterRow>
            <WaitContainer>
              <Text>{waitTime}</Text>
            </WaitContainer>
            <StatusContainer>
              <StatusTag color="purple">{status}</StatusTag>
            </StatusContainer>
          </CenterRow>
        </div>
      </CenterRow>
    </HorizontalCard>
  );
}
