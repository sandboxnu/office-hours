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
  const [customRoom, setCustomRoom] = useState("");

  const canSubmitCustomRoom = !(value === -1 && !customRoom);

  const { data } = useSWR(courseId && `api/v1/courses/${courseId}`, async () =>
    API.course.get(Number(courseId))
  );

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  async function checkInTA() {
    if (canSubmitCustomRoom) {
      const redirectID = await API.taStatus.checkIn(
        courseId,
        value === -1 ? customRoom : data?.queues[value].room
      );

      router.push(
        "/course/[cid]/queue/[qid]",
        `/course/${courseId}/queue/${redirectID.id}`
      );
    }
  }

  return (
    <>
      <CheckinButton
        type="default"
        size="large"
        onClick={() => setViewCheckinModal(true)}
        disabled={!data}
        data-cy="check-in-button"
      >
        Check In
      </CheckinButton>
      <Modal
        title="Check in to your office hours"
        visible={viewCheckinModal}
        onOk={checkInTA}
        onCancel={() => setViewCheckinModal(false)}
        okText="Check In"
        okButtonProps={{ disabled: !canSubmitCustomRoom }}
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
              <Input
                onChange={(v) => setCustomRoom(v.target.value)}
                value={customRoom}
                style={{ width: 100, marginLeft: 10 }}
                onPressEnter={checkInTA}
              />
            ) : null}
          </Radio>
        </Radio.Group>
      </Modal>
    </>
  );
}
