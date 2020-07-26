import { ClockCircleFilled } from "@ant-design/icons";
import { QueuePartial } from "@template/common";
import { Col, Row, Tooltip, Avatar } from "antd";
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
      <Col span={4}>
        {queue?.time /*temp, if times get added res this, and clean it up*/ ? (
          <Row align="middle">
            <div
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ClockCircleFilled
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
              />
              <h3>
                {queue?.time?.start.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                aaa - bbb
                {queue?.time?.end.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h3>
            </div>
          </Row>
        ) : null}
      </Col>
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
