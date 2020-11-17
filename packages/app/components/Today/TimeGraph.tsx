import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { BarRounded } from "@visx/shape";
import { defaultStyles, useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { range } from "lodash";
import React, { ReactElement, useMemo } from "react";
import styled from "styled-components";
import { formatDateHour, formatWaitTime } from "../../utils/TimeUtil";

//TODO:
// - Fix Y axis (Ticks on the left side are cut off, we need CSS to mess around with positioning)
// - Fix Gridlines (incremented by 30 min?, incremented as a function of the maxWaitTime (like if its less than 30 min should it be 15 min? How about less than 15 min?))
let tooltipTimeout: number;
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};
const HORIZONTAL_PADDING = 40;
const VERTICAL_MARGIN = 40;
// number of minutes between each grid row line
const GRID_ROW_INTERVAL = 30;
const BAR_PADDING = 0.2;

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
  const xMax = width - HORIZONTAL_PADDING;
  const yMax = height - VERTICAL_MARGIN;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<number>({
        range: [0, xMax],
        round: true,
        domain: range(Math.max(0, firstHour), Math.min(lastHour + 1, 24)),
        padding: BAR_PADDING,
      }),
    [xMax, firstHour, lastHour]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(maxTime, 1)],
      }),
    [yMax, maxTime]
  );
  const barWidth = xScale.bandwidth();

  const LEFT_PADDING = HORIZONTAL_PADDING / 2 - barWidth / 2;

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
          top={VERTICAL_MARGIN / 2}
          width={width - HORIZONTAL_PADDING}
          scale={yScale}
          tickValues={range(1, maxTime, GRID_ROW_INTERVAL)} // gridrow should not be at 0
          stroke="#cccccc"
        />
        <Group left={LEFT_PADDING} top={VERTICAL_MARGIN / 2}>
          {values.map((value, i) => {
            const barHeight = yMax - yScale(value);
            const barX = xScale(i) + (barWidth * (1 + BAR_PADDING)) / 2;
            const barY = yMax - barHeight;
            const interactWithBar = () => {
              if (tooltipTimeout) clearTimeout(tooltipTimeout);
              const top = yMax - barHeight; // - VERTICAL_MARGIN - barHeight;
              const left = barX + barWidth / 2;
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
        <Group left={LEFT_PADDING}>
          <AxisBottom
            top={yMax + VERTICAL_MARGIN / 2}
            rangePadding={HORIZONTAL_PADDING / 2}
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
        <Group top={VERTICAL_MARGIN / 2} left={LEFT_PADDING}>
          <AxisLeft
            scale={yScale}
            tickValues={range(0, maxTime, GRID_ROW_INTERVAL)}
            tickFormat={(hour: number) => formatWaitTime(hour)}
            tickLabelProps={() => ({
              fill: "",
              fontSize: 10,
              textAnchor: "middle",
              display: "flex",
              marginRight: "30px",
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
