import { CoursePartial } from "@template/common";
import { ReactElement } from "react";
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
  margin-bottom: 12px;
  width: 200px;
  text-align: center;
`;

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
      <Radio.Group buttonStyle="outline" size="large" onChange={onChange}>
        {groups.map((group) => (
          <Group value={group}>{group.name}</Group>
        ))}
      </Radio.Group>
    </Container>
  );
}
