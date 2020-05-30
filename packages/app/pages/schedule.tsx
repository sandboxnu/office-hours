import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import useSWR from "swr";
import { API } from "@template/api-client";

export default function Schedule() {
  const { data, error } = useSWR(`api/v1/courses/1`, async () =>
    API.course.get(1)
  );

  if (error) return <div>Could not load data :'(</div>;
  if (!data) return <div>loading ur mom</div>;

  const myEvents = data.officeHours.map((e) => ({
    title: e.title,
    start: e.startTime,
    end: e.endTime,
  }));

  return (
    <div>
      <h1>{data.name}</h1>
      <Calendar localizer={momentLocalizer(moment)} events={myEvents} />
    </div>
  );
}
