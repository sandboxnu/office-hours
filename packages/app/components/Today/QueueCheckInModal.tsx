import { QueuePartial, Role } from "@koh/common";
import { Modal, Select } from "antd";
import { ReactElement } from "react";
import { ReactNode, useState } from "react";

interface QueueCheckInModalProps {
  visible: boolean;
  onSubmit: (queueId: number) => void;
  onCancel: () => void;
  button: ReactNode;
  role: Role;
  queues: QueuePartial[];
}

export default function QueueCheckInModal({
  visible,
  onSubmit,
  onCancel,
  button,
  role,
  queues,
}: QueueCheckInModalProps): ReactElement {
  const [queueToCheckInto, setQueueToCheckInto] = useState(-1);
  const onQueueUpdate = (queueIx: number) => {
    setQueueToCheckInto(queueIx);
  };
  const { Option } = Select;

  return (
    <Modal
      title="Check into an existing queue"
      visible={visible}
      onCancel={() => {
        onCancel();
        setQueueToCheckInto(-1);
      }}
      okText="Check In"
      okButtonProps={{ disabled: queueToCheckInto < 0 }}
      onOk={() => onSubmit(queueToCheckInto)}
    >
      <h3>Begin searching for a room</h3>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a course"
        optionFilterProp="children"
        onChange={onQueueUpdate}
        data-cy="select-existing-queue"
        filterOption={(input, option) => {
          return (
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          );
        }}
      >
        {queues
          .filter((q) => (role === Role.TA ? !q.isProfessorQueue : true))
          .map((q, i) => (
            <Option
              key={i}
              value={i}
              data-cy={`select-queue-${q.room}`}
            >{`${q.room}`}</Option>
          ))}
      </Select>
      {button}
    </Modal>
  );
}
