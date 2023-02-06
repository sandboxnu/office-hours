import { ReactElement } from "react";
import styled from "styled-components";
type CourseRosterPageProps = { courseId: number };
import { API } from "@koh/api-client";
import { Button, Spin } from "antd";
import useSWR from "swr";
import csvDownload from "json-to-csv-export";
const CourseRosterPageComponent = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
`;

export default function AddStudentsToCourse({
  courseId
}: CourseRosterPageProps): ReactElement {
  const { data } = useSWR(`/api/v1/questions/allQuestions`, async () => {
    return await API.questions.getAllQuestions(courseId);
  });
  const dataToConvert = {
    data: data,
    filename: "all_questions",
    delimiter: ",",
    headers: [
      "id",
      "AskerId",
      "text",
      "questionType",
      "createdAt",
      "helpedAt",
      "closedAt",
      "status",
      "location",
      "askerName",
      "helperName"
    ]
  };
  if (!data) {
    return <Spin tip="Loading..." size="large" />;
  } else {
    return (
      <div>
        <CourseRosterPageComponent>
          <div style={{ textAlign: "center" }}>
            <Button onClick={() => csvDownload(dataToConvert)}>
              Download data of all questions
            </Button>
          </div>
        </CourseRosterPageComponent>
      </div>
    );
  }
}
