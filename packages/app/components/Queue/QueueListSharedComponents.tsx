import { QueuePartial } from "@template/common";
import { Avatar, Col, Tooltip } from "antd";
import { ReactElement } from "react";
import styled from "styled-components";

const QueueTitle = styled.div`
  font-weight: 500;
  font-size: 30px;
  color: #212934;
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
    <>
      <Col span={4}>
        <QueueTitle>{queue?.room}</QueueTitle>
      </Col>
      <Col span={4}></Col>
      {/* If you need times, check out https://github.com/sandboxnu/office-hours/commit/24b4f2e0c9b80b8288f96ea85a8d48222dcff032 */}
      <Col span={4}>
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
      </Col>
    </>
  );
}
