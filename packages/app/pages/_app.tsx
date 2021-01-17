import "antd/dist/antd.css";
import { AppProps } from "next/app";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/global.css";
import { init as initApm } from "@elastic/apm-rum";
import { Footer } from "../components/common/Footer";
import styled from "styled-components";
import { ReactElement } from "react";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import * as Sentry from "@sentry/node";

if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
  initApm({
    serviceName: `${window.location.hostname.replace(/\./g, "-")}-frontend`,
    serverUrl: process.env.NEXT_PUBLIC_APM_SERVER,
    serviceVersion: process.env.NEXT_PUBLIC_SERVICE_VERSION,
  });
  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    dsn:
      "https://9cfb47804c93495ba3a66a9d79cec084@o440615.ingest.sentry.io/5557379",
  });
}

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Layout>
      <Content>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Content>
      <Footer />
    </Layout>
  );
}

export default MyApp;
