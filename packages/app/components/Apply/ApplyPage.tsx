import { KhouryProfCourse } from "@koh/common";
import React, { ReactElement, useState } from "react";
import ConfirmCourses from "./ConfirmCourses";
import EditCourse, { EditCourseInfo } from "./EditCourse";
import SelectCourses from "./SelectCourses";

interface RegisterCourseInfo {
  name: string;
  crns: number[];
  displayName?: string;
  iCalURL?: string;
  coordinator_email?: string;
  timezone?: string;
}

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

  return (
    <div style={{ padding: "3% 12%" }}>
      <h1>Apply for Khoury Office Hours</h1>
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
        <ConfirmCourses />
      )}
    </div>
  );
}
