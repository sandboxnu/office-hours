import { KhouryProfCourse } from "@koh/common";
import React, { ReactElement, useState } from "react";
import ConfirmCourses from "./ConfirmCourses";
import EditCourse, { EditCourseInfo } from "./EditCourse";
import SelectCourses from "./SelectCourses";
import { Progress } from "antd";
import styled from "styled-components";

export interface RegisterCourseInfo {
  name: string;
  crns: number[];
  displayName?: string;
  iCalURL?: string;
  coordinator_email?: string;
  timezone?: string;
}

const ProgressBar = styled(Progress)`
  padding-bottom: 2.5em;

  & .ant-progress-inner {
    border: 1px solid #d9d9d9;
  }
`;

export function createSGString({
  name,
  crns,
}: {
  name: string;
  crns: number[];
}): string {
  return `${name} (CRNs: ${crns.join(", ")})`;
}

export const Highlight = styled.span`
  color: #1890ff;
`;

export default function ApplyPage(): ReactElement {
  const [postBody, setPostBody] = useState<RegisterCourseInfo[]>([]);
  const [currentCourse, setCurrentCourse] = useState<number>(-1);

  const handleSelectCourses = (selectedCourses: KhouryProfCourse[]) => {
    setPostBody(
      selectedCourses.map((course) => ({
        name: course.name,
        crns: course.crns,
      }))
    );
    setCurrentCourse(currentCourse + 1);
  };

  const handleSubmitCourse = (courseInfo: EditCourseInfo) => {
    const newPostBody = [...postBody];
    newPostBody[currentCourse] = {
      ...postBody[currentCourse],
      ...courseInfo,
    };
    setPostBody(newPostBody);
    setCurrentCourse(currentCourse + 1);
  };

  const calculateProgress = () => {
    return Math.round(((currentCourse + 1) * 100) / postBody.length);
  };

  return (
    <div style={{ padding: "3% 12%" }}>
      <h1>Apply for Khoury Office Hours</h1>
      <ProgressBar
        percent={calculateProgress()}
        strokeColor="#408FEA"
        trailColor="white"
        strokeWidth={12}
      />
      {currentCourse < 0 ? (
        <SelectCourses
          onSubmit={handleSelectCourses}
          initialValues={postBody.map((c) => c.name)}
        />
      ) : currentCourse < postBody.length ? (
        <EditCourse
          courseInfo={postBody[currentCourse]}
          onSubmitCourse={handleSubmitCourse}
          onBack={() => setCurrentCourse(currentCourse - 1)}
        />
      ) : (
        <ConfirmCourses
          courses={postBody}
          onSubmit={() => 1}
          onBack={() => setCurrentCourse(currentCourse - 1)}
        />
      )}
    </div>
  );
}
