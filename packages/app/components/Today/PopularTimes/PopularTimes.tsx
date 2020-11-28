import {
  ClockCircleOutlined,
  DownOutlined,
  HourglassOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Heatmap } from "@koh/common";
import { ParentSize } from "@visx/responsive";
import { Dropdown, Menu } from "antd";
import { chunk, uniq, mean, sortBy } from "lodash";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { formatWaitTime } from "../../../utils/TimeUtil";
import { formatDateHour } from "./FormatDateHour";
import TimeGraph from "./TimeGraph";

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
`;

const WeekdayDropdown = styled.h2`
  display: flex;
  align-items: center;
  margin-left: 8px;
  color: #1890ff;
  cursor: pointer;
`;

const GraphWithArrow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const GraphContainer = styled.div`
  flex-grow: 1;
  min-width: 0; // Allow it to shrink after resizing
`;

const GraphArrowButtons = styled.div`
  padding: 20px 5px;
  font-size: 1.5em;
  cursor: pointer;
`;

const GraphNotes = styled.h4`
  font-size: 14px;
  color: #111;
  padding-left: 40px;
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

function findWeekMinAndMax(days: Heatmap) {
  let minHourInWeek = 24;
  let maxHourInWeek = 0;
  days.forEach((v, hour) => {
    if (v >= 0) {
      if (hour % 24 > maxHourInWeek) {
        maxHourInWeek = hour % 24;
      }
      if (hour % 24 < minHourInWeek) {
        minHourInWeek = hour % 24;
      }
    }
  });
  if (maxHourInWeek < minHourInWeek) {
    return [0, 23];
  }
  return [minHourInWeek, maxHourInWeek];
}

const BUSY = {
  shortest: "the shortest",
  shorter: "shorter than usual",
  avg: "average",
  longer: "longer than usual",
  longest: "the longest",
};

// Mapping for text describing level of business, given the length of the unique wait times that week (to account for days without hours)
const BUSY_TEXTS = {
  1: [BUSY.avg],
  2: [BUSY.shortest, BUSY.longest],
  3: [BUSY.shortest, BUSY.avg, BUSY.longest],
  4: [BUSY.shortest, BUSY.shorter, BUSY.longer, BUSY.longest],
  5: [BUSY.shortest, BUSY.shorter, BUSY.avg, BUSY.longer, BUSY.longest],
  6: [
    BUSY.shortest,
    BUSY.shorter,
    BUSY.shorter,
    BUSY.longer,
    BUSY.longer,
    BUSY.longest,
  ],
  7: [
    BUSY.shortest,
    BUSY.shorter,
    BUSY.shorter,
    BUSY.avg,
    BUSY.longer,
    BUSY.longer,
    BUSY.longest,
  ],
};

function generateBusyText(day: number, dailySumWaitTimes: number[]): string {
  const dayWaitTime = dailySumWaitTimes[day];
  const uniqSumWaitTimes = uniq(
    sortBy(dailySumWaitTimes.filter((v) => v >= 0))
  );
  const rank = uniqSumWaitTimes.indexOf(dayWaitTime);
  return BUSY_TEXTS[uniqSumWaitTimes.length][rank];
}

export default function PopularTimes({ heatmap }: HeatmapProps): ReactElement {
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(new Date().getDay());
  const [firstHour, lastHour] = findWeekMinAndMax(heatmap);
  const dailyAvgWaitTimes: number[] = chunk(heatmap, 24).map((hours) => {
    const filteredOfficeHours = hours.filter((v) => v !== -1);
    return filteredOfficeHours.length > 0 ? mean(filteredOfficeHours) : -1;
  });

  return (
    <div className="hide-in-percy">
      <TitleRow>
        <h2>Wait Times on</h2>
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
          <WeekdayDropdown>
            {DAYS_OF_WEEK[currentDayOfWeek]}
            <DownOutlined />
          </WeekdayDropdown>
        </Dropdown>
      </TitleRow>
      <GraphWithArrow>
        <GraphArrowButtons
          onClick={() => setCurrentDayOfWeek((7 + currentDayOfWeek - 1) % 7)}
        >
          <LeftOutlined />
        </GraphArrowButtons>
        <GraphContainer>
          <ParentSize>
            {({ width }) => (
              <TimeGraph
                values={heatmap
                  .slice(currentDayOfWeek * 24, (currentDayOfWeek + 1) * 24 - 1)
                  .map((i) => (i < 0 ? 0 : Math.floor(i)))}
                maxTime={Math.max(...heatmap)}
                firstHour={firstHour}
                lastHour={lastHour}
                width={width}
                height={220}
              />
            )}
          </ParentSize>
        </GraphContainer>
        <GraphArrowButtons
          onClick={() => setCurrentDayOfWeek((currentDayOfWeek + 1) % 7)}
        >
          <RightOutlined />
        </GraphArrowButtons>
      </GraphWithArrow>
      {dailyAvgWaitTimes[currentDayOfWeek] >= 0 && (
        <GraphNotes>
          <ClockCircleOutlined /> {DAYS_OF_WEEK[currentDayOfWeek]}s have{" "}
          <strong>
            {generateBusyText(currentDayOfWeek, dailyAvgWaitTimes)}
          </strong>{" "}
          wait times.
        </GraphNotes>
      )}
      {new Date().getDay() === currentDayOfWeek &&
        heatmap[currentDayOfWeek * 24 + new Date().getHours()] >= 0 && (
          <GraphNotes>
            <HourglassOutlined /> At {formatDateHour(new Date().getHours())},
            people generally wait{" "}
            <strong>
              {formatWaitTime(
                heatmap[currentDayOfWeek * 24 + new Date().getHours()]
              )}
            </strong>
            .
          </GraphNotes>
        )}
    </div>
  );
}
