import Head from "next/head";
import React, { ReactElement } from "react";
import { StandardPageContainer } from "../components/common/PageContainer";
import Courses from "../components/Admin/course";
export default function SiteAdmin(): ReactElement {
  return (
    <StandardPageContainer>
      <Head>
        <title>Admin</title>
      </Head>
      <Courses />
    </StandardPageContainer>
  );
}
