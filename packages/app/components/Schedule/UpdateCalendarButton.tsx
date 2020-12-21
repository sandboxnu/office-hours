import { API } from "@koh/api-client";
import { Role } from "@koh/common";
import { Button } from "antd";
import React, { ReactElement, useState } from "react";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";

enum CalendarUpdateStatus {
  BEFORE,
  UPDATING,
  AFTER,
}

type UpdateCalendarButtonProps = {
  courseId: number;
};

export default function UpdateCalendarButton({
  courseId,
}: UpdateCalendarButtonProps): ReactElement {
  const [updated, setUpdated] = useState(CalendarUpdateStatus.BEFORE);
  const role = useRoleInCourse(courseId);

  const updateCalendar = async () => {
    setUpdated(CalendarUpdateStatus.UPDATING);
    await API.course.updateCalendar(courseId);
    setUpdated(CalendarUpdateStatus.AFTER);
  };

  if (role !== Role.PROFESSOR) {
    return null;
  }

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
}
