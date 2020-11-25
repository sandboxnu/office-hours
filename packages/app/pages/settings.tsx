import { Layout } from "antd";
import { Container } from "next/app";
import Head from "next/head";
import React, { ReactElement } from "react";
import NavBar from "../components/Nav/NavBar";
import SettingsPage from "../components/Settings/SettingsPage";

export default function Settings(): ReactElement {
  return (
    <div>
      <Head>
        <title>Settings | Khoury Office Hours</title>
      </Head>
      <NavBar courseId={1} />{" "}
      {/* TODO: think of something better, but current idea is to just have a back button that takes them back*/}
      <Container>
        <>
          <SettingsPage />
        </>
      </Container>
    </div>
  );
}
