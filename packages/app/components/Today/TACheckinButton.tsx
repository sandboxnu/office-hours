import { API } from "@template/api-client";
import { Button, Input, Modal, Radio } from "antd";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import styled from "styled-components";
import { useCourse } from "../../hooks/useCourse";
import { useProfile } from "../../hooks/useProfile";

const CheckinButton = styled(Button)`
  background: #2a9187;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  font-size: 14px;
`;

const CheckOutButton = styled(Button)`
  color: #da3236;
  font-weight: 500;
  font-size: 14px;
  border-radius: 6px;
`;

export default function TACheckinButton({
  courseId,
}: {
  courseId: number;
}): ReactElement {
  const router = useRouter();

  const { course, mutateCourse } = useCourse(courseId);
  const { id } = useProfile();
  const queueCheckedIn = course?.queues.find((queue) =>
    queue.staffList.find((staff) => staff.id === id)
  );

  async function checkInTA() {
    // to see old check in in person functionality look at commit b4768bbfb0f36444c80961703bdbba01ff4a5596
    //trying to limit changes to the frontend, all queues will have the room online
    const redirectID = await API.taStatus.checkIn(courseId, "Online");

    router.push(
      "/course/[cid]/queue/[qid]",
      `/course/${courseId}/queue/${redirectID.id}`
    );
  }

  return (
    <>
      {queueCheckedIn ? (
        <CheckOutButton
          data-cy="check-out-button"
          onClick={async () => {
            await API.taStatus.checkOut(courseId, "Online");
            mutateCourse();
          }}
        >
          Check out
        </CheckOutButton>
      ) : (
        <CheckinButton
          type="default"
          size="large"
          onClick={() => checkInTA()}
          disabled={!course}
          data-cy="check-in-button"
        >
          Check In
        </CheckinButton>
      )}
    </>
  );
}
