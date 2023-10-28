import { ReactElement } from "react";
import { useProfile } from "../../../../hooks/useProfile";
// import { useRouter } from "next/router";
import { useOrganization } from "../../../../hooks/useOrganization";
import { OrganizationRole } from "@koh/common";
import DefaultErrorPage from "next/error";
import { Breadcrumb, Spin } from "antd";
import Head from "next/head";
import { StandardPageContainer } from "../../../../components/common/PageContainer";
import NavBar from "../../../../components/Nav/NavBar";

export default function Edit(): ReactElement {
  const profile = useProfile();
  // const router = useRouter();
  const { organization } = useOrganization(profile?.organization.id);

  if (
    profile &&
    profile.organization.organizationRole !== OrganizationRole.ADMIN
  ) {
    return <DefaultErrorPage statusCode={404} />;
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
          <Breadcrumb.Item href="">Course</Breadcrumb.Item>
        </Breadcrumb>
      </StandardPageContainer>
    </>
  ) : (
    <Spin />
  );
}
