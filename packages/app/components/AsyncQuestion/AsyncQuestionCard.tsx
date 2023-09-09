import { Button, Card, Divider, Row, Skeleton, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import styled from "styled-components";

const PaddedCard = styled(Card)`
  margin-top: 32px;
  margin-bottom: 25px;
  border-radius: 6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
`;

const HeaderDiv = styled.div`
  font-size: 18px;
  color: #212934;
`;

const QueueInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RightQueueInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const OpenQueueButton = styled(Button)`
  color: #5f6b79;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  margin-left: 16px;
`;

const QueueCardDivider = styled(Divider)`
  margin-top: 12px;
  margin-bottom: 0;
`;

const NotesSkeleton = styled(Skeleton)`
  width: 60%;
`;

const AsyncQuestionCard = (): ReactElement => {
  const router = useRouter();
  const { cid } = router.query;
  return (
    <PaddedCard
      headStyle={{
        background: "#25426C",
        color: "#FFFFFF",
        borderRadius: "6px 6px 0 0",
      }}
      className={"open-queue-card"}
      title="Async Question center"
      extra={<span>Ask your questions any time!</span>}
    >
      <QueueInfoRow>
        <HeaderDiv>
          {/* <QuestionNumberSpan>{queue.staffList.length}</QuestionNumberSpan>{" "} */}
          staff checked in
        </HeaderDiv>
        <RightQueueInfoRow>
          <Space direction="vertical" align="end" size="middle">
            <Link
              href="/course/[cid]/async_question"
              as={`/course/${cid}/async_question`}
            >
              <OpenQueueButton
                style={{}}
                size="large"
              >
                Open Queue
              </OpenQueueButton>
            </Link>
          </Space>
        </RightQueueInfoRow>
      </QueueInfoRow>

      <Row justify="space-between" align="middle"></Row>
    </PaddedCard>
  );
};

export default AsyncQuestionCard;

export function QueueCardSkeleton(): ReactElement {
  return (
    <PaddedCard
      headStyle={{
        background: "#25426C",
        color: "#FFFFFF",
        borderRadius: "6px 6px 0 0",
      }}
      className={"open-queue-card"}
      title={<Skeleton title={false} paragraph={{ rows: 1 }} />}
    >
      <QueueInfoRow>
        <Skeleton title paragraph={{ rows: 0 }} />
        <Skeleton.Button size="large" />
      </QueueInfoRow>
      <Skeleton.Avatar size={96} />
      <QueueCardDivider />
      <Row justify="space-between" align="bottom">
        <NotesSkeleton title={false} paragraph={{ rows: 1 }} />
        <Skeleton.Button size="large" style={{ marginTop: "12px" }} />
      </Row>
    </PaddedCard>
  );
}
