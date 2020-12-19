import { Bar } from "@ant-design/charts";
import { Insight, SimpleChartOutputType } from "@koh/common";
import React, { ReactElement } from "react";

interface SimpleChartTypes {
  insight: Insight;
}

function SimpleChartComponent({ insight }: SimpleChartTypes): ReactElement {
  const config = {
    data: (insight.output as SimpleChartOutputType).data,
    xField: (insight.output as SimpleChartOutputType).xAxisName,
    yField: (insight.output as SimpleChartOutputType).yAxisName,
    seriesField: (insight.output as SimpleChartOutputType).xAxisName,
  };
  return <Bar {...config} />;
}

export default SimpleChartComponent;
