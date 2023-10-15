import { Card, Spin, Button, Space } from "antd";
import { ReactElement } from "react";
import { useCourse } from "../../../hooks/useCourse";
import { useRouter } from "next/router";
import { StandardPageContainer } from "../../../components/common/PageContainer";
import Head from "next/head";
import Meta from "antd/lib/card/Meta";

export default function Invite(): ReactElement {
  const router = useRouter();
  const { cid, code } = router.query;

  const { course } = useCourse(Number(cid));

  const cardMetaTitle = `You have been invited to join '${course?.name}'`;
  const cardMetaDescription = `This course is managed by ${course?.organizationCourse.name}`;

  if (course && code && code === "demoCodeKey") {
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
                >
                  Accept Invitation
                </Button>
              </Space>
            </Card>
          </div>
        </StandardPageContainer>
      </>
    );
  } else if (course && code && code !== "demoCodeKey") {
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
