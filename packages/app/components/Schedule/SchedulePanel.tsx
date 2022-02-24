import { ReactElement } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import { View } from "react-big-calendar";
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
  const _a = courseId;
  const _d = defaultView;
  return <FullCalendar plugins={[timeGridPlugin]} initialView="timeGridWeek" />;
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
