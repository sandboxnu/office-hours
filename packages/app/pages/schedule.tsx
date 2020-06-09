import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import useSWR from "swr";
import { API } from "@template/api-client";
import { Result } from "antd";
import styled from "styled-components";

type ScheduleProps = {
  viewType: View;
};

const CalendarContainer = styled.div`
  height: 70%;
`;

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
  // TODO: frontend guru pls cleanup height <3, month view is crunked :)
  // esp on mobile
  return (
    <CalendarContainer>
      <Calendar
        localizer={momentLocalizer(moment)}
        events={myEvents}
        defaultView={viewType}
      />
    </CalendarContainer>
  );
}
