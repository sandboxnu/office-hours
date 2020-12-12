import { User } from "@koh/common";
import Router from "next/router";
import { ReactElement } from "react";
import { useDefaultCourseRedirect } from "../hooks/useDefaultCourseRedirect";
import { useProfile } from "../hooks/useProfile";

export default function Home(): ReactElement {
  const profile: User = useProfile();
  const didRedirect = useDefaultCourseRedirect();
  if (profile && !didRedirect) {
    Router.push("/nocourses");
  }

  return <div />;
}
