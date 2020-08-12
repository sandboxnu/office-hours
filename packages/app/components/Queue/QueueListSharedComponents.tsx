import { QueuePartial } from "@template/common";
import { Avatar, Tooltip } from "antd";
import { ClockCircleFilled } from "@ant-design/icons";
import { ReactElement } from "react";
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

const AvatarWithMargin = styled(Avatar)`
  margin-right: 10px;
`;

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
      <Container style={{ marginLeft: "64px" }}>
        {queue?.staffList.length > 0 && (
          <>
            <b style={{ marginRight: "10px" }}>Staff:</b>
            {queue.staffList.map((staffMember) => (
              <Tooltip key={staffMember.id} title={staffMember.name}>
                <AvatarWithMargin
                  size={36}
                  src={staffMember.photoURL}
                  shape="circle"
                />
              </Tooltip>
            ))}
          </>
        )}
      </Container>
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
