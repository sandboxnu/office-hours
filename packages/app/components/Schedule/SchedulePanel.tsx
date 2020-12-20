import { API } from "@koh/api-client";
import { Role } from "@koh/common";
import { Button } from "antd";
import moment from "moment";
import React, { ReactElement, useState } from "react";
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

const ScheduleCalendar = styled(Calendar)<CalendarProps>`
  height: 70vh;
`;

type ScheduleProps = {
  courseId: number;
  defaultView?: View;
};

enum CalendarUpdateStatus {
  BEFORE,
  UPDATING,
  AFTER,
}

export default function SchedulePanel({
  courseId,
  defaultView = "week",
}: ScheduleProps): ReactElement {
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(CalendarUpdateStatus.BEFORE);

  const updateCalendar = async () => {
    setUpdated(CalendarUpdateStatus.UPDATING);
    await API.course.updateCalendar(courseId);
    setUpdated(CalendarUpdateStatus.AFTER);
  };

  const { course } = useCourse(courseId);
  const role = useRoleInCourse(courseId);

  const myEvents: Event[] =
    course?.officeHours.map((e) => ({
      start: e.startTime,
      end: e.endTime,
      title: e.title,
    })) ?? [];

  const renderButton = () => {
    switch (updated) {
      case CalendarUpdateStatus.BEFORE:
        return (
          <Button type="primary" onClick={updateCalendar}>
            Update Calendar
          </Button>
        );
      case CalendarUpdateStatus.UPDATING:
        return (
          <Button type="primary" loading>
            Updating Calendar...
          </Button>
        );
      case CalendarUpdateStatus.AFTER:
        return (
          <Button type="primary" disabled>
            Calendar Updated!
          </Button>
        );
    }
  };

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
      />
      {role == Role.PROFESSOR && renderButton()}
    </div>
  );
}
