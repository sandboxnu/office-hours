import { User, CoursePartial } from "@template/common";
import { useRouter } from "next/router";
import { useProfile } from "../../hooks/useProfile";
import { ReactElement, useState } from "react";
import styled from "styled-components";
import { Radio } from "antd";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CourseTitle = styled.div`
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
`;

const Group = styled(Radio.Button)`
  display: block;
  margin-bottom: 8px;
`;

interface CourseToGroupsMap {
  [genericCourse: string]: CoursePartial[];
}

interface CourseGroupProps {
  course: string;
  groups: CoursePartial[];
  onChange: (e) => void;
}

export default function CourseGroup({
  course,
  groups,
  onChange,
}: CourseGroupProps): ReactElement {
  return (
    <Container>
      <CourseTitle>{course}</CourseTitle>
      <Radio.Group
        buttonStyle="outline"
        onChange={onChange}
        defaultValue={groups[0].name}
      >
        {groups.map((group) => (
          <Group value={group.name}>{group.name}</Group>
        ))}
      </Radio.Group>
    </Container>
  );
}
