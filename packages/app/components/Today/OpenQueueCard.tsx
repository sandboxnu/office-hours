import { EditOutlined } from "@ant-design/icons";
import { API } from "@template/api-client";
import { Avatar, Button, Card, Input } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { QueuePartial } from "../../../common/index";

type OpenQueueCard = {
  queue: QueuePartial;
  isTA: boolean;
  updateQueueNotes: Function;
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

const OpenQueueCard = ({ queue, isTA, updateQueueNotes }: OpenQueueCard) => {
  const [editingNotes, setEditingNotes] = useState(false);
  const [updatedNotes, setUpdatedNotes] = useState(queue.notes);
  const staffList = queue.staffList;

  const handleUpdate = () => {
    setEditingNotes(false);
    updateQueueNotes(queue.id, updatedNotes);
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

      {editingNotes ? (
        <div>
          <b>Staff Notes:</b>
          <Button
            type="primary"
            size="small"
            onClick={handleUpdate}
            style={{ float: "right" }}
          >
            Save
          </Button>
          <Input
            defaultValue={queue.notes}
            onPressEnter={handleUpdate}
            value={updatedNotes}
            onChange={(e) => setUpdatedNotes(e.target.value as any)}
          />
        </div>
      ) : queue.notes ? (
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
          <p>{queue.notes}</p>
        </div>
      ) : (
        <EditOutlinedFloatedRight
          onClick={() => {
            setEditingNotes(true);
          }}
        />
      )}

      {staffList.map((staffMember) => (
        <AvatarContainer key={staffMember.id}>
          <Avatar size={128} src={staffMember.photoURL} shape="square" />
        </AvatarContainer>
      ))}
    </PaddedCard>
  );
};

export default OpenQueueCard;
