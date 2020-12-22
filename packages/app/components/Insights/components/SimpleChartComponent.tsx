// import { Bar } from "@ant-design/charts";
import { SimpleChartOutputType } from "@koh/common";
import React, { ReactElement } from "react";

interface SimpleChartTypes {
  output: SimpleChartOutputType;
}

function SimpleChartComponent({ output }: SimpleChartTypes): ReactElement {
  const config = {
    data: output.data,
    xField: output.xAxisName,
    yField: output.yAxisName,
    seriesField: output.xAxisName,
  };
  // TODO: Figure out why this is erroring
  // return <Bar {...config} />;
  return null;
}

export default SimpleChartComponent;
