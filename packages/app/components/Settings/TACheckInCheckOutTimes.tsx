import { API } from "@koh/api-client";
import { ReactElement } from "react";
import useSWR from "swr";

interface TACheckInCheckOutTimesProps {
  courseId: number;
}

export default function TACheckInCheckOutTimes({
  courseId,
}: TACheckInCheckOutTimesProps): ReactElement {
  const { data, mutate } = useSWR(
    `/api/v1/course/getTACheckinCheckoutTimes`,
    async () =>
      await API.course.getTACheckinTimes(courseId, new Date(), new Date())
  );

  return (
    <div>
      <h1>TA Check-In Check-Out Times</h1>
    </div>
  );
}
