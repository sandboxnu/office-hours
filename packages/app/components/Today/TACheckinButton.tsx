import { API } from "@template/api-client";
import { Button, Input, Modal, Radio } from "antd";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const [viewCheckinModal, setViewCheckinModal] = useState(false);
  const [value, setValue] = useState(0);

  const { data } = useSWR(
    `api/v1/courses/${courseId}`,
    async () => courseId && API.course.get(Number(courseId))
  );

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  return (
    <>
      <CheckinButton
        type="default"
        size="large"
        onClick={() => setViewCheckinModal(true)}
        disabled={!data}
      >
        Check In
      </CheckinButton>
      <Modal
        title="Time to Check In! :D 🐱o(=•ェ•=)m"
        visible={viewCheckinModal}
        onOk={async () => {
          const redirectID = await API.taStatus.checkIn(
            courseId,
            data?.queues[value].room
          );

          router.push(
            "/course/[cid]/queue/[qid]",
            `/course/${courseId}/queue/${redirectID.id}`
          );
        }}
        onCancel={() => setViewCheckinModal(false)}
        okText="Check In"
      >
        <h3>Which room are you in?</h3>
        <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
          {data?.queues.map((q, i) => (
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
      </Modal>
    </>
  );
}
