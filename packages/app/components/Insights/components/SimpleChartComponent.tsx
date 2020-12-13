import { Insight } from "@koh/common";
import { max, range } from "lodash";
import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

interface SimpleChartTypes {
  insight: Insight;
}

function SimpleChartComponent({ insight }: SimpleChartTypes): ReactElement {
  console.log("simple chart output", insight.output);
  const yAxisName = Object.keys(insight.output.data[0])[1];
  const xAxisName = Object.keys(insight.output.data[0])[0];
  const yAxisValues = insight.output.data.map((obj) =>
    parseInt(obj[yAxisName])
  );

  console.log("INSIGHT DATA", insight.output.data);

  return (
    <VictoryChart
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      domainPadding={20}
    >
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis

        //range(min, max, step).
        tickValues={insight.output.xAxisLabels}
      />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickValues={range(0, max(yAxisValues), 50)}
      />
      <VictoryBar
        data={insight.output.data}
        x={xAxisName}
        y={yAxisName}
        range={{ y: [0, max(yAxisValues)] }}
      />
    </VictoryChart>
  );
}

export default SimpleChartComponent;
