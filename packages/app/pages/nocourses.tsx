import { API } from "@koh/api-client";
import { Button, Result } from "antd";
import Router from "next/router";
import { ReactElement } from "react";
import useSWR from "swr";
import { useDefaultCourseRedirect } from "../hooks/useDefaultCourseRedirect";

export default function NoCourses(): ReactElement {
  useDefaultCourseRedirect();

  const { data } = useSWR("/api/v1/courses/self_enroll_courses", async () =>
    API.course.selfEnrollCourses()
  );

  return (
    <div>
      <Result
        status="info"
        title="None of your courses are using the Khoury Office Hours App."
        subTitle="Please reach out to your course coordinator or professor if you expected your course to be here."
      />
      {data.courses.length > 0 ? (
        <div>
          One of our data sources for student-enrollment is currently
          experiencing an outage. If you think you belong to a class, please
          click on your corresponding class below.
          {data.courses.map((course) => {
            <Button
              onClick={async () => {
                await API.course.createSelfEnrollOverride(course.id);
                Router.push("/login");
              }}
            >
              {course.name}
            </Button>;
          })}
        </div>
      ) : null}
    </div>
  );
}
