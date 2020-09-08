import { Button } from "antd";
import styled from "styled-components";
import { ReactElement } from "react";
import { useDefaultCourseRedirect } from "../hooks/useDefaultCourseRedirect";
import { User } from "@template/common";
import Router from "next/router";
import { useProfile } from "../hooks/useProfile";

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  text-align: center;
`;

export default function Login(): ReactElement {
  const profile: User = useProfile();
  const didRedirect = useDefaultCourseRedirect();
  if (profile && !didRedirect) {
    Router.push("/nocourses");
  } 

  return (
    <Container>
      <ContentContainer>
        <h1>You are currently not logged in</h1>
        <p>Click the button below to login via Khoury Admin</p>
        <Button href="https://admin.khoury.northeastern.edu/students/officehourslogin/">
          Login with Khoury
        </Button>
      </ContentContainer>
    </Container>
  );
}
