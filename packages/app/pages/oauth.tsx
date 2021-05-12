import { API } from "@koh/api-client";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { StandardPageContainer } from "../components/common/PageContainer";
import Router from "next/router";
import { OAuthAccessTokensRequest } from "@koh/common";
import { Spin } from "antd";

const isWindow = typeof window !== "undefined";

async function signUserIn(request: OAuthAccessTokensRequest): Promise<boolean> {
  const tokens = await API.oauth.tokens(request);
  if (tokens === null) {
    return false;
  }
  window.localStorage.setItem("access", tokens.access);
  window.localStorage.setItem("refresh", tokens.refresh);
  let params = {
    access: tokens.access,
  };
  const userLoginResult = await API.oauth
    .userInfo(params)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  return userLoginResult;
}

export default function OAuth(): ReactElement {
  const router = useRouter();
  const state = router.query.state;
  const authCode = router.query.code;

  let tokensRequestBody: OAuthAccessTokensRequest;

  if (state && authCode && isWindow) {
    const storedState = window.localStorage.getItem("state");
    const storedChallenge = window.localStorage.getItem("challenge");

    if (storedState != state) {
      // if the states are not equal then a CRSF attack may be happening so do not continue with OAuth sign in and return to login
      // also, may want to notify khoury admin page. An error also could have happened so that is another possibility.
      Router.push("/login");
    } else {
      tokensRequestBody = {
        code: authCode as string,
        verifier: storedChallenge,
      };
      signUserIn(tokensRequestBody).then((result) => {
        if (result) {
          Router.push("/nocourses");
        } else {
          Router.push("/login");
        }
      });
    }
  }

  return (
    <StandardPageContainer>
      <Spin style={{ margin: "10% 45%" }} />
    </StandardPageContainer>
  );
}
