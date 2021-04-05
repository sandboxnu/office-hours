import { Role } from "@koh/common";
import moment from "moment";
import React, { ReactElement } from "react";
import {
  Calendar,
  CalendarProps,
  Event,
  momentLocalizer,
  View,
} from "react-big-calendar";
import styled from "styled-components";
import { useCourse } from "../../hooks/useCourse";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import UpdateCalendarButton from "./UpdateCalendarButton";

const ScheduleCalendar = styled(Calendar)<CalendarProps>`
  height: 70vh;
`;

type ScheduleProps = {
  courseId: number;
  defaultView?: View;
};

export default function SchedulePanel({
  courseId,
  defaultView = "week",
}: ScheduleProps): ReactElement {
  const { course } = useCourse(courseId);
  const role = useRoleInCourse(courseId);

  const myEvents: Event[] =
    course?.officeHours.map((e) => ({
      start: e.startTime,
      end: e.endTime,
      title: e.title,
    })) ?? [];
  console.log("ligma", myEvents);

  const today: Date = new Date();
  return (
    <div>
      <ScheduleCalendar
        localizer={momentLocalizer(moment)}
        events={myEvents}
        defaultView={defaultView}
        scrollToTime={
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)
        }
        showMultiDayTimes
      />
      {role === Role.PROFESSOR && <UpdateCalendarButton courseId={courseId} />}
    </div>
  );
}
