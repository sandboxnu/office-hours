import { ReactElement, useState } from "react";
import { useOrganization } from "../../../../hooks/useOrganization";
import { useProfile } from "../../../../hooks/useProfile";
import { OrganizationRole } from "@koh/common";
import DefaultErrorPage from "next/error";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Spin,
  Table,
} from "antd";
import { StandardPageContainer } from "../../../../components/common/PageContainer";
import Head from "next/head";
import NavBar from "../../../../components/Nav/NavBar";
import { useRouter } from "next/router";
import { API } from "@koh/api-client";
import useSWR from "swr";
import { ColumnsType } from "antd/es/table";

interface CourseType {
  id: string;
  name: string;
  role: string;
}

export default function Edit(): ReactElement {
  const profile = useProfile();
  const router = useRouter();
  const uid = router.query["uid"];
  const { organization } = useOrganization(profile?.organization.id);

  if (
    profile &&
    profile.organization.organizationRole !== OrganizationRole.ADMIN
  ) {
    return <DefaultErrorPage statusCode={404} />;
  }

  function RenderUserInfo(): ReactElement {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log("selectedRowKeys changed: ", newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };

    const courseColumns: ColumnsType<CourseType> = [
      {
        title: "Course Code",
        dataIndex: "id",
      },
      {
        title: "Course Name",
        dataIndex: "name",
      },
      {
        title: "Course Role",
        dataIndex: "role",
      },
    ];

    const { data: userData, error } = useSWR(
      `api/v1/organization/[oid]/get_user/[uid]`,
      async () => API.organizations.getUser(organization?.id, Number(uid))
    );

    if (error) {
      router.push("/organization/settings");
    }

    const hasSelected = selectedRowKeys.length > 0;

    return userData ? (
      <>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={{ span: 24 }} sm={{ span: 9 }} />

          <Col xs={{ span: 24 }} sm={{ span: 15 }}>
            <Card bordered={true} title="General">
              <Form
                layout="vertical"
                initialValues={{
                  firstName: userData.user.firstName,
                  lastName: userData.user.lastName,
                  email: userData.user.email,
                }}
              >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      initialValue={userData.user.firstName}
                      tooltip="First name of the user"
                    >
                      <Input
                        allowClear={true}
                        defaultValue={userData.user.firstName}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      initialValue={userData.user.lastName}
                      tooltip="Last name of the user"
                    >
                      <Input
                        allowClear={true}
                        defaultValue={userData.user.lastName}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="Email"
                      name="email"
                      initialValue={userData.user.email}
                      tooltip="Email address of the user"
                    >
                      <Input
                        allowClear={true}
                        defaultValue={userData.user.email}
                        type="email"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                    <Form.Item
                      label="Student Number"
                      name="sid"
                      initialValue={userData.user.sid}
                      tooltip="Student number of the user"
                    >
                      <Input
                        allowClear={true}
                        defaultValue={userData.user.sid}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-auto p-3"
                  >
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 9 }} />

          <Col xs={{ span: 24 }} sm={{ span: 15 }} style={{ marginTop: 20 }}>
            <Card bordered={true} title="Courses Information">
              <Button
                type="primary"
                danger
                disabled={!hasSelected}
                style={{ marginBottom: 10 }}
                className="w-full h-auto p-3"
              >
                Drop Courses
              </Button>

              <Table
                dataSource={userData.courses}
                columns={courseColumns}
                rowSelection={rowSelection}
              />
            </Card>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 9 }} />

          <Col
            xs={{ span: 24 }}
            sm={{ span: 15 }}
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            <Card
              bordered={true}
              title="Danger Zone"
              className="border-2 border-rose-500/[.35]"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-5/6 md:mr-4 mb-2 md:text-left">
                  <strong>Deactivate this account</strong>
                  <div className="mb-0">
                    Once you deactivate an account, the user will not be able to
                    access organization resources.
                  </div>
                </div>
                <Button danger className="w-full md:w-auto">
                  Deactivate this account
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </>
    ) : (
      <Spin />
    );
  }

  return profile &&
    profile.organization.organizationRole == OrganizationRole.ADMIN &&
    organization ? (
    <>
      <Head>
        <title>{organization?.name} | Admin Panel</title>
      </Head>
      <StandardPageContainer>
        <NavBar />

        <Breadcrumb separator=">" style={{ marginTop: 10, marginBottom: 20 }}>
          <Breadcrumb.Item href="/organization/settings">
            Organization Settings
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">User</Breadcrumb.Item>
        </Breadcrumb>
        <RenderUserInfo />
      </StandardPageContainer>
    </>
  ) : (
    <Spin />
  );
}
