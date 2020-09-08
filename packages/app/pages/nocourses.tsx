import { Result } from "antd";
import { ReactElement } from "react";
import { useProfile } from "../hooks/useProfile";

export default function NoCourses(): ReactElement {
  const { courses } = useProfile();

  if (courses) {
    if (courses.length !== 0) {
      window.location.href = `course/${courses[0].course.id}/today`;
      return;
    }
  }

  return (
    <Result
      status="info"
      title="None of your courses are using the Khoury Office Hours App."
      subTitle="Please reach out to your professor if you expected your course to be here."
    />
  );
}
