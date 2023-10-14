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

export default function Invite(): ReactElement {
  const router = useRouter();
  const { cid, code } = router.query;
  const { course } = useCourse(Number(cid));
  const profile = useProfile();

  const cardMetaTitle = `You have been invited to join '${course?.name}'`;
  const cardMetaDescription = `This course is managed by ${course?.organizationCourse.name}`;

  useEffect(() => {
    if (!profile) {
      localStorage.setItem("lastVisited", window.location.href);
    }
  }, [profile]);

  const addStudent = async (userData: UBCOuserParam) => {
    await API.signup.registerStudent(userData);
  };

  if (profile?.organizationId != course?.organizationCourse.id) {
    return (
      <>
        <StandardPageContainer>
          <Head>
            <title>Invalid Invite</title>
          </Head>
          You cannot join a course that is not in your organization
        </StandardPageContainer>
      </>
    );
  } else if (course && code && code === course?.courseInviteCode) {
    return (
      <>
        <StandardPageContainer>
          <Head>
            <title>Invitation to join &lsquo;{course?.name}&lsquo;</title>
          </Head>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 200,
            }}
          >
            <Card
              style={{ width: 600, textAlign: "center" }}
              cover={
                <img
                  alt="example"
                  height="200"
                  style={{ objectFit: "cover" }}
                  src="https://open-2021.sites.olt.ubc.ca/files/2020/10/OSIP-2020-Slider.jpg"
                />
              }
            >
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="large"
              >
                <Meta title={cardMetaTitle} description={cardMetaDescription} />
                <Button
                  type="primary"
                  style={{ width: "100%", height: 50, borderRadius: "5px" }}
                  onClick={async () => {
                    const userData: UBCOuserParam = {
                      email: profile.email,
                      first_name: profile.firstName,
                      password: "",
                      last_name: profile.lastName,
                      selected_course: course.id,
                      sid: profile.sid,
                      photo_url: profile.photoURL,
                      courses: [],
                    };
                    await addStudent(userData);
                  }}
                >
                  Accept Invitation
                </Button>
              </Space>
            </Card>
          </div>
        </StandardPageContainer>
      </>
    );
  } else if (course && code && code !== course?.courseInviteCode) {
    return (
      <>
        <StandardPageContainer>
          <Head>
            <title>Page Not Found or is it?</title>
          </Head>
          page not found?
        </StandardPageContainer>
      </>
    );
  } else {
    return <Spin tip="Loading..." size="large" />;
  }
}
