import { OpenQuestionStatus, Question } from "@template/common";
import { responseInterface } from "swr";
import { useProfile } from "./useProfile";
import { useQuestions } from "./useQuestions";

type queueResponse = responseInterface<Question, any>;

interface UseStudentQuestionReturn {
  studentQuestion?: queueResponse["data"];
  studentQuestionIndex?: number;
  studentQuestionError: queueResponse["error"];
  mutateStudentQuestion: (q: Question) => void;
}

/**
 * SWR wrapper for the question of the currently logged-in student
 */
export function useStudentQuestion(qid: number): UseStudentQuestionReturn {
  const profile = useProfile();
  const { questions, questionsError, mutateQuestion } = useQuestions(qid);

  const studentQuestionIndex =
    profile &&
    questions &&
    questions
      .filter(
        (question) =>
          question.status !== OpenQuestionStatus.CantFind &&
          question.status !== OpenQuestionStatus.TADeleted
      )
      .findIndex((q) => q.creator.id === profile.id);
  return {
    studentQuestion: questions?.[studentQuestionIndex],
    studentQuestionIndex,
    studentQuestionError: questionsError,
    mutateStudentQuestion: mutateQuestion,
  };
}
