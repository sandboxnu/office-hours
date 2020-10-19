import { API } from "@koh/api-client";
import { Button, Input, Modal, Radio } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
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

type CheckInButtonState =
  | "CheckedIn"
  | "CheckedOut"
  | "CheckedIntoOtherQueueAlready";

interface TACheckinButtonProps {
  courseId: number;
  room: string; // name of room to check into
  state: CheckInButtonState; // State of the button
  block?: boolean;
}

export default function TACheckinButton({
  courseId,
  room,
  state,
  block = false,
}: TACheckinButtonProps): ReactElement {
  const router = useRouter();

  const { course, mutateCourse } = useCourse(courseId);

  async function checkInTA() {
    // to see old check in in person functionality look at commit b4768bbfb0f36444c80961703bdbba01ff4a5596
    //trying to limit changes to the frontend, all queues will have the room online
    const redirectID = await API.taStatus.checkIn(courseId, room);

    router.push(
      "/course/[cid]/queue/[qid]",
      `/course/${courseId}/queue/${redirectID.id}`
    );
  }

  switch (state) {
    case "CheckedIn":
      return (
        <CheckOutButton
          type="default"
          size="large"
          block={block}
          data-cy="check-out-button"
          onClick={async () => {
            await API.taStatus.checkOut(courseId, room);
            mutateCourse();
          }}
        >
          Check Out
        </CheckOutButton>
      );
    case "CheckedOut":
      return (
        <CheckinButton
          type="default"
          size="large"
          block={block}
          onClick={() => checkInTA()}
          disabled={!course}
          data-cy="check-in-button"
        >
          Check In
        </CheckinButton>
      );
  }
}
