import { QueuePartial, Question } from "@template/common";
import {
  ClockCircleFilled,
  ClockCircleOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { formatQueueTime } from "../../utils/TimeUtil";
import { TAStatuses } from "./TAStatuses";
import { Button, Popconfirm } from "antd";
import { useQueue } from "../../hooks/useQueue";
import { useStudentQuestion } from "../../hooks/useStudentQuestion";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const QueueTitle = styled.h2`
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
  @media (min-width: 767px) {
    width: 320px;
  }
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

const JoinButton = styled(Button)`
  background-color: #3684c6;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  font-size: 14px;
`;

const StaffH2 = styled.h2`
  margin-top: 32px;
`;
//TODO: Make QuestionForm self contained so we can trigger it directly in this component and not pass down so many props
interface QueueInfoColumnProps {
  queueId: number;
  fromAnotherQueue: boolean;
  onJoinQueue: (force: boolean) => boolean; // return whether successful
}

export function QueueInfoColumn({
  queueId,
  onJoinQueue,
}: QueueInfoColumnProps): ReactElement {
  const { queue } = useQueue(queueId);
  const { studentQuestion } = useStudentQuestion(queueId);
  const [showJoinPopconfirm, setShowJoinPopconfirm] = useState(false);
  return (
    <InfoColumnContainer>
      <QueueTitle>{queue?.room}</QueueTitle>
      {queue.startTime && queue.endTime && (
        <QueuePropertyRow>
          <ClockCircleOutlined />
          <QueuePropertyText>{formatQueueTime(queue)}</QueuePropertyText>
        </QueuePropertyRow>
      )}
      {queue?.notes && (
        <QueuePropertyRow>
          <NotificationOutlined />
          <QueuePropertyText>{queue.notes}</QueuePropertyText>
        </QueuePropertyRow>
      )}

      {!studentQuestion && (
        <Popconfirm
          title="In order to join this queue, you must delete your previous question. Do you want to continue?"
          onConfirm={() => onJoinQueue(true)}
          okText="Yes"
          cancelText="No"
          visible={showJoinPopconfirm}
          onVisibleChange={setShowJoinPopconfirm}
        >
          <JoinButton
            type="primary"
            size="large"
            block
            onClick={async () =>
              setShowJoinPopconfirm(!(await onJoinQueue(false)))
            }
          >
            Join Queue
          </JoinButton>
        </Popconfirm>
      )}
      <StaffH2>Staff</StaffH2>
      <TAStatuses queueId={queueId} />
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
