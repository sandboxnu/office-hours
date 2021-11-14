import Head from "next/head";
import React, { ReactElement } from "react";
import { StandardPageContainer } from "../components/common/PageContainer";
import ApplyPage from "../components/Apply/ApplyPage";

export default function Apply(): ReactElement {
  return (
    <StandardPageContainer>
      <Head>
        <title>Apply | Khoury Office Hours</title>
      </Head>
      <ApplyPage />
    </StandardPageContainer>
  );
}
