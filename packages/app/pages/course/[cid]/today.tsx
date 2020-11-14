import { API } from "@koh/api-client";
import { Heatmap, QueuePartial, Role } from "@koh/common";
import { Col, Row } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import styled from "styled-components";
import NavBar from "../../../components/Nav/NavBar";
import SchedulePanel from "../../../components/Schedule/SchedulePanel";
import PopularTimes from "../../../components/Today/PopularTimes";
import OpenQueueCard, {
  OpenQueueCardSkeleton,
} from "../../../components/Today/OpenQueueCard";
import TACheckinButton from "../../../components/Today/TACheckinButton";
import ReleaseNotes from "../../../components/Today/ReleaseNotes";
import WelcomeStudents from "../../../components/Today/WelcomeStudents";
import { useCourse } from "../../../hooks/useCourse";
import { useRoleInCourse } from "../../../hooks/useRoleInCourse";
import { chunk, range, sum } from "lodash";
import moment from "moment";

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 30px;
  color: #212934;
`;

function arrayRotate(arr, count) {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}

const collapseHeatmap = (heatmap: Heatmap): Heatmap =>
  chunk(heatmap, 4).map(sum); // TODO: Parametrize this by a constant

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
    <div>
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
              {role === Role.TA && <TACheckinButton courseId={Number(cid)} />}
            </Row>
            {course?.queues?.length === 0 ? (
              <h1 style={{ paddingTop: "100px" }}>
                There are currently no scheduled office hours
              </h1>
            ) : (
              course?.queues?.map((q) => (
                <OpenQueueCard
                  key={q.id}
                  queue={q}
                  isTA={role === Role.TA}
                  updateQueueNotes={updateQueueNotes}
                />
              ))
            )}
            {!course && <OpenQueueCardSkeleton />}
            {/*This only works with UTC offsets in the form N:00, to help with other offsets, the size of the array might have to change to a size of 24*7*4 (for every 15 min interval) */}
            {course && (
              <PopularTimes
                heatmap={collapseHeatmap(
                  arrayRotate(course.heatmap, moment().utcOffset() / 60 + 4)
                )}
              />
            )}
          </Col>
          <Col md={12} sm={24}>
            <SchedulePanel courseId={Number(cid)} defaultView="day" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
