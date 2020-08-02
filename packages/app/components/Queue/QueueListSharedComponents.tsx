import { QueuePartial } from "@template/common";
import { Avatar, Tooltip } from "antd";
import { ClockCircleFilled } from "@ant-design/icons";
import { ReactElement } from "react";
import styled from "styled-components";

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
      <Container style={{ marginLeft: "64px" }}>
        {/* If you need times, check out https://github.com/sandboxnu/office-hours/commit/24b4f2e0c9b80b8288f96ea85a8d48222dcff032
            TODO: This is hardcoded for now to not look weird in demo, but I think we need times. */}
        <ClockCircleFilled />
        <TimeText>2:00 PM - 4:00 PM</TimeText>
      </Container>
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
