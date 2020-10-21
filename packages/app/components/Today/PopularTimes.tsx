import { DownOutlined } from "@ant-design/icons";
import { Heatmap } from "@koh/common";
import { AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar, BarRounded } from "@visx/shape";
import { defaultStyles } from "@visx/tooltip";
import useTooltip from "@visx/tooltip/lib/hooks/useTooltip";
import useTooltipInPortal from "@visx/tooltip/lib/hooks/useTooltipInPortal";
import { Dropdown, Menu } from "antd";
import { max, maxBy, range } from "lodash";
import React, { useMemo, useState } from "react";
import styled from "styled-components";

const TitleRow = styled.div`
  display: flex;
`;

interface HeatmapProps {
  heatmap: Heatmap;
}

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function PopularTimes({ heatmap }: HeatmapProps) {
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(new Date().getDay());

  return (
    <div>
      <TitleRow>
        <h2>Popular Times</h2>
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              {DAYS_OF_WEEK.map((dayName, i) => (
                <Menu.Item key={dayName}>
                  <a onClick={() => setCurrentDayOfWeek(i)}>{dayName}</a>
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <a>
            {DAYS_OF_WEEK[currentDayOfWeek]}
            <DownOutlined />
          </a>
        </Dropdown>
      </TitleRow>
      <TimeGraph
        values={heatmap[currentDayOfWeek]}
        maxTime={Math.max(...heatmap.map((daymap) => Math.max(...daymap)))}
        width={500}
        height={500}
      />
    </div>
  );
}
let tooltipTimeout: number;
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};

function TimeGraph({
  values,
  maxTime,
  width,
  height,
}: {
  values: number[];
  maxTime: number;
  width: number;
  height: number;
}) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<number>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal();
  const verticalMargin = 120;

  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // Get the bounds of non-null values in the array
  const [firstHour, lastHour] = values.reduce(
    ([f, l], v, i) => (v ? (f > 0 ? [f, i] : [i, l]) : [f, l]),
    [0, 23]
  );

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<number>({
        range: [0, xMax],
        round: true,
        domain: range(Math.max(0, firstHour - 1), Math.min(lastHour + 1, 23)),
        padding: 0.2,
      }),
    [xMax, firstHour, lastHour]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, maxTime],
      }),
    [yMax, maxTime]
  );

  return width < 10 ? null : (
    // relative position is needed for correct tooltip positioning
    <div style={{ position: "relative" }}>
      <svg ref={containerRef} width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="rgba(0,0,0,0)"
          rx={14}
        />
        <Group top={verticalMargin / 2}>
          {values.map((value, i) => {
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - yScale(value);
            const barX = xScale(i);
            const barY = yMax - barHeight;
            return (
              <BarRounded
                key={`bar-${value}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                radius={20}
                top
                fill="rgba(23, 233, 217, .5)"
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip();
                  }, 300);
                }}
                onMouseMove={(event) => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  const top = event.clientY - verticalMargin / 2 - barHeight;
                  const left = barX + barWidth / 2;
                  showTooltip({
                    tooltipData: value,
                    tooltipTop: top,
                    tooltipLeft: left,
                  });
                }}
              />
            );
          })}
        </Group>
        <AxisBottom
          top={yMax + verticalMargin / 2}
          scale={xScale}
          tickFormat={(hour: number) =>
            hour < 12 ? `${hour + 1}AM` : `${hour - 11}PM`
          }
          tickLabelProps={() => ({
            fill: "",
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: verticalMargin / 4 - 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontSize: "14px",
        }}
      ></div>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          key={Math.random()} // update tooltip bounds each render
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          {tooltipData}
        </TooltipInPortal>
      )}
    </div>
  );
}
