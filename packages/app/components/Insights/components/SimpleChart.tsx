import { Insight } from "@koh/common";
import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

interface SimpleChartTypes {
  insight: Insight;
}

function SimpleChart({ insight }: SimpleChartTypes): ReactElement {
  return (
    <VictoryChart
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      domainPadding={20}
    >
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickValues={[1, 2, 3, 4]}
        tickFormat={insight.output.tickFormat}
      />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={(x) => `$${x / 1000}k`}
      />
      <VictoryBar data={insight.output.data} x="quarter" y="earnings" />
    </VictoryChart>
  );
}

export default SimpleChart;
