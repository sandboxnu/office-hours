import { Button } from "antd";
import styled from "styled-components";
import { useProfile } from "../hooks/useProfile";
import { ReactElement } from "react";
import Router from "next/router";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  text-align: center;
`;

export default function Login() {
  const profile = useProfile();
  const [defaultCourse, setDefaultCourse] = useLocalStorage(
    "defaultCourse",
    null
  );

  if (profile) {
    const course = profile.courses;
    if (course.length !== 0) {
      Router.push(
        "/course/[cid]/today",
        `/course/${
          defaultCourse !== null
            ? defaultCourse.id
            : profile.courses[0].course.id
        }/today`
      );
      return "";
    }
    Router.push("nocourses");
    return "";
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
