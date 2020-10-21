import {
  Calendar,
  momentLocalizer,
  CalendarProps,
  Event,
  View,
} from "react-big-calendar";
import moment from "moment";
import styled from "styled-components";
import { ReactElement } from "react";
import { useCourse } from "../../hooks/useCourse";

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

  const myEvents: Event[] =
    course?.officeHours.map((e) => ({
      start: e.startTime,
      end: e.endTime,
      title: e.title,
    })) ?? [];

  return (
    <div>
      <ScheduleCalendar
        localizer={momentLocalizer(moment)}
        events={myEvents}
        defaultView={defaultView}
      />
    </div>
  );
}
