import "antd/dist/antd.css";
import { AppProps } from "next/app";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/global.css";
import { init as initApm } from "@elastic/apm-rum";
import { Footer } from "../components/common/Footer";
import styled from "styled-components";

if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
  initApm({
    serviceName: `${window.location.hostname.replace(/\./g, "-")}-frontend`,
    serverUrl: process.env.NEXT_PUBLIC_APM_SERVER,
  });
}

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1 0 auto;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Content>
        <Component {...pageProps} />
      </Content>
      <Footer />
    </Layout>
  );
}

export default MyApp;
