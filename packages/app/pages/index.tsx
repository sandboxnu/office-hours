import { User } from "@koh/common";
import Router from "next/router";
import { ReactElement } from "react";
import { useHomePageRedirect } from "../hooks/useHomePageRedirect";
import { useProfile } from "../hooks/useProfile";
import { Spin } from "antd";

export default function Home(): ReactElement {
  const profile: User = useProfile();
  const didRedirect = useHomePageRedirect();
  if (profile && !didRedirect) {
    Router.push("/courses");
  } else {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  return <div />;
}
