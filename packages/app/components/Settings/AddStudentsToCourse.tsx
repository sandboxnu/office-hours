import { ReactElement, useState } from "react";
import styled from "styled-components";
import AddStudents from "./AddStudents";
type CourseRosterPageProps = { courseId: number };
import { API } from "@koh/api-client";
import { useCourse } from "../../hooks/useCourse";
import { message } from "antd";
const CourseRosterPageComponent = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
`;

export default function AddStudentsToCourse({
  courseId
}: CourseRosterPageProps): ReactElement {
  const [file, setFile] = useState();
  const fileReader = new FileReader();
  const course = useCourse(courseId).course.name;
  const handleOnChange = e => {
    setFile(e.target.files[0]);
  };
  const handleOnSubmit = e => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function(event) {
        const csvOutput: string = event.target.result.toString();
        addStudents(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };
  const addStudents = async (students: string) => {
    const lines = students.split("\r\n");
    lines.forEach(async (student, i) => {
      const temp = student.split(",");
      if (i !== 0) {
        console.log(temp);
        console.log(course);
        const tempStudent = {
          email: temp[2] + "@ubc.ca",
          password: temp[2],
          first_name: temp[0],
          last_name: temp[1],
          sid: Number(temp[2]),
          selected_course: [course]
        };
        await API.signup
          .registerStudent(tempStudent)
          .then(response => {
            console.log(response);
            if (response === "exists") {
              message.warning(
                "One or more of the students was not registered (already registered)"
              );
            }
          })
          .catch(e => {
            console.log(e);
            message.warning(
              temp[0] + " was not registered (already registered)"
            );
          });
      }
    });
  };
  return (
    <div>
      <CourseRosterPageComponent>
        <div style={{ textAlign: "center" }}>
          <h1>Import student file </h1>
          <form>
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={handleOnChange}
            />
            <button
              onClick={e => {
                handleOnSubmit(e);
              }}
            >
              Add students
            </button>
          </form>
        </div>
        <AddStudents courseId={courseId} />
      </CourseRosterPageComponent>
    </div>
  );
}
