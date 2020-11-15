import { Question } from "@koh/common";
import { responseInterface } from "swr";
import { useProfile } from "./useProfile";
import { useQuestions } from "./useQuestions";

type queueResponse = responseInterface<Question, any>;

interface UseStudentQuestionReturn {
  studentQuestion?: queueResponse["data"];
  studentQuestionIndex?: number;
  studentQuestionError: queueResponse["error"];
  // mutateStudentQuestion: (q: Question) => void;
}

/**
 * SWR wrapper for the question of the currently logged-in student
 */
export function useStudentQuestion(qid: number): UseStudentQuestionReturn {
  const profile = useProfile();
  const { questions, questionsError } = useQuestions(qid);

  const studentQuestion = profile && questions && questions?.yourQuestion;

  const studentQuestionIndex =
    studentQuestion &&
    questions.queue.findIndex((question) => studentQuestion.id === question.id);

  return {
    studentQuestion,
    studentQuestionIndex,
    studentQuestionError: questionsError,
  };
}
