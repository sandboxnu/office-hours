import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

export default function Schedule() {
  return <Calendar localizer={momentLocalizer(moment)} events={[]} />;
}
