import { ReactElement } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import { View } from "react-big-calendar";
import { useState } from "react";
import { useEffect } from "react";
// import styled from "styled-components";

// const _ScheduleCalendar = styled(Calendar)<CalendarProps>`
//   height: 70vh;
// `;

type ScheduleProps = {
  courseId: number;
  defaultView?: View;
};

export default function SchedulePanel({
  courseId,
  defaultView = "week",
}: ScheduleProps): ReactElement {
  // iCalendarPlugin uses XMLHttpRequest, which is not available when Next.js is trying to
  // server-side render the page. Using state to only render the <FullCalendar> component after
  // <SchedulePanel> mounts fixes it.
  const [isClientSide, setIsClientSide] = useState(false);
  const _a = courseId;
  const _d = defaultView;

  useEffect(() => {
    // it is now safe to render the client-side only component
    setIsClientSide(true);
  });

  return (
    isClientSide && (
      <FullCalendar
        plugins={[timeGridPlugin, iCalendarPlugin]}
        events={{
          // TODO: cors
          url: "/api/v1/resources/calendar",
          // url: 'https://cors-anywhere.herokuapp.com/https://calendar.google.com/calendar/ical/iris.lamb2%40gmail.com/public/basic.ics',
          format: "ics",
        }}
        initialView="timeGridWeek"
      />
    )
  );

  /**
  const { course } = useCourse(courseId);
  const role = useRoleInCourse(courseId);

  const myEvents: Event[] =
    course?.officeHours.map((e) => ({
      start: e.startTime,
      end: e.endTime,
      title: e.title,
    })) ?? [];

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
  */
}
