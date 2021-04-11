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
  padding-top: 36px;
  padding-left: 36px;
`;

const CheckinHeader = styled.h1`
  margin-top: 12px;
  margin-bottom: 0;
  padding-left: 36px;
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

  const tasWhoForgotToCheckOut = data?.taCheckinTimes.filter((e) => e.forced);
  const tasWhoAreCurrentlyInOH = data?.taCheckinTimes.filter(
    (e) => e.inProgress
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
      resource: e.numHelped,
    })) ?? [];

  // Could have so many cool metrics, like, click on a ta's name and a modal
  // comes up with the metrics of who they helped
  // sinc eit's  acallback, maybe have to make a div that a modal can then
  // portal a modal onto it
  // https://reactjs.org/docs/react-dom.html#createportal

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
        onSelectEvent={(event) => {
          alert(
            `${event.title} helped ${event.resource} students in their office hours`
          );
        }}
      />
      {tasWhoAreCurrentlyInOH?.length ? (
        <div>
          <h3>People currently holding office hours:</h3>
          {tasWhoAreCurrentlyInOH.map((ta) => (
            <p key={ta.name}>{ta.name}</p>
          ))}
        </div>
      ) : null}
      {tasWhoForgotToCheckOut?.length ? (
        <div>
          <h3 style={{ color: "red" }}>
            The following course staff forgot to check out:
          </h3>
          {tasWhoForgotToCheckOut.map((ta) => (
            <p key={ta.name}>{ta.name}</p>
          ))}
          <p style={{ width: "800px" }}>
            Please remind course staff to check out at the end of their office
            hours. This way students don&apos;t join a queue thinking that there
            are still office hours when the course staff has already left
          </p>
        </div>
      ) : null}
    </div>
  );
}
