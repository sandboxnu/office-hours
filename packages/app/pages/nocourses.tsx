import { Result } from "antd";
import { ReactElement } from "react";

export default function NoCourses(): ReactElement {
  return (
    <Result
      status="info"
      title="None of your courses are using the Khoury Office Hours App."
      subTitle="Please reach out to your professor if you expected your course to be here."
    />
  );
}
