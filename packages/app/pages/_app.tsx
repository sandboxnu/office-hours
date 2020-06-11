import { AppProps } from "next/app";
import "antd/dist/antd.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/global.css";
import "../styles/NavBar.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
