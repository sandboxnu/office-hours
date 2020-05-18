import Head from "next/head";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import WebsocketDemo from "../components/WebsocketDemo";
import ClubList from "../components/ClubList";
import { socket } from "../utils/socket";
import { API } from "@template/api-client";
import { Club, WSMessageType } from "@template/common";

interface HomeProps {
  clubs: Club[];
}

// Plain old React functional component.
export default function Home({ clubs }: HomeProps) {
  const [other, setOther] = useState<Club[]>([]);
  function refreshData() {
    // Runs on client side
    API.club.index().then((c) => {
      setOther(c);
    });
  }

  useEffect(() => {
    refreshData();
    socket.on(WSMessageType.Refresh, () => {
      refreshData();
    });
  }, []);
  return (
    <div>
      <Head>
        <title>Create Sandbox App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Server side rendered:</div>
      <ClubList clubs={clubs} />
      <br />
      <div>Client side fetch:</div>
      <ClubList clubs={other} />
      <button
        onClick={() =>
          API.club.create({
            name: "Sandbox",
            rating: 10,
          })
        }
      >
        Add a club
      </button>
      <br />
      Websocket Demo:
      <br />
      <WebsocketDemo />
      Try opening this page in another tab
      <br />
      Click Add a Club and watch it update on both tabs.
    </div>
  );
}

// This gets called on every request and runs on the server
// https://nextjs.org/docs/basic-features/data-fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const clubs: Club[] = await API.club.index();
  // Pass data to the page via props
  return { props: { clubs } };
};
