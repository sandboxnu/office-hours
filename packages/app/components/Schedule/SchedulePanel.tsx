import { ReactElement, useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import { Button, Spin } from "antd";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import { Role } from "@koh/common";
import styled from "styled-components";
import "./fullcalendar.css";

const CalendarWrapper = styled.div`
  margin-bottom: 20px;
`;
const UpdateButton = styled(Button)`
  border-radius: 6px;
  color: white;
  font-weight: 500;
  font-size: 14px;
`;
const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #f8f9fb99;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ScheduleProps = {
  courseId: number;
  defaultView?: "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listWeek";
};

export default function SchedulePanel({
  courseId,
  defaultView = "timeGridWeek"
}: ScheduleProps): ReactElement {
  // iCalendarPlugin uses XMLHttpRequest, which is not available when Next.js is trying to
  // server-side render the page. Using state to only render the <FullCalendar> component after
  // <SchedulePanel> mounts fixes it.
  const [isClientSide, setIsClientSide] = useState(false);
  const role = useRoleInCourse(courseId);
  const calendarRef = useRef(null);
  const spinnerRef = useRef(null);

  useEffect(() => {
    // it is now safe to render the client-side only component
    setIsClientSide(true);
  });

  const fetchCalUrl = (refresh: boolean) =>
    `/api/v1/resources/calendar/${courseId}/refresh=${refresh}`;

  const refetchEvents = () => {
    const calApi = calendarRef.current.getApi();
    calApi.getEventSources().forEach(src => src.remove());
    calApi.addEventSource({
      url: fetchCalUrl(true),
      format: "ics"
    });
  };

  return (
    <div>
      <SpinnerContainer ref={spinnerRef}>
        <Spin />
      </SpinnerContainer>
      {isClientSide && !isNaN(courseId) && (
        <CalendarWrapper>
          <FullCalendar
            ref={calendarRef}
            plugins={[
              timeGridPlugin,
              iCalendarPlugin,
              dayGridPlugin,
              listPlugin
            ]}
            events={{
              url: fetchCalUrl(false),
              format: "ics"
            }}
            initialView={defaultView}
            headerToolbar={{
              start: "title",
              center: "dayGridMonth timeGridWeek timeGridDay listWeek",
              end: "today prev,next"
            }}
            loading={loading => {
              // FullCal is stupid so if you setState in this cb you get into an infinite render loop
              // https://stackoverflow.com/questions/66818770/fullcalendar-react-loading-function-problem
              // So we're just floating a spinner on top of the calendar and setting its display property
              if (spinnerRef.current)
                spinnerRef.current.style.display = loading ? "flex" : "none";
            }}
            height="70vh"
          />
        </CalendarWrapper>
      )}
      {role === Role.PROFESSOR && (
        <UpdateButton type="primary" onClick={refetchEvents}>
          Update Calendar
        </UpdateButton>
      )}
    </div>
  );
}
