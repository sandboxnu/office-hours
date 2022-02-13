import { User } from "@koh/common";
import Router from "next/router";
import { ReactElement } from "react";
import { useHomePageRedirect } from "../hooks/useHomePageRedirect";
import { useProfile } from "../hooks/useProfile";

export default function Home(): ReactElement {
  const profile: User = useProfile();
  const didRedirect = useHomePageRedirect();
  if (profile && !didRedirect) {
    Router.push("/nocourses");
  }
  return <div />;
}
