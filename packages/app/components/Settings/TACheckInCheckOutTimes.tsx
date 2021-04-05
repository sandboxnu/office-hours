import { API } from "@koh/api-client";
import moment from "moment";
import React, { ReactElement } from "react";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import useSWR from "swr";

interface TACheckInCheckOutTimesProps {
  courseId: number;
}

export default function TACheckInCheckOutTimes({
  courseId,
}: TACheckInCheckOutTimesProps): ReactElement {
  const now = new Date();

  const { data } = useSWR(
    `/api/v1/course/getTACheckinCheckoutTimes`,
    async () =>
      await API.course.getTACheckinTimes(
        courseId,
        new Date(now.getFullYear(), 3, 1).toISOString(),
        new Date().toISOString()
      )
  );

  const calData: Event[] =
    data?.taCheckinTimes.map((e) => ({
      start: e.checkinTime,
      end: e.checkoutTime,
      title: e.name,
    })) ?? [];

  console.log(calData);

  return (
    <div style={{ minHeight: "500px" }}>
      <Calendar
        style={{ height: "70vh" }}
        events={calData}
        localizer={momentLocalizer(moment)}
        showMultiDayTimes={true}
      />
    </div>
  );
}
