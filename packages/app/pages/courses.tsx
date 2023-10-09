import Head from "next/head";
import React, { ReactElement } from "react";
import { StandardPageContainer } from "../components/common/PageContainer";
import { Button, Card, Empty, Spin, Tag } from "antd";
import Meta from "antd/lib/card/Meta";
import { useProfile } from "../hooks/useProfile";
import { User } from "@koh/common";
import styled from "styled-components";
import NavBar from "../components/Nav/NavBar";

const CoursesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  margin-bottom: 30px;
  gap: 15px;
`;

export default function Courses(): ReactElement {
  const profile: User = useProfile();

  return profile ? (
    <>
      <StandardPageContainer>
        <Head>
          <title>My Courses</title>
        </Head>

        <NavBar />
        <div style={{ marginTop: 20 }}>
          <h1>My Courses</h1>

          {profile?.courses.length === 0 ? (
            <Empty description="You are not enrolled in any course" />
          ) : (
            <CoursesSection>
              {profile?.courses.map((course) => (
                <Card
                  key={course.course.id}
                  style={{
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                    margin: "7px",
                    width: "350px",
                  }}
                  cover={
                    <img
                      alt="example"
                      style={{ objectFit: "cover", height: "20vh" }}
                      src="https://open-2021.sites.olt.ubc.ca/files/2020/10/OSIP-2020-Slider.jpg"
                    />
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      verticalAlign: "middle",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Meta title={course.course.name} />
                    <Tag
                      color="success"
                      style={{ textTransform: "capitalize" }}
                    >
                      {course.role}
                    </Tag>
                  </div>
                  <Button
                    type="primary"
                    block
                    style={{ marginTop: 15 }}
                    href={`course/${course.course.id}/today`}
                  >
                    Course page
                  </Button>
                </Card>
              ))}
            </CoursesSection>
          )}
        </div>
      </StandardPageContainer>
    </>
  ) : (
    <Spin />
  );
}
