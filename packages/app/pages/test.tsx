import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import GPTChatbotPage from "../components/Chatbot/Chatbot";
import { StandardPageContainer } from "../components/common/PageContainer";
import NavBar from "../components/Nav/NavBar";

export default function Chatbot(): ReactElement {
  const router = useRouter();
  const courseId = router.query["cid"];

  return (
    <StandardPageContainer>
      <Head>
        <title>Chatbot | Khoury Office Hours</title>
      </Head>
      <NavBar courseId={Number(courseId)} />
      <GPTChatbotPage />
    </StandardPageContainer>
  );
}
