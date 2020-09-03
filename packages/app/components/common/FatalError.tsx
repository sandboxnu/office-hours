import { apm } from "@elastic/apm-rum";
import Result from "antd/lib/result";
import { ReactElement, useEffect } from "react";

export function FatalError({ error }: { error: Error }): ReactElement {
  useEffect(() => apm.captureError(error), [error]);
  return (
    <Result
      status="500"
      title="We hit an unexpected error."
      subTitle="Sorry about that! A report has automatically been filed. Try refreshing the page."
    />
  );
}
