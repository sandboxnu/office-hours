import { KhouryProfCourse } from "@koh/common";
import React, { ReactElement, useState } from "react";
import ConfirmCourses from "./ConfirmCourses";
import EditCourse from "./EditCourse";
import SelectCourses from "./SelectCourses";

class RegisterCourseInfo {
  name!: string;
  crns!: number[];
  displayName?: string;
  iCalURL?: string;
  coordinator_email?: string;
  timezone?: string;
}

export default function ApplyPage(): ReactElement {
  const [postBody, setPostBody] = useState<RegisterCourseInfo[]>([]);
  const [currentCourse, setCurrentCourse] = useState<number>(0);

  const handleSelectCourses = (selectedCourses: KhouryProfCourse[]) => {
    setPostBody(
      selectedCourses.map((course) => ({
        name: course.name,
        crns: course.crns,
      }))
    );
  };

  return (
    <div style={{ padding: "3% 12%" }}>
      <h1>Apply for Khoury Office Hours</h1>
      {postBody.length === 0 ? (
        <SelectCourses onSubmit={handleSelectCourses} />
      ) : currentCourse < postBody.length ? (
        <EditCourse
          courseInfo={postBody[currentCourse]}
          onChangeCourse={setCurrentCourse}
        />
      ) : (
        <ConfirmCourses />
      )}
    </div>
  );
}
