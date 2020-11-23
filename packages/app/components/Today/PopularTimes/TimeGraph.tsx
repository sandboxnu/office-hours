import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { BarRounded } from "@visx/shape";
import { defaultStyles, useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { range } from "lodash";
import React, { ReactElement, useMemo } from "react";
import styled from "styled-components";
import { formatWaitTime } from "../../../utils/TimeUtil";
import { formatDateHour } from "./FormatDateHour";

let tooltipTimeout: number;
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};

// The distance in pixels from the left side of the component to the origin of the graph
const LEFT_MARGIN = 45;
// The distance in pixels from the end of the bottom axis to the right side of the component
const RIGHT_MARGIN = 10;
// The distance in pixels from the top of the component to the top of the y axis
const TOP_MARGIN = 10;
const BOTTOM_MARGIN = 20;
//padding in between each bar as a percent of the bar width
const BAR_PADDING = 0.2;
// the padding to the left of the left axis in pixels

const GraphContainer = styled.div`
  position: relative;

  & .popularTimes__bar {
    cursor: pointer;
  }
`;

export default function TimeGraph({
  values,
  maxTime,
  firstHour,
  lastHour,
  width,
  height,
}: {
  values: number[];
  maxTime: number;
  firstHour: number;
  lastHour: number;
  width: number;
  height: number;
}): ReactElement {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<number>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal();

  // bounds
  const xMax = width - RIGHT_MARGIN - LEFT_MARGIN;
  const yMax = height - TOP_MARGIN - BOTTOM_MARGIN;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<number>({
        range: [0, xMax],
        round: true,
        domain: range(Math.max(0, firstHour), Math.min(lastHour + 1, 24) + 1),
        padding: BAR_PADDING,
      }),
    [xMax, firstHour, lastHour]
  );

  // number of minutes between each grid row line
  const gridRowInterval = maxTime >= 60 ? 60 : 30;
  const maxTickVal = Math.max(maxTime, gridRowInterval);

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, maxTickVal + 5],
      }),
    [yMax, maxTickVal]
  );
  const barWidth = xScale.bandwidth();
  // the tick values for the y axis
  const yAxisTickValues = range(
    gridRowInterval,
    maxTickVal + 1,
    gridRowInterval
  );

  return width < 10 ? null : (
    // relative position is needed for correct tooltip positioning
    <GraphContainer>
      <svg ref={containerRef} width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="rgba(0,0,0,0)"
          rx={14}
        />
        <GridRows
          top={TOP_MARGIN}
          left={LEFT_MARGIN}
          width={width - RIGHT_MARGIN - LEFT_MARGIN}
          scale={yScale}
          tickValues={yAxisTickValues}
          stroke="#cccccc"
        />
        <Group left={LEFT_MARGIN} top={TOP_MARGIN}>
          {values.map((value, i) => {
            const barHeight = yMax - yScale(value);
            const barX = xScale(i) + (barWidth * (1 + BAR_PADDING)) / 2;
            const barY = yMax - barHeight;
            const interactWithBar = () => {
              if (tooltipTimeout) clearTimeout(tooltipTimeout);
              const top = yMax - barHeight - TOP_MARGIN; // - VERTICAL_MARGIN - barHeight;
              const left = barX + barWidth;
              showTooltip({
                tooltipData: value,
                tooltipTop: top,
                tooltipLeft: left,
              });
            };
            return (
              <BarRounded
                key={`bar-${formatDateHour(i)}`}
                className="popularTimes__bar"
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                radius={10}
                top
                fill="#40a9ff"
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip();
                  }, 300);
                }}
                onMouseOver={interactWithBar}
                onMouseDown={interactWithBar}
              />
            );
          })}
        </Group>
        <Group left={LEFT_MARGIN}>
          <AxisBottom
            top={yMax + TOP_MARGIN}
            scale={xScale}
            tickFormat={(hour: number) =>
              (hour - firstHour) % 3 == 0 ? formatDateHour(hour) : ""
            }
            tickLabelProps={() => ({
              fill: "",
              fontSize: 11,
              textAnchor: "middle",
            })}
          />
        </Group>
        <Group top={TOP_MARGIN} left={LEFT_MARGIN}>
          <AxisLeft
            scale={yScale}
            hideTicks={true}
            tickValues={yAxisTickValues}
            tickFormat={(hour: number) => formatWaitTime(hour)}
            tickLabelProps={() => ({
              fill: "",
              fontSize: 11,
              textAnchor: "end",
            })}
          />
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          key={Math.random()} // update tooltip bounds each render
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          {formatWaitTime(tooltipData)}
        </TooltipInPortal>
      )}
    </GraphContainer>
  );
}
