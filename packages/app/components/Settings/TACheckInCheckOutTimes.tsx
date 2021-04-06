import { API } from "@koh/api-client";
import moment from "moment";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import {
  Calendar,
  CalendarProps,
  Event,
  momentLocalizer,
} from "react-big-calendar";
import styled from "styled-components";
import useSWR from "swr";
import { CourseAdminOptions } from "./CourseAdminPanel";

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
  const router = useRouter();
  router.query["defaultPage"] = CourseAdminOptions.CHECK_IN;

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
      />
    </div>
  );
}
