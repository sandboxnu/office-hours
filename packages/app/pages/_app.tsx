import { API } from "@template/api-client";
import "antd/dist/antd.css";
import { AppProps } from "next/app";
import { Fragment } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useSWR from "swr";
import { ProfileContext } from "../contexts/ProfileContextProvider";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error } = useSWR(`/api/v1/profile`, async () =>
    API.profile.index()
  );

  return (
    <Fragment>
      <ProfileContext.Provider value={{ profile: data }}>
        <Component {...pageProps} />
      </ProfileContext.Provider>
    </Fragment>
  );
}

export default MyApp;
