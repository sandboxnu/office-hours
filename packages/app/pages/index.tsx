import { User } from "@template/common";
import Head from "next/head";
import Router from "next/router";
import { useProfile } from "../hooks/useProfile";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import WebsocketDemo from "../components/WebsocketDemo";
import ClubList from "../components/ClubList";
import { socket } from "../utils/socket";
import { API } from "@template/api-client";
import { Club, WSMessageType } from "@template/common";
import { Button } from "antd";
import styled from "styled-components";
import { register, unregister } from "next-offline/runtime";

export default function Home() {
  const profile: User = useProfile();

  if (profile) {
    Router.push(
      "/class/[cid]/today",
      "/class/" + profile.courses[0].course.id + "/today"
    );
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
    } else if (Notification.permission === "default") {
      console.log("permission not set > requesting");
      await window.Notification.requestPermission();
    }
  };

  const checkBrowserAndRequestNotifications = async () => {
    check();
    // try to get notification permissions
    await requestNotificationPermission();
    // get rid of old service worker, and then try and re-register.
    unregister();
    // have to use setTimeout because unregister does async things, but is sync
    setTimeout(() => {
      register();
    }, 500);
  };
  // end web push code

  return (
    <div>
      <Head>
        <title>Khoury Office Hours</title>
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
