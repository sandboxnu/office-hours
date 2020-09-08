import { Button } from "antd";
import styled from "styled-components";
import { useProfile } from "../hooks/useProfile";
import { ReactElement } from "react";

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
  const profile = useProfile();

  if (profile) {
    const course = profile.courses;
    if (course.length !== 0) {
      window.location.href = `course/${course[0].course.id}/today`;
      return;
    }
    window.location.href = `nocourses`;
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
