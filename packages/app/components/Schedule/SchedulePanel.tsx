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
import { bucketDate } from "@koh/common";
import { zip } from "lodash";

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

  const maxHeatmap = 30; //course && Math.max(...Object.values(course.heatmap));
  const minHeatmap = course && Math.min(...Object.values(course.heatmap));

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
        slotPropGetter={(d: Date) => ({
          style: {
            backgroundColor: gradient(
              (course?.heatmap[bucketDate(d)] - minHeatmap) /
                (maxHeatmap - minHeatmap)
            ),
          },
        })}
      />
    </div>
  );
}

const RED = [0, 100, 50];
const GREEN = [100, 100, 50];
// Make a gradient from green to red, where green is 0 and red is 1
// num should be in [0, 1]
function gradient(num: number): string {
  const rgb = zip(GREEN, RED).map(([r, g]) => r + (g - r) * Math.min(1, num));
  return `hsl(${rgb[0]},${rgb[1]}%,${rgb[2]}%)`;
}
