import { QueuePartial } from "@template/common";
import {
  ClockCircleFilled,
  ClockCircleOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { formatQueueTime } from "../../utils/TimeUtil";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const QueueTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #212934;
  margin-bottom: 24px;
`;

const TimeText = styled.div`
  font-size: 16px;
  color: #5f6b79;
  margin-left: 12px;
`;

const NotesText = styled.div`
  font-size: 16px;
  color: #5f6b79;
`;

// New queue styled components start here

const InfoColumnContainer = styled.div`
  padding-right: 48px;
  border-right: 1px solid #cfd6de;
  width: 292px;
`;

const QueuePropertyRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; // This kinda funky, not sure how to align the tops of the row
  margin-bottom: 20px;
  color: #5f6b79;
  font-size: 20px;
`;

const QueuePropertyText = styled.div`
  margin-left: 12px;
  font-size: 16px;
`;

interface QueueInfoColumnProps {
  queue: QueuePartial;
}

export function QueueInfoColumn({ queue }: QueueInfoColumnProps): ReactElement {
  return (
    <InfoColumnContainer>
      <QueueTitle>{queue?.room}</QueueTitle>
      <QueuePropertyRow>
        <ClockCircleOutlined />
        <QueuePropertyText>{formatQueueTime(queue)}</QueuePropertyText>
      </QueuePropertyRow>
      {queue?.notes && (
        <QueuePropertyRow>
          <NotificationOutlined />
          <QueuePropertyText>{queue.notes}</QueuePropertyText>
        </QueuePropertyRow>
      )}
    </InfoColumnContainer>
  );
}

interface QueueListHeaderProps {
  queue: QueuePartial;
}

export default function QueueListHeader({
  queue,
}: QueueListHeaderProps): ReactElement {
  return (
    <Container>
      <QueueTitle>{queue?.room}</QueueTitle>
      {queue.startTime && queue.endTime && (
        <Container style={{ marginLeft: "64px" }}>
          <ClockCircleFilled />
          <TimeText>{formatQueueTime(queue)}</TimeText>
        </Container>
      )}
      {queue?.notes && (
        <Container style={{ marginLeft: "64px" }}>
          <NotesText>
            <b>Notes: </b>
            {queue.notes}
          </NotesText>
        </Container>
      )}
    </Container>
  );
}
