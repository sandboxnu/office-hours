import { API } from "@koh/api-client";
import moment from "moment";
import React, { ReactElement, useState } from "react";
import {
  Calendar,
  CalendarProps,
  Event,
  momentLocalizer,
} from "react-big-calendar";
import styled from "styled-components";
import useSWR from "swr";

const TACheckInCheckOutCalendar = styled(Calendar)<CalendarProps>`
  height: 70vh;
  padding-top: 40px;
  padding-left: 60px;
`;

interface TACheckInCheckOutTimesProps {
  courseId: number;
}

export default function TACheckInCheckOutTimes({
  courseId,
}: TACheckInCheckOutTimesProps): ReactElement {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { data, mutate } = useSWR(
    `/api/v1/course/getTACheckinCheckoutTimes`,
    async () => {
      return API.course.getTACheckinTimes(
        courseId,
        startDate.toISOString(),
        endDate.toISOString()
      );
    }
  );

  const calData: Event[] =
    data?.taCheckinTimes.map((e) => ({
      start: e.checkinTime,
      end: e.checkoutTime ? e.checkoutTime : new Date(),
      title: e.inProgress
        ? `TA currently holding office hours: ${e.name}`
        : e.forced
        ? `TA forgot to check out: ${e.name}`
        : e.name,
    })) ?? [];

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "10px" }}>
        TA Check-In Check-Out Times
      </h1>
      <TACheckInCheckOutCalendar
        events={calData}
        localizer={momentLocalizer(moment)}
        showMultiDayTimes={true}
        defaultView={"week"}
        onRangeChange={(newDates) => {
          console.log(newDates, Array.isArray(newDates));
          if (Array.isArray(newDates)) {
            setStartDate(newDates[0]);
            setEndDate(newDates[newDates.length - 1]);
            console.log("set dates", startDate, endDate);
          } else {
            setStartDate(new Date(newDates.start));
            setEndDate(new Date(newDates.end));
          }
          console.log("fuck", startDate, endDate);
          mutate();
        }}
      />
    </div>
  );
}
