import "antd/dist/antd.css";
import { AppProps } from "next/app";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/global.css";
import { init as initApm } from "@elastic/apm-rum";

function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === "production") {
    initApm({
      serviceName: `${new URL(process.env.DOMAIN).hostname.replace(
        /\./g,
        "-"
      )}-frontend`,
      serverUrl: process.env.NEXT_PUBLIC_APM_SERVER,
    });
  }
  return <Component {...pageProps} />;
}

export default MyApp;
