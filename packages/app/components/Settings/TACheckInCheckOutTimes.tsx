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

const CheckinHeader = styled.h1`
  text-align: center;
  margin-top: 10px;
`;

interface TACheckInCheckOutTimesProps {
  courseId: number;
}

export default function TACheckInCheckOutTimes({
  courseId,
}: TACheckInCheckOutTimesProps): ReactElement {
  // there has to be a better way -- right?
  const sunday = new Date();
  sunday.setDate(sunday.getDate() - sunday.getDay());
  sunday.setHours(0, 0, 0, 0);
  const nextSunday = new Date();
  nextSunday.setDate(sunday.getDate() + 7);
  nextSunday.setHours(0, 0, 0, 0);

  const [startDate, setStartDate] = useState(sunday);
  const [endDate, setEndDate] = useState(nextSunday);

  const fetcher = (_url: string, startDate: Date, endDate: Date) => {
    return API.course.getTACheckinTimes(
      courseId,
      startDate.toISOString(),
      endDate.toISOString()
    );
  };

  const { data, mutate } = useSWR(
    [`/api/v1/course/getTACheckinCheckoutTimes`, startDate, endDate],
    fetcher
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
      <CheckinHeader>TA Check-In Check-Out Times</CheckinHeader>
      <TACheckInCheckOutCalendar
        events={calData}
        localizer={momentLocalizer(moment)}
        showMultiDayTimes={true}
        defaultView={"week"}
        onRangeChange={(newDates) => {
          if (Array.isArray(newDates)) {
            setStartDate(newDates[0]);
            setEndDate(newDates[newDates.length - 1]);
          } else {
            setStartDate(new Date(newDates.start));
            setEndDate(new Date(newDates.end));
          }
          mutate();
        }}
      />
    </div>
  );
}
