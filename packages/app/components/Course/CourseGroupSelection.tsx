import { ReactElement, useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { CoursePartial } from "@template/common";
import CourseGroup from "./CourseGroup";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import _ from "lodash";
import Router from "next/router";

const Container = styled.div`
  margin: 32px 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

const Subtitle = styled.div`
  color: #8895a6;
  font-style: italic;
  margin-bottom: 32px;
`;

interface CourseToGroupsMap {
  [genericCourse: string]: CoursePartial[];
}

interface CourseGroupSelectionProps {
  courseToGroupsMap: CourseToGroupsMap;
}

export default function CourseGroupSelection({
  courseToGroupsMap,
}: CourseGroupSelectionProps): ReactElement {
  const [selectedCourseGroups, setSelectedCourseGroups] = useState({});
  const [preferredCourseGroups, setPreferredCourseGroups] = useLocalStorage(
    "preferredCourseGroups",
    null
  );

  return (
    <Container>
      <h1>Select Course Group</h1>
      <Subtitle>Choose the section you are teaching</Subtitle>
      {Object.keys(courseToGroupsMap).map((course) => (
        <CourseGroup
          course={course}
          groups={courseToGroupsMap[course]}
          onChange={(e) =>
            setSelectedCourseGroups({ [course]: e.target.value })
          }
        />
      ))}
      <Button
        onClick={() => {
          setPreferredCourseGroups(selectedCourseGroups);

          const firstCourse =
            selectedCourseGroups[Object.keys(selectedCourseGroups)[0]];
          Router.push(
            "/course/[cid]/today",
            "/course/" + firstCourse.id + "/today"
          );
        }}
        disabled={_.size(selectedCourseGroups) !== _.size(courseToGroupsMap)}
        style={{ marginTop: 48 }}
        type="primary"
      >
        Next
      </Button>
    </Container>
  );
}
