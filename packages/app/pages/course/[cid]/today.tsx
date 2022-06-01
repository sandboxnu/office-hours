import { API } from "@koh/api-client";
import { Heatmap, QueuePartial, Role } from "@koh/common";
import { Col, Row } from "antd";
import { chunk, mean } from "lodash";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { StandardPageContainer } from "../../../components/common/PageContainer";
import NavBar from "../../../components/Nav/NavBar";
import SchedulePanel from "../../../components/Schedule/SchedulePanel";
import QueueCard, {
  QueueCardSkeleton,
} from "../../../components/Today/QueueCard";
import TodayPageCheckinButton from "../../../components/Today/QueueCheckInButton";
import ReleaseNotes from "../../../components/Today/ReleaseNotes";
import WelcomeStudents from "../../../components/Today/WelcomeStudents";
import { useCourse } from "../../../hooks/useCourse";
import { useRoleInCourse } from "../../../hooks/useRoleInCourse";
import PopularTimes from "../../../components/Today/PopularTimes/PopularTimes";
import { orderBy } from "lodash";
import ApplyToSandbox from "../../../components/Today/SandboxApplication";

const Container = styled.div`
  margin-top: 32px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 30px;
  color: #212934;
`;

const TodayCol = styled(Col)`
  margin-bottom: 15px;
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

export default function Today(): ReactElement {
  const router = useRouter();
  const { cid } = router.query;
  const role = useRoleInCourse(Number(cid));
  const { course, mutateCourse } = useCourse(Number(cid));

  const sortByProfOrder = role == Role.PROFESSOR ? "desc" : "asc";
  const sortedQueues =
    course?.queues &&
    orderBy(
      course?.queues,
      ["isOpen", "isProfessorQueue"],
      ["desc", sortByProfOrder]
    );

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
      {role != Role.PROFESSOR && <ApplyToSandbox />}
      <NavBar courseId={Number(cid)} />
      <Container>
        <Row gutter={64}>
          <TodayCol md={12} xs={24}>
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
            {course?.queues?.length === 0 ? (
              <h1 style={{ paddingTop: "100px" }}>
                There are no queues for this course
              </h1>
            ) : (
              sortedQueues?.map((q) => (
                <QueueCard
                  key={q.id}
                  queue={q}
                  isTA={role === Role.TA || role === Role.PROFESSOR}
                  updateQueueNotes={updateQueueNotes}
                />
              ))
            )}
            {!course && <QueueCardSkeleton />}
            {
              // This only works with UTC offsets in the form N:00, to help with other offsets, the size of the array might have to change to a size of 24*7*4 (for every 15 min interval)
              course && course.heatmap && (
                <PopularTimes
                  heatmap={collapseHeatmap(
                    arrayRotate(
                      course.heatmap,
                      -Math.floor(moment().utcOffset() / 15)
                    )
                  )}
                />
              )
            }
          </TodayCol>
          <TodayCol md={12} sm={24}>
            <SchedulePanel courseId={Number(cid)} defaultView="timeGridDay" />
          </TodayCol>
        </Row>
      </Container>
    </StandardPageContainer>
  );
}
