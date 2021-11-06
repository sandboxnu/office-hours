import dynamic from "next/dynamic";

import { BarChartOutputType } from "@koh/common";
import React, { ReactElement } from "react";

const Bar = dynamic(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  () => import("@ant-design/charts").then((charts) => charts.Bar),
  {
    ssr: false,
  }
);

interface BarChartTypes {
  output: BarChartOutputType;
}

function BarChartComponent({ output }: BarChartTypes): ReactElement {
  const config = {
    data: output.data,
    xField: output.xField,
    yField: output.yField,
    seriesField: output.seriesField,
    legend: { position: "top-left" },
    xAxisName: output.xAxisName,
    yAxisName: output.yAxisName,
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Bar {...config} />;
}

export default BarChartComponent;
