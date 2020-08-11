import { init as initApm } from "@elastic/apm-rum";
import "antd/dist/antd.css";
import { AppProps } from "next/app";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-phone-input-2/lib/style.css";
import "../styles/global.css";

if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
  initApm({
    serviceName: `${window.location.hostname.replace(/\./g, "-")}-frontend`,
    serverUrl: process.env.NEXT_PUBLIC_APM_SERVER,
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
