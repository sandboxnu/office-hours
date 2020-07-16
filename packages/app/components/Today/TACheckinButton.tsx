import { API } from "@template/api-client";
import { QueuePartial } from "@template/common";
import { Button, Input, Modal, Radio } from "antd";
import { ReactElement, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

const CheckinButton = styled(Button)`
  background: #2a9187;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  font-size: 14px;
`;

export default function TACheckinButton({
  courseId,
}: {
  courseId: number;
}): ReactElement {
  const [viewCheckinModal, setViewCheckinModal] = useState(false);

  const { data, error } = useSWR(
    `api/v1/courses/${courseId}`,
    async () => courseId && API.course.get(Number(courseId))
  );

  return (
    <>
      <CheckinButton
        type="default"
        size="large"
        onClick={() => setViewCheckinModal(true)}
      >
        Check In
      </CheckinButton>
      <Modal
        title="Time to Check In! :D 🐱o(=•ェ•=)m"
        visible={viewCheckinModal}
        onOk={() => setViewCheckinModal(false)}
        onCancel={() => setViewCheckinModal(false)}
        okText="Check In"
      >
        <TAMultiQueueModal queues={data?.queues} />
      </Modal>
    </>
  );
}

function TAMultiQueueModal({
  queues,
}: {
  queues: QueuePartial[];
}): ReactElement {
  const [value, setValue] = useState(0);
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  return (
    <>
      <h3>Which room are you in?</h3>
      <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
        {queues.map((q, i) => (
          <Radio key={q.id} style={radioStyle} value={i}>
            {q.room}
          </Radio>
        ))}
        <Radio style={radioStyle} value={-1}>
          Other...
          {value === -1 ? (
            <Input style={{ width: 100, marginLeft: 10 }} />
          ) : null}
        </Radio>
      </Radio.Group>
    </>
  );
}
