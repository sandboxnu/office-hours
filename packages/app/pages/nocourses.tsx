import { Result } from "antd";
import { ReactElement } from "react";
import { useProfile } from "../hooks/useProfile";
import Router from "next/router";

export default function NoCourses() {
  const profile = useProfile();

  if (profile && profile.courses.length !== 0) {
    Router.push(
      "/course/[cid]/today",
      `/course/${profile.courses[0].course.id}/today`
    );
    return "";
  }

  return (
    <Result
      status="info"
      title="None of your courses are using the Khoury Office Hours App."
      subTitle="Please reach out to your professor if you expected your course to be here."
    />
  );
}
