import styled from "styled-components";
import {
  Role,
  Question,
  OpenQuestionStatus,
  ClosedQuestionStatus,
  QuestionType,
  QuestionStatus,
  UserCourse,
} from "@template/common";
import StudentPopupCard from "../../../../components/Queue/StudentPopupCard";
import { useCallback, useState, useEffect, Fragment } from "react";
import { API } from "@template/api-client";
import StudentQueueList from "../../../../components/Queue/StudentQueueList";
import TAQueueList from "../../../../components/Queue/TAQueueList";
import NavBar from "../../../../components/Nav/NavBar";
import { useProfile } from "../../../../hooks/useProfile";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

// TODO: replace this with profile role from endpoint
const ROLE: Role = Role.STUDENT;

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

interface QueueProps {}

export default function Queue({}: QueueProps) {
  const profile = useProfile();
  const router = useRouter();
  const { cid, qid } = router.query;

  const { data: questions, error } = useSWR(
    qid ? `/api/v1/queues/${qid}/questions` : null,
    async () => API.questions.index(Number(qid))
  );

  const helpingQuestions: Question[] = [];
  const groupQuestions: Question[] = [];

  /**
   * Filters through the fetched list of questions to fill the helpingQuestions and groupQuestions arrays
   */
  const filterHelpingGroup = () => {
    if (questions) {
      for (let q of questions) {
        if (
          q.status === OpenQuestionStatus.Helping
          // question.taHelped &&
          // question.taHelped.id === profile.id
        ) {
          helpingQuestions.push(q);
        } else {
          groupQuestions.push(q);
        }
      }
    }
  };

  filterHelpingGroup();

  // Student queue state variables
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [questionDraftId, setQuestionDraftId] = useState<number>(null);
  const studentQuestion =
    profile && questions && questions.find((q) => q.creator.id === profile.id);

  // TA queue state variables
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(null);

  const onOpenClick = useCallback((question: Question): void => {
    setCurrentQuestion(question);
    setOpenPopup(true);
  }, []);

  const onCloseClick = useCallback((): void => {
    setCurrentQuestion(null);
    setOpenPopup(false);
  }, []);

  /**
   * Student functions to support queue operations.
   */

  /**
   * Creates a new Question draft for a student who has joined the queue.
   */
  const joinQueue = async () => {
    // API call to join queue, question marked as draft
    const q = await API.questions.create({
      queueId: Number(qid),
      text: "fake text",
      questionType: QuestionType.Bug, // endpoint needs to be changed to allow empty questionType for drafts
      // for the moment I am defaulting this data so that there is no error
    });

    if (q) {
      setQuestionDraftId(q.id);
    }
  };

  /**
   * Deletes existing Question draft for a student who has left the queue.
   */
  const leaveQueue = async () => {
    setIsJoining(false);

    await API.questions.update(Number(qid), studentQuestion.id, {
      status: ClosedQuestionStatus.Deleted,
    });

    setQuestionDraftId(null);
  };

  /**
   * Finishes creating a given question by updating the draft.
   */
  const finishQuestion = async (text: string, questionType: QuestionType) => {
    const updateStudent = {
      text: text,
      questionType: questionType,
      status: OpenQuestionStatus.Queued,
    };
    const q = await API.questions.update(
      Number(qid),
      studentQuestion.id,
      updateStudent
    );
    setIsJoining(false);
    const newQuestions = questions.map((q) =>
      q.id === studentQuestion.id ? { ...q, updateStudent } : q
    );
    mutate(`/api/v1/queues/${qid}/questions`, newQuestions);
  };

  /**
   * TA functions to support queue operations
   */

  /**
   * Updates a given question to the given status.
   * @param question the question being modified
   * @param status the updated status
   */
  const updateQuestionTA = async (
    question: Question,
    status: QuestionStatus
  ) => {
    await API.questions.update(Number(qid), question.id, {
      status: status,
    });
    const newQuestions = questions.map((q) =>
      q.id === question.id ? { ...q, status } : q
    );
    mutate(`/api/v1/queues/${qid}/questions`, newQuestions);
  };

  /**
   * Sends a push notification to the student with the given Question
   * @param question the question to be notified
   */
  const alertStudent = (question: Question) => {
    // Send API request to trigger notification
  };

  if (questions) {
    return (
      <div>
        <NavBar courseId={Number(cid)} />
        <Container>
          <Fragment>
            {Role.STUDENT === ROLE ? (
              <StudentQueueList
                onOpenClick={onOpenClick}
                joinQueue={joinQueue}
                questions={questions}
                helpingQuestions={helpingQuestions}
                studentQuestion={studentQuestion}
                leaveQueue={leaveQueue}
                finishQuestion={finishQuestion}
              />
            ) : (
              <TAQueueList
                onOpenClick={onOpenClick}
                joinQueue={joinQueue}
                updateQuestionTA={updateQuestionTA}
                alertStudent={alertStudent}
                questions={questions}
                helpingQuestions={helpingQuestions}
                groupQuestions={groupQuestions}
              />
            )}
            {ROLE === "ta" && currentQuestion && (
              <StudentPopupCard
                onClose={onCloseClick}
                email="takayama.a@northeastern.edu" //need a way to access this. or the user
                wait={20} //figure out later
                question={currentQuestion}
                location="Outside by the printer" // need a way to access this
                visible={openPopup}
                updateQuestion={updateQuestionTA}
              />
            )}
          </Fragment>
        </Container>
      </div>
    );
  } else {
    return null;
  }
}
