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

  const studentQuestion =
    profile && questions && questions.find((q) => q.creator.id === profile.id);

  const studentQuestionIndex =
    (studentQuestion &&
      studentQuestion.status !== OpenQuestionStatus.CantFind &&
      studentQuestion.status !== OpenQuestionStatus.TADeleted &&
      questions.indexOf(studentQuestion)) ||
    -1;

  return {
    studentQuestion,
    studentQuestionIndex,
    studentQuestionError: questionsError,
    mutateStudentQuestion: mutateQuestion,
  };
}
