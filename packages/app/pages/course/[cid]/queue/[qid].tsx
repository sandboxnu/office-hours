import { API } from "@template/api-client";
import {
  ClosedQuestionStatus,
  OpenQuestionStatus,
  Question,
  QuestionStatus,
  QuestionType,
  Role,
} from "@template/common";
import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
import NavBar from "../../../../components/Nav/NavBar";
import StudentPopupCard from "../../../../components/Queue/StudentPopupCard";
import StudentQueueList from "../../../../components/Queue/StudentQueueList";
import TAQueueList from "../../../../components/Queue/TAQueueList";
import { useProfile } from "../../../../hooks/useProfile";

const Container = styled.div`
  margin: 32px 64px;
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

export default function Queue() {
  const profile = useProfile();
  const router = useRouter();
  const { cid, qid } = router.query;
  const role = profile?.courses.find((e) => e.course.id === Number(cid)).role;

  const { data: questions, error: questionsError } = useSWR(
    qid ? `/api/v1/queues/${qid}/questions` : null,
    async () => API.questions.index(Number(qid))
  );
  const { data: course, error: queuesError } = useSWR(
    qid ? `/api/v1/courses/${cid}` : null,
    async () => API.course.get(Number(cid))
  );
  const queueRoom: string =
    course && course.queues.find((q) => q.id === Number(qid)).room;

  const helpingQuestions: Question[] = [];
  const groupQuestions: Question[] = [];

  /**
   * Filters through the fetched list of questions to fill the helpingQuestions and groupQuestions arrays
   */
  const filterHelpingGroup = () => {
    if (questions) {
      for (const q of questions) {
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

  const joinQueue = async () => {
    const createdQuestion = await API.questions.create({
      queueId: Number(qid),
      text: "",
      questionType: QuestionType.Bug, // TODO: endpoint needs to be changed to allow empty questionType for drafts
      // for the moment I am defaulting this data so that there is no error
    });

    const newQuestions = [...questions, createdQuestion];
    mutate(`/api/v1/queues/${qid}/questions`, newQuestions);
  };

  const leaveQueue = async () => {
    await API.questions.update(studentQuestion.id, {
      status: ClosedQuestionStatus.Deleted,
    });

    mutate(`/api/v1/queues/${qid}/questions`);
  };

  const finishQuestion = async (text: string, questionType: QuestionType) => {
    const updateStudent = {
      text: text,
      questionType: questionType,
      status: OpenQuestionStatus.Queued,
    };
    await API.questions.update(studentQuestion.id, updateStudent);
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
    await API.questions.update(question.id, {
      status: status,
    });
    const newQuestions = questions.map((q) =>
      q.id === question.id ? { ...q, status } : q
    );
    mutate(`/api/v1/queues/${qid}/questions`, newQuestions);
  };

  const alertStudent = async (question: Question) => {
    await API.questions.notify(question.id);
  };

  if (questions) {
    return (
      <div>
        <NavBar courseId={Number(cid)} />
        <Container>
          <Fragment>
            {Role.STUDENT === role ? (
              <StudentQueueList
                room={queueRoom}
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
                room={queueRoom}
                onOpenClick={onOpenClick}
                joinQueue={joinQueue}
                updateQuestionTA={updateQuestionTA}
                alertStudent={alertStudent}
                questions={questions}
                helpingQuestions={helpingQuestions}
                groupQuestions={groupQuestions}
              />
            )}
            {role === Role.TA && currentQuestion && (
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
