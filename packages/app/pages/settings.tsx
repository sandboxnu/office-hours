import { Container } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import NavBar from "../components/Nav/NavBar";
import SettingsPage from "../components/Settings/SettingsPage";

export default function Settings(): ReactElement {
  const router = useRouter();
  const courseId = router.query["cid"];
  return (
    <div>
      <Head>
        <title>Settings | Khoury Office Hours</title>
      </Head>
      <NavBar courseId={Number(courseId)} />
      {/* TODO: think of something better, but current idea is to just have a back button that takes them back*/}
      <Container>
        <>
          <SettingsPage />
        </>
      </Container>
    </div>
  );
}
