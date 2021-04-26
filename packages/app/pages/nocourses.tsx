import { Result } from "antd";
import { ReactElement } from "react";
import { useDefaultCourseRedirect } from "../hooks/useDefaultCourseRedirect";

export default function NoCourses(): ReactElement {
  useDefaultCourseRedirect();

  return (
    <Result
      status="info"
      title="None of your courses are using the Khoury Office Hours App."
      subTitle="Please reach out to your course coordinator or professor if you expected your course to be here."
    />
  );
}
