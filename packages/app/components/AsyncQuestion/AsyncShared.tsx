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
  // const [addStudentsModal, setAddStudentsModal] = useState(false);

  // const { course } = useCourse(courseId);

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
                  Edit Queue Details
                </EditQueueButton>
                {/* <EditQueueButton
                  data-cy="addStudents"
                >
                  Add Students
                </EditQueueButton>
                <Tooltip
                  title="async"
                >
                  <HelpNextButton
                    data-cy="help-next"
                  >
                    Help Next
                  </HelpNextButton>
                </Tooltip> */}

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
