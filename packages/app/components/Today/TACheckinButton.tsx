import { API } from "@koh/api-client";
import { Button, message } from "antd";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import styled from "styled-components";
import { useCourse } from "../../hooks/useCourse";

export const CheckinButton = styled(Button)`
  background: #1890ff;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  font-size: 14px;
`;

export const CheckOutButton = styled(Button)`
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
  disabled?: boolean;
  block?: boolean;
}
export default function TACheckinButton({
  courseId,
  room,
  state,
  disabled = false,
  block = false,
  ...props
}: TACheckinButtonProps): ReactElement {
  const router = useRouter();

  const { course, mutateCourse } = useCourse(courseId);

  async function checkInTA() {
    // to see old check in in person functionality look at commit b4768bbfb0f36444c80961703bdbba01ff4a5596
    //trying to limit changes to the frontend, all queues will have the room online

    try {
      const redirectID = await API.taStatus.checkIn(courseId, room);
      mutateCourse();
      router.push(
        "/course/[cid]/queue/[qid]",
        `/course/${courseId}/queue/${redirectID.id}`
      );
    } catch (err) {
      message.error(err.response?.data?.message);
    }
  }

  return (
    <>
      {state === "CheckedIn" && (
        <CheckOutButton
          type="default"
          size="large"
          disabled={disabled}
          block={block}
          data-cy="check-out-button"
          onClick={async () => {
            await API.taStatus.checkOut(courseId, room);
            mutateCourse();
          }}
          {...props}
        >
          Check Out
        </CheckOutButton>
      )}
      {state === "CheckedOut" && (
        <CheckinButton
          type="default"
          size="large"
          block={block}
          onClick={() => checkInTA()}
          disabled={disabled || !course}
          data-cy="check-in-button"
          {...props}
        >
          Check In
        </CheckinButton>
      )}
    </>
  );
}
