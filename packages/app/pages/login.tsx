import { Button } from "antd";
import styled from "styled-components";
import { ReactElement } from "react";
import { useDefaultCourseRedirect } from "../hooks/useDefaultCourseRedirect";
import { User } from "@koh/common";
import Router from "next/router";
import { useProfile } from "../hooks/useProfile";
import { useSaveStateChallenge } from "../hooks/useSaveStateChallenge";
import {
  KHOURY_ADMIN_OAUTH_URL,
  OAUTH_CLIENT_ID,
  OAUTH_REDIRECT_URI,
  OAUTH_SCOPES,
} from "@koh/common";

let forge = require("node-forge");
const isWindow = typeof window !== "undefined";

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  text-align: center;
`;

function openKhouryOAuthLoginPage() {
  let stateVal = "";
  let codeVal = "";
  if (isWindow) {
    stateVal = window.localStorage.getItem("state");
    codeVal = window.localStorage.getItem("challenge");
  }
  let md = forge.md.sha256.create();
  md.update(codeVal);
  const hashedCodeChallenge: string = md.digest().toHex();
  const windowReference = window.open(
    KHOURY_ADMIN_OAUTH_URL +
      "/login?response_type=code&client_id=" +
      OAUTH_CLIENT_ID +
      "&redirect_uri=" +
      OAUTH_REDIRECT_URI +
      "&" +
      OAUTH_SCOPES +
      "&state=" +
      stateVal +
      "&challenge=" +
      hashedCodeChallenge,
    "_blank"
  );
  if (window.focus) {
    windowReference.focus();
  }
}

export default function Login(): ReactElement {
  const profile: User = useProfile();
  const didRedirect = useDefaultCourseRedirect();
  if (profile && !didRedirect) {
    Router.push("/nocourses");
  }

  const stateChallengeLocalStorage = useSaveStateChallenge(6, 6);
  const localState = stateChallengeLocalStorage.state;
  const localChallenge = stateChallengeLocalStorage.challenge;

  if (
    isWindow &&
    window.localStorage.getItem("state") === null &&
    window.localStorage.getItem("challenge") === null
  ) {
    window.localStorage.setItem("state", localState);
    window.localStorage.setItem("challenge", localChallenge);
  }
  return (
    <Container>
      <ContentContainer>
        <h1>You are currently not logged in</h1>
        <p>Click the button below to login via Khoury Admin</p>
        <Button
          onClick={() => {
            openKhouryOAuthLoginPage();
          }}
        >
          Log in via Khoury Admin
        </Button>
      </ContentContainer>
    </Container>
  );
}
