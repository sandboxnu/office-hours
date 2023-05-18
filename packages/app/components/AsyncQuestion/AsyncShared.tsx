import { Role } from "@koh/common";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import { AsyncQuestionForm } from "./Student/AsyncQuestionForm";
import { EditAsyncQuestionModal } from "./TA/EditAsyncQuestionModal";
import { QueueInfoColumnButton } from "../Queue/QueueListSharedComponents";
// import { useTeams } from "../../../hooks/useTeams";
import { QuestionListShared } from "./QuestionListShared";
import QuestionListDetail from "./QuestionListDetail";
import { API } from "@koh/api-client";
import { message } from "antd";
/**
 * Method to help student and
 * pop open notification if another TA helped at same time (race condition)
 */
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (min-width: 650px) {
    flex-direction: row;
  }
`;

const EditQueueButton = styled(QueueInfoColumnButton)`
  color: #212934;
`;

const MiddleSpacer = styled.div`
  margin-left: 20px;
`;

export default function AsyncShared({
  courseId,
}: {
  courseId: number;
}): ReactElement {
  const role = useRoleInCourse(courseId);

  const [studentQuestionModal, setStudentQuestionModal] = useState(false);

  const [TAeditDetails, setTAeditDetails] = useState(false);
  const changeDisplayTypes = async () => {
    await API.course.editCourseInfo(Number(courseId), {
      courseId: Number(courseId),
      asyncQuestionDisplayTypes: ["all"],
    });
    message.success("Display types updated");
  };
  return (
    <>
      <Container>
        {role === Role.STUDENT ? (
          <QuestionListShared
            isStaff={false}
            buttons={
              <>
                <EditQueueButton
                  data-cy="postQuestion"
                  onClick={() => setStudentQuestionModal(true)}
                >
                  Post your Question
                </EditQueueButton>
                <div style={{ marginBottom: "12px" }}></div>
              </>
            }
          />
        ) : (
          <QuestionListShared
            isStaff={true}
            buttons={
              <>
                <EditQueueButton
                  data-cy="editQueue"
                  onClick={() => setTAeditDetails(true)}
                >
                  Edit displayed question types
                </EditQueueButton>
                <EditQueueButton
                  data-cy="addStudents"
                  onClick={() => changeDisplayTypes()}
                >
                  Show all questions
                </EditQueueButton>

                <div style={{ marginBottom: "12px" }}></div>
              </>
            }
          />
        )}
        <AsyncQuestionForm
          question={undefined}
          visible={studentQuestionModal}
          onClose={() => setStudentQuestionModal(false)}
        />
        <EditAsyncQuestionModal
          visible={TAeditDetails}
          onClose={() => setTAeditDetails(false)}
        />
        <MiddleSpacer />
        <QuestionListDetail courseId={courseId} />
      </Container>
    </>
  );
}
