import {
  ClockCircleOutlined,
  DownOutlined,
  HourglassOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Heatmap } from "@koh/common";
import { Dropdown, Menu } from "antd";
import { range, sum, uniq } from "lodash";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { formatDateHour, formatWaitTime } from "../../utils/TimeUtil";
import TimeGraph from "./TimeGraph";

// TODO:
// - Case to handle: No office hours in a week? Right now heatmap is full of nulls, we cant graph nulls
// right now the day ranking includes days with no office hours at all i believe, we want to filter out days with no wait times

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
`;

interface HeatmapProps {
  heatmap: Heatmap;
}

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

const GraphArrowButtons = styled.div`
  padding: 20px 10px;
  font-size: 1.5em;
  cursor: pointer;
`;

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
  days.forEach((day) =>
    day.forEach((v, hour) => {
      if (v) {
        if (hour > maxHourInWeek) {
          maxHourInWeek = hour;
        } else if (hour < minHourInWeek) {
          minHourInWeek = hour;
        }
      }
    })
  );

  return [minHourInWeek, maxHourInWeek];
}

const GraphNotes = styled.h4`
  font-size: 14px;
  color: #111;
  padding-left: 40px;
`;

function generateBusyText(day: number, heatmap: Heatmap): string {
  let dailySumWaitTimes = heatmap.map((hours) => sum(hours));
  const dayWaitTime = dailySumWaitTimes[day];
  dailySumWaitTimes = uniq(dailySumWaitTimes).sort((a, b) => a - b);
  const mid =
    dailySumWaitTimes.length % 2 == 0
      ? dailySumWaitTimes.length / 2 - 1
      : Math.ceil(dailySumWaitTimes.length / 2) - 1;
  const rank = dailySumWaitTimes.indexOf(dayWaitTime);
  if (rank === mid) {
    return "average";
  } else if (rank === 0) {
    return "the shortest";
  } else if (rank === dailySumWaitTimes.length - 1) {
    return "the longest";
  } else if (rank > 0 && rank < mid) {
    return "shorter than usual";
  } else {
    return "longer than usual";
  }
}

export default function PopularTimes({ heatmap }: HeatmapProps): ReactElement {
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(new Date().getDay());
  const [firstHour, lastHour] = findWeekMinAndMax(heatmap);
  return (
    <div>
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
        <TimeGraph
          values={heatmap[currentDayOfWeek]}
          maxTime={Math.max(...heatmap.map((daymap) => Math.max(...daymap)))}
          firstHour={firstHour}
          lastHour={lastHour}
          width={500}
          height={200}
        />
        <GraphArrowButtons
          onClick={() => setCurrentDayOfWeek((currentDayOfWeek + 1) % 7)}
        >
          <RightOutlined />
        </GraphArrowButtons>
      </GraphWithArrow>
      <GraphNotes>
        <ClockCircleOutlined /> {DAYS_OF_WEEK[currentDayOfWeek]}s have{" "}
        <strong>{generateBusyText(currentDayOfWeek, heatmap)}</strong> wait
        times.
      </GraphNotes>
      <GraphNotes>
        <HourglassOutlined /> At {formatDateHour(new Date())}, people generally
        wait{" "}
        <strong>
          {formatWaitTime(heatmap[currentDayOfWeek][new Date().getHours()])}
        </strong>
        .
      </GraphNotes>
    </div>
  );
}
