import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { Select, Button, Tag } from "antd";
import { useProfile } from "../../hooks/useProfile";
import { KhouryProfCourse } from "@koh/common";
import { useEffect } from "react";
import { createSGString } from "./ApplyPage";

const Italics = styled.span`
  font-weight: normal;
  font-size: 16px;
  font-style: italic;
`;

const FormSection = styled.div`
  margin-top: 20px;
`;

const CoursesBlock = styled.div`
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 5px;
  display: flex;
  align-items: center;
`;

const LargeTag = styled(Tag)`
  font-size: 14px;
  padding: 2px 6px;
`;

export default function SelectCourses({
  onSubmit,
  initialValues,
}: {
  onSubmit: (courses: KhouryProfCourse[]) => any;
  initialValues: string[];
}): ReactElement {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const profile = useProfile();

  // populate initially selected courses when returning to first selection page
  useEffect(() => {
    const defaultValues = profile?.pendingCourses?.reduce(
      (defaults: number[], course, idx) => {
        if (initialValues.find((name) => name === course.name)) {
          defaults.push(idx);
          return defaults;
        } else return defaults;
      },
      []
    );
    setSelectedCourses(defaultValues || []);
  }, []);

  const handleCoursesChange = (indicies) => {
    setSelectedCourses(indicies);
  };
  const handleSubmit = () =>
    onSubmit(
      selectedCourses.map((courseIdx) => profile?.pendingCourses[courseIdx])
    );

  return (
    <div>
      <div>
        It looks like this is your first time using the app for this semester.
        Please pick out all the courses you want to use Khoury Office Hours for.
      </div>

      <FormSection>
        <h3>
          Courses{" "}
          <Italics>(Select all the courses you are applying for)</Italics>
        </h3>

        <Select
          mode="multiple"
          placeholder="Please select your courses"
          onChange={handleCoursesChange}
          style={{ width: "100%" }}
          value={selectedCourses}
        >
          {profile?.pendingCourses?.map((course, idx) => (
            <Select.Option key={course.name} value={idx}>
              {createSGString(course)}
            </Select.Option>
          ))}
        </Select>
      </FormSection>

      <FormSection>
        <h3>The following courses have already registered for the app:</h3>
        <CoursesBlock>
          {profile?.courses.map((course) => (
            <LargeTag key={course.course?.id}>{course.course?.name}</LargeTag>
          ))}
        </CoursesBlock>
      </FormSection>

      <Button
        onClick={handleSubmit}
        type="primary"
        style={{ marginTop: "30px" }}
      >
        Next
      </Button>
    </div>
  );
}
