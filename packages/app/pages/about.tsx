import Head from "next/head";
import React, { ReactElement } from "react";
import AboutPage from "../components/About/AboutPage";
import { StandardPageContainer } from "../components/common/PageContainer";

export default function About(): ReactElement {
  return (
    <StandardPageContainer>
      <Head>
        <title>About | Khoury Office Hours</title>
      </Head>
      <AboutPage />
    </StandardPageContainer>
  );
}
