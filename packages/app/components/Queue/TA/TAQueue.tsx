import { API } from "@koh/api-client";
import { ERROR_MESSAGES, OpenQuestionStatus } from "@koh/common";
import { notification } from "antd";
import { QuestionStatusKeys, Role } from "@koh/common";
import { Tooltip } from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useCourse } from "../../../hooks/useCourse";
import { useProfile } from "../../../hooks/useProfile";
import { useQuestions } from "../../../hooks/useQuestions";
import { useQueue } from "../../../hooks/useQueue";
import { useRoleInCourse } from "../../../hooks/useRoleInCourse";
import { useTAInQueueInfo } from "../../../hooks/useTAInQueueInfo";
import TACheckinButton from "../../Today/TACheckinButton";
import {
  QueueInfoColumn,
  QueueInfoColumnButton,
} from "../QueueListSharedComponents";
import { EditQueueModal } from "./EditQueueModal";
import { AddStudentsModal } from "./TAAddStudent";
import TAQueueListDetail from "./TAQueueListDetail";
// import { useTeams } from "../../../hooks/useTeams";
import { useDefaultMessage } from "../../../hooks/useDefaultMessage";
import { useHotkeys } from "react-hotkeys-hook";

/**
 * Method to help student and
 * pop open notification if another TA helped at same time (race condition)
 */
async function onHelpQuestion(questionId: number): Promise<void> {
  try {
    await API.questions.update(questionId, {
      status: OpenQuestionStatus.Helping,
    });
  } catch (e) {
    if (
      e.response?.status === 401 &&
      e.response?.data?.message ===
        ERROR_MESSAGES.questionController.updateQuestion.otherTAHelping
    ) {
      notification.open({
        message: "Another TA is currently helping the student",
        description:
          "This happens when another TA clicks help at the exact same time",
        type: "error",
        duration: 3,
        className: "hide-in-percy",
        style: {
          width: 450,
        },
      });
    }
  }
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (min-width: 650px) {
    flex-direction: row;
  }
`;

const HelpNextButton = styled(QueueInfoColumnButton)`
  color: white;
  background: #2a9187;
  &:hover,
  &:focus {
    color: white;
    background: #39aca1;
  }
`;

const EditQueueButton = styled(QueueInfoColumnButton)`
  color: #212934;
`;

const MiddleSpacer = styled.div`
  margin-left: 20px;
`;

interface TAQueueProps {
  qid: number;
  courseId: number;
}

export default function TAQueue({ qid, courseId }: TAQueueProps): ReactElement {
  const user = useProfile();
  const role = useRoleInCourse(courseId);
  const { queue } = useQueue(qid);

  const { questions, mutateQuestions } = useQuestions(qid);

  const { isCheckedIn, isHelping } = useTAInQueueInfo(qid);

  const [queueSettingsModal, setQueueSettingsModal] = useState(false);

  const [addStudentsModal, setAddStudentsModal] = useState(false);

  const { course } = useCourse(courseId);
  const staffCheckedIntoAnotherQueue = course?.queues.some(
    (q) =>
      q.id !== qid &&
      q.staffList.some((staffMember) => staffMember.id === user?.id)
  );

  const nextQuestion =
    questions?.priorityQueue[0] || // gets the first item of priority queue if it exists
    questions?.queue?.find(
      (question) => question.status === QuestionStatusKeys.Queued
    );
  const defaultMessage = useDefaultMessage();
  // const openTeams = useTeams(qid, nextQuestion?.creator.email, defaultMessage);

  const helpNext = async () => {
    await onHelpQuestion(nextQuestion.id);
    mutateQuestions();
    // openTeams();
  };

  useHotkeys(
    "shift+h",
    () => {
      if (isCheckedIn && nextQuestion && !isHelping) {
        helpNext();
      }
    },
    [isCheckedIn, nextQuestion, isHelping, qid, defaultMessage]
  );

  // TODO: figure out tooltips
  if (queue) {
    return (
      <>
        <Container>
          <QueueInfoColumn
            queueId={qid}
            isStaff={true}
            buttons={
              <>
                <EditQueueButton
                  data-cy="editQueue"
                  onClick={() => setQueueSettingsModal(true)}
                >
                  Edit Queue Details
                </EditQueueButton>
                <EditQueueButton
                  data-cy="addStudents"
                  onClick={() => setAddStudentsModal(true)}
                >
                  Add Students
                </EditQueueButton>
                <Tooltip
                  title={!isCheckedIn && "You must check in to help students!"}
                >
                  <HelpNextButton
                    onClick={helpNext}
                    disabled={!isCheckedIn || !nextQuestion || isHelping}
                    data-cy="help-next"
                  >
                    Help Next
                  </HelpNextButton>
                </Tooltip>

                <div style={{ marginBottom: "12px" }}>
                  <Tooltip
                    title={
                      queue.isDisabled && "Cannot check into a disabled queue!"
                    }
                  >
                    <TACheckinButton
                      courseId={courseId}
                      room={queue?.room}
                      disabled={
                        staffCheckedIntoAnotherQueue ||
                        isHelping ||
                        (queue.isProfessorQueue && role !== Role.PROFESSOR) ||
                        queue.isDisabled
                      }
                      state={isCheckedIn ? "CheckedIn" : "CheckedOut"}
                      block
                    />
                  </Tooltip>
                </div>
              </>
            }
          />
          <MiddleSpacer />
          {user && questions && (
            <TAQueueListDetail queueId={qid} courseId={courseId} />
          )}
        </Container>
        <EditQueueModal
          queueId={qid}
          visible={queueSettingsModal}
          onClose={() => setQueueSettingsModal(false)}
        />
        <AddStudentsModal
          queueId={qid}
          visible={addStudentsModal}
          onClose={() => setAddStudentsModal(false)}
        />
      </>
    );
  } else {
    return <div />;
  }
}
