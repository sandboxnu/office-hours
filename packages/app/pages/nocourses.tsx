import { API } from "@koh/api-client";
import { Button, Result } from "antd";
import Router from "next/router";
import { ReactElement } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useHomePageRedirect } from "../hooks/useHomePageRedirect";

export default function NoCourses(): ReactElement {
  useHomePageRedirect();

  const { data } = useSWR("/api/v1/courses/self_enroll_courses", async () =>
    API.course.selfEnrollCourses()
  );

  const LogoutButton = styled(Button)`
    background-color: #3684c6;
    border-radius: 6px;
    color: white;
    font-weight: 500;
    font-size: 14px;
    width: 200px;
    margin: 0 auto;
    display: block;
  `;

  return (
    <div>
      <Result
        status="info"
        title="None of your courses are using the Khoury Office Hours App."
        subTitle="If you expected your course to be here, try logging in again. If it still does not appear, please reach out to your course coordinator or professor."
      />
      {data?.courses.length > 0 ? (
        <div style={{ textAlign: "center" }}>
          One of our data sources for student-enrollment is currently
          experiencing an outage. If you think you belong to a class, please
          click on your corresponding class below.
          <div>
            {data?.courses.map((course, i) => {
              return (
                <Button
                  key={i}
                  onClick={async () => {
                    await API.course.createSelfEnrollOverride(course.id);
                    Router.push("/login");
                  }}
                >
                  {course.name}
                </Button>
              );
            })}
          </div>
        </div>
      ) : null}
      <LogoutButton data-cy="logout-button" href="/api/v1/logout">
        Logout
      </LogoutButton>
    </div>
  );
}
