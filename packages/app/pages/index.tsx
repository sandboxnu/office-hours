import Head from "next/head";
import { User } from "@template/common";
import Router from "next/router";
import { useProfile } from "../hooks/useProfile";

export default function Home() {
  const profile: User = useProfile();

  if (profile) {
    Router.push("/today");
  }

  return (
    <div>
      <Head>
        <title>Khoury Office Hours</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
