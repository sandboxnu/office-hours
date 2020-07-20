import { API } from "@template/api-client";
import {
  ClosedQuestionStatus,
  OpenQuestionStatus,
  Question,
  QuestionType,
  Role,
} from "@template/common";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
import NavBar from "../../../../components/Nav/NavBar";
import StudentQueueList from "../../../../components/Queue/StudentQueueList";
import TAQueueList from "../../../../components/Queue/TAQueueList";
import { useProfile } from "../../../../hooks/useProfile";
import { useRoleInCourse } from "../../../../hooks/useRoleInCourse";

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
  const role = useRoleInCourse(Number(cid));

  const { data: questions, error: questionsError } = useSWR(
    qid && `/api/v1/queues/${qid}/questions`,
    async () => API.questions.index(Number(qid))
  );

  const helpingQuestions: Question[] = questions?.filter(
    (question) => question.status === OpenQuestionStatus.Helping
  );
  const groupQuestions: Question[] = questions?.filter(
    (question) => question.status !== OpenQuestionStatus.Helping
  );

  const studentQuestion =
    profile && questions && questions.find((q) => q.creator.id === profile.id);

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
    };
    await API.questions.update(studentQuestion.id, updateStudent);
    const newQuestions = questions.map((q) =>
      q.id === studentQuestion.id ? { ...q, updateStudent } : q
    );
    mutate(`/api/v1/queues/${qid}/questions`, newQuestions);
  };

  const alertStudent = async (question: Question) => {
    await API.questions.notify(question.id);
  };

  return (
    <div>
      <NavBar courseId={Number(cid)} />
      <Container>
        {questions && (
          <>
            {Role.STUDENT === role ? (
              <StudentQueueList
                room={""}
                joinQueue={joinQueue}
                questions={questions}
                studentQuestion={studentQuestion}
                leaveQueue={leaveQueue}
                finishQuestion={finishQuestion}
              />
            ) : (
              <TAQueueList
                qid={Number(qid)}
                alertStudent={alertStudent}
                questions={questions}
                helpingQuestions={helpingQuestions}
                groupQuestions={groupQuestions}
                courseId={Number(cid)}
              />
            )}
          </>
        )}
      </Container>
    </div>
  );
}
