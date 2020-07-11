import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Input, Row } from "antd";
import { useRouter } from "next/router";
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
  border-radius: 6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
`;

const EditOutlinedFloatedRight = styled(EditOutlined)`
  float: right;
`;

const HeaderDiv = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #212934;
`;

const QuestionNumberSpan = styled.span`
  font-size: 24px;
`;

const QueueSizeColorDiv = styled.div`
  color: #212934;
  font-size: 16px;
`;

const HeaderText = styled.div`
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: #bfbfbf;
  font-variant: small-caps;
  margin-bottom: 8px;
`;

const AvatarWithMargin = styled(Avatar)`
  margin-right: 25px;
`;

const OpenQueueButton = styled(Button)`
  background-color: #3684c6;
  border-radius: 6px;
  color: white;
  font-weight: 500;
`;

const OpenQueueCard = ({ queue, isTA, updateQueueNotes }: OpenQueueCard) => {
  const [editingNotes, setEditingNotes] = useState(false);
  const [updatedNotes, setUpdatedNotes] = useState(queue.notes);
  const router = useRouter();
  const { cid } = router.query;

  const staffList = queue.staffList;

  const handleUpdate = () => {
    setEditingNotes(false);
    updateQueueNotes(queue.id, updatedNotes);
  };

  return (
    <PaddedCard
      headStyle={{ background: "#F3F5F7" }}
      title={staffList.map((staffMember) => staffMember.name).join(", ")}
      extra={
        <div>
          //TODO: eventually time might be here. But that day is not today. Ask
          Chinese Man
        </div>
      }
    >
      <Row justify="space-between">
        <HeaderDiv>{queue.room}</HeaderDiv>
        <QueueSizeColorDiv>
          <QuestionNumberSpan>{queue.queueSize}</QuestionNumberSpan> in queue
        </QueueSizeColorDiv>
      </Row>
      <br />

      {editingNotes ? (
        <div>
          <HeaderText>staff notes</HeaderText>
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
            <HeaderText>staff notes</HeaderText>
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
      <br />

      <HeaderText>checked-in staff</HeaderText>

      <Row justify="space-between" align="bottom">
        <div>
          {staffList.map((staffMember) => (
            <AvatarWithMargin
              key={staffMember.id}
              size={96}
              src={staffMember.photoURL}
              shape="circle"
            />
          ))}
        </div>
        <Button
          onClick={() => {
            setEditingNotes(true);
          }}
        >
          Edit Notes
        </Button>
        <OpenQueueButton size={"large"}>Open Queue</OpenQueueButton>
      </Row>
    </PaddedCard>
  );
};

export default OpenQueueCard;
