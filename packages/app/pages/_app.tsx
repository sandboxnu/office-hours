import { AppProps } from "next/app";
import { Fragment } from "react";
import "antd/dist/antd.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/global.css";
import useSWR from "swr";
import { API } from "@template/api-client";
import { ProfileContext } from "../contexts/ProfileContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error } = useSWR(`/api/v1/profile`, async () =>
    API.profile.index()
  );
  // let profile: User;
  // API.profile.index().then(
  //   (res: User) => profile = res
  // )

  return (
    <Fragment>
      <ProfileContext.Provider value={{ profile: data }}>
        <Component {...pageProps} />
      </ProfileContext.Provider>
    </Fragment>
  );
}

export default MyApp;
