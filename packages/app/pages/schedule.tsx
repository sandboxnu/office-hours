import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import useSWR from "swr";
import { API } from "@template/api-client";
import { Result } from "antd";

type ScheduleProps = {
  viewType: Calendar.Views; // TODO: debug this, hwy isn't it finding the types?
};

export default function Schedule({ viewType }: ScheduleProps) {
  const { data, error } = useSWR(`api/v1/courses/1`, async () =>
    API.course.get(1)
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
      title: e.title,
      start: e.startTime,
      end: e.endTime,
    })) ?? [];

  return (
    <div style={{ height: "400px" }}>
      <h1>{data?.name ?? ""}</h1>
      <Calendar
        localizer={momentLocalizer(moment)}
        events={myEvents}
        defaultView={viewType}
      />
    </div>
  );
}
