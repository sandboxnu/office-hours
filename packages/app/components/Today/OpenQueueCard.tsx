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

  const updateNotes = (value: any) => {
    const notes = (value.target as any).value;
    API.queues.updateNotes(queue.id, notes);
    queue.notes = notes;
    setEditingNotes(false);
  };

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
            <Input defaultValue={queue.notes} onPressEnter={updateNotes} />
          ) : (
            <p>{queue.notes}</p>
          )}
        </div>
      )}
      {!queue.notes &&
        (editingNotes ? (
          <Input onPressEnter={updateNotes} />
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
