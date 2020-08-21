import { ClockCircleFilled, SettingOutlined } from "@ant-design/icons";
import { API } from "@template/api-client";
import { Avatar, Input, Switch, Tooltip } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ReactElement, useState } from "react";
import styled from "styled-components";
import { useQueue } from "../../hooks/useQueue";
import { formatQueueTime } from "../../utils/TimeUtil";

export const Container = styled.div`
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

export const NotesText = styled.div`
  font-size: 16px;
  color: #5f6b79;
`;

const AvatarWithMargin = styled(Avatar)`
  margin-right: 10px;
`;

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
  const [oldNotes, setOldNotes] = useState(queue?.notes);
  const [updatedNotes, setUpdatedNotes] = useState(queue?.notes);

  const updateQueueNotes = async () => {
    await API.queues.updateNotes(queueId, updatedNotes);
    setOldNotes(updatedNotes);
    mutateQueue();
  };

  const toggleAllowQuestions = async () => {
    await API.queues.toggleQueue(queueId);
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
          setUpdatedNotes(oldNotes);
          setQueueSettingsModal(false);
        }}
        onOk={() => {
          setOldNotes(updatedNotes);
          setQueueSettingsModal(false);
        }}
      >
        <h2>Edit Queue Notes:</h2>
        <NotesInput
          defaultValue={oldNotes}
          onPressEnter={updateQueueNotes}
          value={updatedNotes}
          onChange={(e) => setUpdatedNotes(e.target.value as string)}
          allowClear={true}
          onKeyDown={(key) => {
            if (key.key === "Escape") {
              setUpdatedNotes(oldNotes);
            }
          }}
        />

        <h2 style={{ paddingTop: "40px" }}>Allow Questions</h2>
        <Switch
          checked={queue.allowQuestions}
          onChange={toggleAllowQuestions}
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
            {queue.notes}
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
