import { Card, Spin, Button, Space } from "antd";
import { ReactElement, useEffect } from "react";
import { useCourse } from "../../../hooks/useCourse";
import { useRouter } from "next/router";
import { StandardPageContainer } from "../../../components/common/PageContainer";
import Head from "next/head";
import Meta from "antd/lib/card/Meta";
import { API } from "@koh/api-client";
import { useProfile } from "../../../hooks/useProfile";
import { UBCOuserParam } from "@koh/common";
import { useLimitedCourse } from "../../../hooks/useLimitedCourse";

export default function Invite(): ReactElement {
  const router = useRouter();
  const { cid, code } = router.query;
  const profile = useProfile();
  const { course } = useLimitedCourse(Number(cid));

  const isLoading = !profile || !course;

  const cardMetaTitle = `You have been invited to join '${course?.name}'`;
  const cardMetaDescription = `This course is managed by ${course?.organizationCourse.name}`;

  useEffect(() => {
    if (!profile) {
      localStorage.setItem("lastVisited", window.location.href);
    }
  }, [profile]);

  // Register student and redirect to course
  const addStudent = async (userData: UBCOuserParam) => {
    await API.signup.registerStudent(userData);
    localStorage.removeItem("lastVisited");
    window.location.href = "/courses";
  };

  // If the user is already in the course, redirect to courses page
  if (
    profile &&
    profile.courses.some((userCourse) => userCourse.course.id === Number(cid))
  ) {
    localStorage.removeItem("lastVisited");
    window.location.href = "/courses";
  }

  const renderCard = (
    title,
    description,
    buttonLabel,
    buttonAction,
    cover = null
  ) => (
    <Card style={{ width: 600, textAlign: "center" }} cover={cover}>
      <h1>{title}</h1>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Meta title={description.title} description={description.text} />
        <Button
          type="primary"
          style={{ width: "100%", height: 50, borderRadius: "5px" }}
          onClick={buttonAction}
        >
          {buttonLabel}
        </Button>
      </Space>
    </Card>
  );

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <StandardPageContainer>
      <Head>
        <title>
          {course ? `Invitation to join ‘${course?.name}‘` : "Invalid Invite"}
        </title>
      </Head>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 200,
        }}
      >
        {profile?.organizationId !== course?.organizationCourse.id
          ? renderCard(
              "You cannot join a course that is not in your organization",
              {},
              "Back to my courses",
              () => {
                localStorage.removeItem("lastVisited");
                window.location.href = "/courses";
              }
            )
          : code !== course?.courseInviteCode
          ? renderCard("Invalid Course Code", {}, "Back to my courses", () => {
              localStorage.removeItem("lastVisited");
              window.location.href = "/courses";
            })
          : renderCard(
              `Invitation to join ‘${course?.name}‘`,
              { title: cardMetaTitle, text: cardMetaDescription },
              "Accept Invitation",
              async () => {
                const userData: UBCOuserParam = {
                  email: profile.email,
                  first_name: profile.firstName ?? "",
                  password: "",
                  last_name: profile.lastName ?? "",
                  selected_course: course.id,
                  sid: profile.sid,
                  photo_url: profile.photoURL,
                  courses: [],
                };
                await addStudent(userData);
              },
              <img
                alt="example"
                height="200"
                style={{ objectFit: "cover" }}
                src="https://open-2021.sites.olt.ubc.ca/files/2020/10/OSIP-2020-Slider.jpg"
              />
            )}
      </div>
    </StandardPageContainer>
  );
}
