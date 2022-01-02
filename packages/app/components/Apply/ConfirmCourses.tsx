import { Button } from "antd";
import { ReactElement } from "react";
import { RegisterCourseInfo, createSGString, Highlight } from "./ApplyPage";
import { TimezoneCampusMapping } from "./EditCourse";

interface ConfirmCourseProps {
  courses: RegisterCourseInfo[];
  onSubmit: () => any;
  onBack: () => any;
}

const FormattedCourse = ({ course }: { course: RegisterCourseInfo }) => (
  <div>
    <h3>
      <Highlight>{createSGString(course)}</Highlight>
    </h3>
    <p>
      <b>
        <i>Course Display Name: </i>
      </b>
      {course.displayName}
    </p>
    <p>
      <b>
        <i>Campus: </i>
      </b>
      {TimezoneCampusMapping[course.timezone]}
    </p>
    <p>
      <b>
        <i>Coordinator Email: </i>
      </b>
      {course.coordinator_email}
    </p>
    <p>
      <b>
        <i>Office Hours Calendar URL: </i>
      </b>
      {course.iCalURL}
    </p>
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
      {courses.map((course) => (
        <FormattedCourse course={course} key={course.name} />
      ))}
      <Button onClick={onBack}>Back</Button>
      <Button onClick={onSubmit}>Submit</Button>
    </div>
  );
}
