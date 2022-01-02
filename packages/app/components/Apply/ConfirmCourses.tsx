import { Button, Space, Divider } from "antd";
import { ReactElement } from "react";
import { RegisterCourseInfo, createSGString, Highlight } from "./ApplyPage";
import { TimezoneCampusMapping } from "./EditCourse";

interface ConfirmCourseProps {
  courses: RegisterCourseInfo[];
  onSubmit: () => any;
  onBack: () => any;
}

const FormattedCourseInfo = ({
  label,
  info,
}: {
  label: string;
  info: string;
}) => (
  <p style={{ margin: "0.5em" }}>
    <b>
      <i>{label}</i>
    </b>
    {info}
  </p>
);

const FormattedCourse = ({ course }: { course: RegisterCourseInfo }) => (
  <div style={{ padding: "0.2em 0" }}>
    <h3>
      <Highlight>{createSGString(course)}</Highlight>
    </h3>
    <FormattedCourseInfo
      label="Course Display Name: "
      info={course.displayName}
    />
    <FormattedCourseInfo
      label="Campus: "
      info={TimezoneCampusMapping[course.timezone]}
    />
    <FormattedCourseInfo
      label="Coordinator Email: "
      info={course.coordinator_email}
    />
    <FormattedCourseInfo
      label="Office Hours Calendar URL: "
      info={course.iCalURL}
    />
  </div>
);

export default function ConfirmCourses({
  courses,
  onSubmit,
  onBack,
}: ConfirmCourseProps): ReactElement {
  return (
    <div>
      <h3>Please confirm all the information is correct before submitting:</h3>
      {courses.map((course, index) => (
        <div key={course.name}>
          {index > 0 && <Divider style={{ backgroundColor: "#d9d9d9" }} />}
          <FormattedCourse course={course} />
        </div>
      ))}
      <Space style={{ marginTop: "1.5em" }}>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onSubmit} type="primary">
          Submit
        </Button>
      </Space>
    </div>
  );
}
