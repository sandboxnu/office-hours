import { Avatar, Button, Card, Input, Row, Skeleton } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { QueuePartial } from "../../../common/index";

type OpenQueueCard = {
  queue: QueuePartial;
  isTA: boolean;
  updateQueueNotes: (queueID: number, queueNotes: string) => Promise<void>;
};

const PaddedCard = styled(Card)`
  margin-top: 32px;
  margin-bottom: 25px;
  border-radius: 6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
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
  font-size: 14px;
  margin-left: 16px;
`;

const EditNotesButton = styled(Button)`
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
`;

const SaveButton = styled(Button)`
  background: #2a9187;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  font-size: 14px;
`;

const ExtraText = styled.div`
  color: #8895a6;
  font-size: 14px;
  font-weight: normal;
`;

const NotesInput = styled(Input)`
  border-radius: 6px;
  border: 1px solid #b8c4ce;
`;

const OpenQueueCard = ({
  queue,
  isTA,
  updateQueueNotes,
}: OpenQueueCard): ReactElement => {
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
      title={
        staffList.map((staffMember) => staffMember.name).join(", ") ||
        "No Staff Checked In!"
      }
      extra={<ExtraText>//TODO: 3:00 - 5:00</ExtraText>}
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
          <NotesInput
            defaultValue={queue.notes}
            onPressEnter={handleUpdate}
            value={updatedNotes}
            onChange={(e) => setUpdatedNotes(e.target.value as any)}
          />
        </div>
      ) : (
        queue.notes && (
          <React.Fragment>
            <HeaderText style={{ marginBottom: 0 }}>staff notes</HeaderText>
            <div>{queue.notes}</div>
          </React.Fragment>
        )
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
        {editingNotes && (
          <SaveButton onClick={handleUpdate} size="large">
            Save Changes
          </SaveButton>
        )}
        {!editingNotes && (
          <Row>
            {isTA && (
              <EditNotesButton
                size="large"
                onClick={() => {
                  setEditingNotes(true);
                }}
              >
                Edit Notes
              </EditNotesButton>
            )}
            <Link
              href="/course/[cid]/queue/[qid]"
              as={`/course/${cid}/queue/${queue.id}`}
            >
              <OpenQueueButton type="primary" size="large">
                Open Queue
              </OpenQueueButton>
            </Link>
          </Row>
        )}
      </Row>
    </PaddedCard>
  );
};

export default OpenQueueCard;

export function OpenQueueCardSkeleton(): ReactElement {
  return (
    <PaddedCard>
      <Skeleton paragraph={{ rows: 2 }} />
      <Row justify="space-between" align="bottom">
        <Skeleton.Avatar size={96} />
        <Skeleton.Button size="large" />
      </Row>
    </PaddedCard>
  );
}
