import { QueuePartial, Question } from "@template/common";
import {
  ClockCircleFilled,
  ClockCircleOutlined,
  NotificationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React, { ReactElement, useState } from "react";
import { API } from "@template/api-client";
import { Avatar, Input, Switch, Tooltip } from "antd";
import Modal from "antd/lib/modal/Modal";
import styled from "styled-components";
import { useQueue } from "../../hooks/useQueue";
import { formatQueueTime } from "../../utils/TimeUtil";
import { TAStatuses } from "./TAStatuses";
import { Button, Popconfirm } from "antd";
import { useStudentQuestion } from "../../hooks/useStudentQuestion";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const QueueTitle = styled.h2`
  font-weight: 500;
  font-size: 24px;
  color: #212934;
  margin-bottom: 24px;
`;

const TimeText = styled.div`
  font-size: 16px;
  color: #5f6b79;
  margin-left: 12px;
`;

export const NotesText = styled.div`
  font-size: 16px;
  color: #5f6b79;
`;

// New queue styled components start here

const InfoColumnContainer = styled.div`
  flex-shrink: 0;
  @media (min-width: 767px) {
    width: 320px;
  }
`;

const QueuePropertyRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; // This kinda funky, not sure how to align the tops of the row
  margin-bottom: 20px;
  color: #5f6b79;
  font-size: 20px;
`;

const QueuePropertyText = styled.div`
  margin-left: 12px;
  font-size: 16px;
`;

const JoinButton = styled(Button)`
  background-color: #3684c6;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  font-size: 14px;
`;

const StaffH2 = styled.h2`
  margin-top: 32px;
`;
//TODO: Make QuestionForm self contained so we can trigger it directly in this component and not pass down so many props
interface QueueInfoColumnProps {
  queueId: number;
  onJoinQueue: (force: boolean) => Promise<boolean>; // return whether successful
}

export function QueueInfoColumn({
  queueId,
  onJoinQueue,
}: QueueInfoColumnProps): ReactElement {
  const { queue } = useQueue(queueId);
  const { studentQuestion } = useStudentQuestion(queueId);
  const [showJoinPopconfirm, setShowJoinPopconfirm] = useState(false);
  return (
    <InfoColumnContainer>
      <QueueTitle>{queue?.room}</QueueTitle>
      {queue.startTime && queue.endTime && (
        <QueuePropertyRow>
          <ClockCircleOutlined />
          <QueuePropertyText>{formatQueueTime(queue)}</QueuePropertyText>
        </QueuePropertyRow>
      )}
      {queue?.notes && (
        <QueuePropertyRow>
          <NotificationOutlined />
          <QueuePropertyText>{queue.notes}</QueuePropertyText>
        </QueuePropertyRow>
      )}
      {!studentQuestion && (
        <Popconfirm
          title="In order to join this queue, you must delete your previous question. Do you want to continue?"
          onConfirm={() => onJoinQueue(true)}
          okText="Yes"
          cancelText="No"
          disabled
          visible={showJoinPopconfirm}
          onVisibleChange={setShowJoinPopconfirm}
        >
          <JoinButton
            type="primary"
            size="large"
            block
            disabled={!queue?.allowQuestions}
            data-cy="join-queue-button"
            onClick={async () =>
              setShowJoinPopconfirm(!(await onJoinQueue(false)))
            }
          >
            Join Queue
          </JoinButton>
        </Popconfirm>
      )}
      <StaffH2>Staff</StaffH2>
      <TAStatuses queueId={queueId} />
    </InfoColumnContainer>
  );
}

const NotesInput = styled(Input)`
  border-radius: 6px;
  border: 1px solid #b8c4ce;
`;

interface QueueListHeaderProps {
  queueId: number;
  isTA: boolean;
}

export default function QueueListHeader({
  queueId,
  isTA,
}: QueueListHeaderProps): ReactElement {
  const { queue, queuesError, mutateQueue } = useQueue(queueId);
  const [queueSettingsModal, setQueueSettingsModal] = useState(false);
  const [notes, setNotes] = useState(queue?.notes);
  const [allowQuestions, setAllowQuestions] = useState(queue?.allowQuestions);

  const updateQueueSettings = async () => {
    await API.queues.updateQueue(queueId, notes || "", allowQuestions);
    mutateQueue();
  };

  return (
    <Container>
      <QueueTitle>{queue?.room}</QueueTitle>
      {isTA && (
        <Tooltip title="Cool admin things that TAs like you can do yeah">
          <SettingOutlined
            style={{ fontSize: 20, paddingLeft: 24 }}
            onClick={() => setQueueSettingsModal(true)}
          />
        </Tooltip>
      )}
      <Modal
        title="LOL Stanley you're gonna have to figure this one out"
        visible={queueSettingsModal}
        onCancel={() => {
          setQueueSettingsModal(false);
          setAllowQuestions(queue?.allowQuestions);
          setNotes(queue?.notes);
        }}
        onOk={() => {
          updateQueueSettings();
          setQueueSettingsModal(false);
        }}
      >
        <h2>Edit Queue Notes:</h2>
        <NotesInput
          defaultValue={notes}
          value={notes}
          onChange={(e) => setNotes(e.target.value as string)}
          allowClear={true}
        />
        <h2 style={{ paddingTop: "40px" }}>Allow Questions</h2>
        <Switch
          checked={allowQuestions}
          onChange={setAllowQuestions}
          data-cy="allow-questions-toggle"
        />
      </Modal>
      {queue.startTime && queue.endTime && (
        <Container style={{ marginLeft: "64px" }}>
          <ClockCircleFilled />
          <TimeText>{formatQueueTime(queue)}</TimeText>
        </Container>
      )}
      {queue?.notes && (
        <Container style={{ marginLeft: "64px" }}>
          <NotesText>
            <b>Notes: </b>
            {queue?.notes}
          </NotesText>
        </Container>
      )}
      <div style={{ paddingLeft: "64px" }}>
        {queue?.allowQuestions ? (
          <NotesText style={{ color: "green" }}>
            This queue is allowing new questions
          </NotesText>
        ) : (
          <NotesText style={{ color: "red" }}>
            This queue is <b>not</b> allowing new questions
          </NotesText>
        )}
      </div>
    </Container>
  );
}
