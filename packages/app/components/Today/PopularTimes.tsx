import { ClockCircleOutlined, DownOutlined, HourglassOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Heatmap } from "@koh/common";
import { Dropdown, Menu } from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import TimeGraph from "./TimeGraph";

// TODO:
// - Thursdays have {the shortest} / {shorter than usual} / {average} / {longer than usual} / {the longest} wait times
// - At {4pm}, people generally wait for {4} hour{s}

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
       <HourglassOutlined />
        {" "}
        {/* function to generate text */}
        Today is busier than usual
      </GraphNotes>
      <GraphNotes>
        <ClockCircleOutlined />
        {" "}
        {/* function to generate text */}
        At 4pm, people generally wait {}. 
      </GraphNotes>
    </div>
  );
}
