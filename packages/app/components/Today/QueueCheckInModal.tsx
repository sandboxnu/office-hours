import { QueuePartial } from "@koh/common";
import { Modal, Select } from "antd";
import { ReactElement } from "react";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import ModalFooter from "../common/ModalFooter";

interface QueueCheckInModalProps {
  visible: boolean;
  onSubmit: (queueId: number) => void;
  onCancel: () => void;
  button: ReactNode;
  queues: QueuePartial[];
}

const RoomSelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 650px) {
    justify-content: flex-start;
  }
`;

const RoomSelect = styled(Select)`
  width: 200px;
  max-width: 50%;
`;

export default function QueueCheckInModal({
  visible,
  onSubmit,
  onCancel,
  button,
  queues,
}: QueueCheckInModalProps): ReactElement {
  const [queueToCheckInto, setQueueToCheckInto] = useState(-1);
  const onQueueUpdate = (queueIx: number) => {
    setQueueToCheckInto(queueIx);
  };
  const handleCancel = () => {
    onCancel();
    setQueueToCheckInto(-1);
  };
  const handleSubmit = () => onSubmit(queueToCheckInto);
  const { Option } = Select;

  return (
    <Modal
      title="Check into a queue"
      visible={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      footer={
        <ModalFooter
          onCancel={handleCancel}
          onOk={handleSubmit}
          okText="Check In"
          okButtonProps={{ disabled: queueToCheckInto < 0 }}
        />
      }
    >
      <h3>Search for an existing room</h3>
      <RoomSelectionContainer>
        <RoomSelect
          showSearch
          placeholder="Select a queue"
          optionFilterProp="children"
          onChange={onQueueUpdate}
          data-cy="select-existing-queue"
          filterOption={(input, option) => {
            return (
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
          }}
        >
          {queues.map((q, i) => (
            <Option
              key={i}
              value={i}
              data-cy={`select-queue-${q.room}`}
            >{`${q.room}`}</Option>
          ))}
        </RoomSelect>
        <>{button}</>
      </RoomSelectionContainer>
    </Modal>
  );
}
