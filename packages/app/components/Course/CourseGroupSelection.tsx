import { ReactElement, useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { CoursePartial } from "@template/common";
import CourseGroup from "./CourseGroup";

const tempGroups = [
  { id: 1, name: "CS 2500 Regular" },
  { id: 2, name: "CS 2500 Accelerated" },
];

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

  return (
    <Container>
      <h1>Select Course Group</h1>
      <Subtitle>Choose the section you are teaching</Subtitle>
      {Object.keys(courseToGroupsMap).map((course) => (
        <CourseGroup
          course={course}
          // groups={courseToGroupsMap[course]}
          groups={tempGroups}
          onChange={(e) =>
            setSelectedCourseGroups({ [course]: e.target.value })
          }
        />
      ))}
      <Button style={{ marginTop: 48 }} type="primary">
        Next
      </Button>
    </Container>
  );
}
