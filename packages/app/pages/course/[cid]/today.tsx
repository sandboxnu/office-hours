import { API } from "@koh/api-client";
import { QueuePartial, Role } from "@koh/common";
import { Col, Row } from "antd";
//import { chunk, mean } from "lodash";
//import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { StandardPageContainer } from "../../../components/common/PageContainer";
import NavBar from "../../../components/Nav/NavBar";
import SchedulePanel from "../../../components/Schedule/SchedulePanel";
import OpenQueueCard, {
  OpenQueueCardSkeleton,
} from "../../../components/Today/OpenQueueCard";
//import PopularTimes from "../../../components/Today/PopularTimes/PopularTimes";
import TodayPageCheckinButton from "../../../components/Today/QueueCheckInButton";
import ReleaseNotes from "../../../components/Today/ReleaseNotes";
import WelcomeStudents from "../../../components/Today/WelcomeStudents";
import { useCourse } from "../../../hooks/useCourse";
import { useRoleInCourse } from "../../../hooks/useRoleInCourse";
import TodayPageCreateButton from "../../../components/Today/QueueCreateButton";

const Container = styled.div`
  margin-top: 32px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 30px;
  color: #212934;
`;
const RoleColorSpan = styled.span`
  color: #3684c6;
  font-weight: bold;
`;

function roleToString(role: Role) {
  switch (role) {
    case Role.TA:
      return "TA";
    case Role.STUDENT:
      return "Student";
    case Role.PROFESSOR:
      return "Professor";
    default:
      return "";
  }
}

/*
function arrayRotate(arr, count) {
  const adjustedCount = (arr.length + count) % arr.length;
  return arr
    .slice(adjustedCount, arr.length)
    .concat(arr.slice(0, adjustedCount));
}

const collapseHeatmap = (heatmap: Heatmap): Heatmap =>
  chunk(heatmap, 4).map((hours) => {
    const filteredOfficeHours = hours.filter((v) => v !== -1);
    return filteredOfficeHours.length > 0 ? mean(filteredOfficeHours) : -1;
  });
*/
export default function Today(): ReactElement {
  const router = useRouter();
  const { cid } = router.query;
  const role = useRoleInCourse(Number(cid));
  const { course, mutateCourse } = useCourse(Number(cid));

  const updateQueueNotes = async (
    queue: QueuePartial,
    notes: string
  ): Promise<void> => {
    const newQueues =
      course &&
      course.queues.map((q) => (q.id === queue.id ? { ...q, notes } : q));

    mutateCourse({ ...course, queues: newQueues }, false);
    await API.queues.update(queue.id, {
      notes,
      allowQuestions: queue.allowQuestions,
    });
    mutateCourse();
  };

  return (
    <StandardPageContainer>
      <Head>
        <title>{course?.name} | Khoury Office Hours</title>
      </Head>
      <ReleaseNotes />
      <WelcomeStudents />
      <NavBar courseId={Number(cid)} />
      <Container>
        <Row gutter={64}>
          <Col md={12} xs={24}>
            <Row justify="space-between">
              <Title>Current Office Hours</Title>
              <TodayPageCheckinButton />
            </Row>
            <Row>
              <div>
                <i>
                  You are a <RoleColorSpan>{roleToString(role)}</RoleColorSpan>{" "}
                  for this course
                </i>
              </div>
            </Row>
            {course?.queues?.filter((q) => q.isOpen).length === 0 ? (
              <h1 style={{ paddingTop: "100px" }}>
                There are currently no open queues
              </h1>
            ) : (
              course?.queues
                ?.filter((q) => q.isOpen)
                .map((q) => (
                  <OpenQueueCard
                    key={q.id}
                    queue={q}
                    isTA={role === Role.TA || role === Role.PROFESSOR}
                    updateQueueNotes={updateQueueNotes}
                  />
                ))
            )}
            {!course && <OpenQueueCardSkeleton />}
            {/*This only works with UTC offsets in the form N:00, to help with other offsets, the size of the array might have to change to a size of 24*7*4 (for every 15 min interval)
            course && course.heatmap && (
              <PopularTimes
                heatmap={collapseHeatmap(
                  arrayRotate(
                    course.heatmap,
                    -Math.floor(moment().utcOffset() / 15)
                  )
                )}
              />
            )*/}
            <Row>
              <TodayPageCreateButton />
            </Row>
          </Col>
          <Col md={12} sm={24}>
            {/* TODO: Currently, iCal stuff is not showing, replace this with something else */}
            <SchedulePanel courseId={Number(cid)} defaultView="day" />
          </Col>
        </Row>
      </Container>
    </StandardPageContainer>
  );
}
