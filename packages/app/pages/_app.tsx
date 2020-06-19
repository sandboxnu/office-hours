import { AppProps } from "next/app";
import { Fragment, useEffect } from "react";
import "antd/dist/antd.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/global.css";
import useSWR from "swr";
import { API } from "@template/api-client";
import { ProfileContext } from "../contexts/ProfileContextProvider";
import { register, unregister } from "next-offline/runtime";

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error } = useSWR(`/api/v1/profile`, async () =>
    API.profile.index()
  );

  useEffect(() => {
    register(`/service-worker.js`);
    return () => {
      unregister();
    };
  });

  return (
    <Fragment>
      <ProfileContext.Provider value={{ profile: data }}>
        <Component {...pageProps} />
      </ProfileContext.Provider>
    </Fragment>
  );
}

export default MyApp;
