import Result from "antd/lib/result";
import { ReactElement } from "react";

export default function FatalError(): ReactElement {
  return (
    <Result
      status="500"
      title="We hit an unexpected error."
      subTitle="Sorry about that! A report has automatically been filed. Try refreshing the page."
    />
  );
}
