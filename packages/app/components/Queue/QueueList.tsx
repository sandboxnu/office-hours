import { Button, Row, Card } from "antd";
import styled from "styled-components";
import QueueCard from "./QueueCard";

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
  margin-right: 88px;
`;

const HeaderCard = styled(Card)`
  height: 64px;
`;

const HeaderText = styled.div`
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: #bfbfbf;
  font-variant: small-caps;
`;

const QueueTitle = styled.h1`
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
`;

const CenterRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
`;

interface QueueListProps {}

export default function QueueList({}: QueueListProps) {
  return (
    <div>
      <Row justify="space-between">
        <QueueTitle>Queue 1</QueueTitle>
        <Button type="primary" size="large">
          Join Queue
        </Button>
      </Row>

      <HeaderCard bordered={false}>
        <CenterRow>
          <div>
            <CenterRow>
              <RankContainer>
                <HeaderText>#</HeaderText>
              </RankContainer>
              <ProfileContainer>
                <HeaderText>name</HeaderText>
              </ProfileContainer>
              <TypeContainer>
                <HeaderText>type</HeaderText>
              </TypeContainer>
            </CenterRow>
          </div>
          <div>
            <CenterRow>
              <WaitContainer>
                <HeaderText>wait</HeaderText>
              </WaitContainer>
              <StatusContainer>
                <HeaderText>status</HeaderText>
              </StatusContainer>
            </CenterRow>
          </div>
        </CenterRow>
      </HeaderCard>

      <QueueCard
        rank={1324}
        name="Alex Takayama"
        questionType="Bug"
        waitTime={30}
        status="WAITING"
      />
      <QueueCard
        rank={2}
        name="Supercalifragilistic"
        questionType="Question"
        waitTime={30}
        status="WAITING"
      />
      <QueueCard
        rank={1}
        name="Stanley Liu"
        questionType="urmom"
        waitTime={100}
        status="IN PROGRESS"
      />
      <QueueCard
        rank={1}
        name="Alex Takayama"
        questionType="Bug"
        waitTime={30}
        status="WAITING"
      />
      <QueueCard
        rank={1}
        name="Alex Takayama"
        questionType="Bug"
        waitTime={30}
        status="WAITING"
      />
    </div>
  );
}
