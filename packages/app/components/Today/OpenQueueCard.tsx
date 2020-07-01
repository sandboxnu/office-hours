import { EditOutlined } from "@ant-design/icons";
import { API } from "@template/api-client";
import { Avatar, Button, Card, Input } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { QueuePartial } from "../../../common/index";

type OpenQueueCard = {
  queue: QueuePartial;
  isTA: boolean;
};

const PaddedCard = styled(Card)`
  margin-bottom: 25px;
`;

const AvatarContainer = styled.div`
  padding-left: 25px;
  padding-right: 25px;
  float: left;
`;

const EditOutlinedFloatedRight = styled(EditOutlined)`
  float: right;
`;

const OpenQueueCard = ({ queue, isTA }: OpenQueueCard) => {
  const [editingNotes, setEditingNotes] = useState(false);
  const staffList = queue.staffList;
  return (
    <PaddedCard
      title={staffList.map((staffMember) => staffMember.name).join(", ")}
      extra={
        <Button type="primary" size={"middle"}>
          Join Queue
        </Button>
      }
    >
      <h1>{queue.room}</h1>

      {queue.notes && (
        <div>
          <div>
            <b>Staff Notes:</b>
            {isTA && (
              <EditOutlinedFloatedRight
                onClick={() => {
                  setEditingNotes(true);
                }}
              />
            )}
          </div>
          {editingNotes ? (
            <Input
              defaultValue={queue.notes}
              onPressEnter={(value) => {
                API.queues.updateNotes(queue.id, (value.target as any).value);
                queue.notes = (value.target as any).value;
                setEditingNotes(false);
              }}
            />
          ) : (
            <p>{queue.notes}</p>
          )}
        </div>
      )}
      {!queue.notes &&
        (editingNotes ? (
          <Input
            defaultValue={queue.notes}
            onPressEnter={(value) => {
              API.queues.updateNotes(queue.id, (value.target as any).value);
              queue.notes = (value.target as any).value;
              setEditingNotes(false);
            }}
          />
        ) : (
          isTA && (
            <EditOutlinedFloatedRight
              onClick={() => {
                setEditingNotes(true);
              }}
            />
          )
        ))}

      {staffList.map((staffMember) => (
        <AvatarContainer key={staffMember.id}>
          <Avatar size={128} src={staffMember.photoURL} shape="square" />
        </AvatarContainer>
      ))}
    </PaddedCard>
  );
};

export default OpenQueueCard;
