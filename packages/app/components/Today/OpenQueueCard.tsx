import { StopOutlined } from "@ant-design/icons";
import { Button, Card, Input, Row, Skeleton, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { QueuePartial } from "../../../common/index";
import { formatQueueTime } from "../../utils/TimeUtil";
import AvatarWithInitals from "../common/AvatarWithInitials";

type OpenQueueCard = {
  queue: QueuePartial;
  isTA: boolean;
  updateQueueNotes: (queue: QueuePartial, queueNotes: string) => Promise<void>;
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

const QueueInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RightQueueInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const AvatarWithMargin = styled(AvatarWithInitals)`
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
    updateQueueNotes(queue, updatedNotes);
  };

  return (
    <PaddedCard
      headStyle={{ background: "#F3F5F7" }}
      className={"open-queue-card"}
      title={
        staffList.map((staffMember) => staffMember.name).join(", ") ||
        "No Staff Checked In!"
      }
      extra={queue.startTime && queue.endTime && formatQueueTime(queue)}
    >
      <QueueInfoRow>
        <HeaderDiv>{queue.room}</HeaderDiv>
        <RightQueueInfoRow>
          {!queue.allowQuestions && (
            <Tooltip title="This queue is no longer accepting questions">
              <StopOutlined
                style={{ color: "red", fontSize: "24px", marginRight: "8px" }}
              />
            </Tooltip>
          )}
          <QueueSizeColorDiv>
            <QuestionNumberSpan>{queue.queueSize}</QuestionNumberSpan> in queue
          </QueueSizeColorDiv>
        </RightQueueInfoRow>
      </QueueInfoRow>

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

      {
        staffList.length > 1 && (
          <HeaderText>checked-in staff</HeaderText>
        ) /*todo: add better text*/
      }

      <Row justify="space-between" align="bottom">
        {
          // TODO: bring back photo URL && get rid of RegeX
          // src={staffMember.photoURL}
        }
        <div>
          {staffList.map((staffMember) => (
            <Tooltip key={staffMember.id} title={staffMember.name}>
              <AvatarWithMargin
                size={96}
                fontSize={40}
                name={staffMember.name}
              />
            </Tooltip>
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
              <OpenQueueButton
                type="primary"
                size="large"
                data-cy="open-queue-button"
              >
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
