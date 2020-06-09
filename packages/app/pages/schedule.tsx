import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import useSWR from "swr";
import { API } from "@template/api-client";
import { Result } from "antd";
import styled from "styled-components";

const ScheduleCalendar = styled(Calendar)`
  height: 70vh;
`;

type ScheduleProps = {
  viewType: View;
};

export default function Schedule({ viewType }: ScheduleProps) {
  const { data, error } = useSWR(
    `api/v1/courses/1/schedule`,
    async () => API.course.get(1),
    { revalidateOnFocus: false }
  );

  if (error)
    return (
      <Result
        status="500"
        title="Something went wrong, please ask chinese man"
      />
    );

  const myEvents =
    data?.officeHours.map((e) => ({
      start: e.startTime,
      end: e.endTime,
    })) ?? [];

  return (
    <ScheduleCalendar
      localizer={momentLocalizer(moment)}
      events={myEvents}
      defaultView={viewType}
    />
  );
}
