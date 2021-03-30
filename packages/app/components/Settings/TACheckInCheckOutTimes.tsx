import { API } from "@koh/api-client";
import { ReactElement } from "react";
import useSWR from "swr";

interface TACheckInCheckOutTimesProps {
  courseId: number;
}

export default function TACheckInCheckOutTimes({
  courseId,
}: TACheckInCheckOutTimesProps): ReactElement {
  const { data } = useSWR(
    `/api/v1/course/getTACheckinCheckoutTimes`,
    async () =>
      await API.course.getTACheckinTimes(
        courseId,
        new Date(Date.now() - 100000000).toISOString(),
        new Date().toISOString()
      )
  );

  console.log(data);

  return (
    <div>
      <h1>TA Check-In Check-Out Times</h1>
    </div>
  );
}
