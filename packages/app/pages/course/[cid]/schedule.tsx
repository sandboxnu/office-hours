import {
  Calendar,
  momentLocalizer,
  CalendarProps,
  Event,
} from "react-big-calendar";
import moment from "moment";
import useSWR from "swr";
import { API } from "@template/api-client";
import { Result } from "antd";
import styled from "styled-components";
import { useProfile } from "../../../hooks/useProfile";
import { useRouter } from "next/router";
import NavBar from "../../../components/Nav/NavBar";
import { ReactElement } from "react";

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

const ScheduleCalendar = styled(Calendar)<CalendarProps>`
  height: 70vh;
`;

type ScheduleProps = {
  today?: boolean;
};

export default function Schedule({ today }: ScheduleProps): ReactElement {
  const router = useRouter();
  const { cid } = router.query;

  const { data, error } = useSWR(cid && `api/v1/courses/${cid}`, async () =>
    API.course.get(Number(cid))
  );

  if (error)
    return (
      <Result
        status="500"
        title="Something went wrong, please ask chinese man"
      />
    );

  const myEvents: Event[] =
    data?.officeHours.map((e) => ({
      start: e.startTime,
      end: e.endTime,
      title: e.title,
    })) ?? [];

  return (
    <div>
      {!today && <NavBar courseId={Number(cid)} />}
      {!today && (
        <Container>
          <ScheduleCalendar
            localizer={momentLocalizer(moment)}
            events={myEvents}
            defaultView={"week"}
          />
        </Container>
      )}
      {today && (
        <ScheduleCalendar
          localizer={momentLocalizer(moment)}
          events={myEvents}
          defaultView={"day"}
        />
      )}
    </div>
  );
}
