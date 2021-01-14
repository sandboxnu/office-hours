import dynamic from "next/dynamic";

import { SimpleChartOutputType } from "@koh/common";
import React, { ReactElement } from "react";

const Bar = dynamic(() => import("@ant-design/charts/lib/bar"));

interface SimpleChartTypes {
  output: SimpleChartOutputType;
}

function SimpleChartComponent({ output }: SimpleChartTypes): ReactElement {
  const data = [
    { year: "1951 year", value: 38 },
    { year: "1952 year", value: 52 },
    { year: "1956 year", value: 61 },
    { year: "1957 year", value: 145 },
    { year: "1958 year", value: 48 },
  ];
  const config = {
    data: data,
    xField: "value",
    yField: "year",
    seriesField: "year",
    legend: { position: "top-left" },
  };

  // const config = {
  //   data: output.data,
  //   xField: output.xAxisName,
  //   yField: output.yAxisName,
  //   seriesField: output.xAxisName,
  // };

  // @ts-ignore
  return <Bar {...config} />;
}

export default SimpleChartComponent;
