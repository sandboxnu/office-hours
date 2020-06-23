import Head from "next/head";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import WebsocketDemo from "../components/WebsocketDemo";
import ClubList from "../components/ClubList";
import { socket } from "../utils/socket";
import { API } from "@template/api-client";
import { Club, WSMessageType } from "@template/common";
import { Space, Button } from "antd";
import styled from "styled-components";

const Title = styled.h1`
  color: red;
`;

const AddButton = styled(Button)`
  margin-left: 24px;
`;

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

  // web push code
  const check = () => {
    if (!("serviceWorker" in navigator)) {
      throw new Error("No Service Worker support!");
    }
    if (!("PushManager" in window)) {
      throw new Error("No Push API Support!");
    }
  };

  const requestNotificationPermission = async () => {
    if (Notification.permission === "granted") {
      console.log(`permission previously granted`);
    } else if (Notification.permission === "denied") {
      console.log("permission previously denied");
      const permission = await window.Notification.requestPermission();
    } else if (Notification.permission === "default") {
      console.log("permission not set");
      const permission = await window.Notification.requestPermission();
    }
  };

  const checkBrowserAndRequestNotifications = async () => {
    check();
    const permission = await requestNotificationPermission();
  };

  // end web push code

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
      <AddButton
        type="primary"
        onClick={() =>
          API.club.create({
            name: "Sandbox",
            rating: 10,
          })
        }
      >
        Add a club
      </AddButton>
      <br />
      <Title>Websocket Demo:</Title>
      <br />
      <WebsocketDemo />
      Try opening this page in another tab
      <br />
      Click Add a Club and watch it update on both tabs.
      <Button size="large" onClick={checkBrowserAndRequestNotifications}>
        Request Notification Permission
      </Button>
      <Button size="large" onClick={() => API.notif.notify_user(1)}>
        Test Notify
      </Button>
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
