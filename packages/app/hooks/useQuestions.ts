import { API, parseQuestionDates } from "@template/api-client";
import { ListQuestionsResponse, Question } from "@template/common";
import useSWR, { responseInterface } from "swr";
import { useCallback, useEffect } from "react";
import { useEventSource } from "./useEventSource";

type questionsResponse = responseInterface<ListQuestionsResponse, any>;

interface UseQuestionReturn {
  questions?: questionsResponse["data"];
  questionsError: questionsResponse["error"];
  mutateQuestions: questionsResponse["mutate"];
  // Mutate a specific question
  mutateQuestion: (newQuestion: Question) => void;
}

export function useQuestions(qid: number): UseQuestionReturn {
  const {
    data: questions,
    error: questionsError,
    mutate: mutateQuestions,
  } = useSWR(qid && `/api/v1/queues/${qid}/questions`, async () =>
    API.questions.index(Number(qid))
  );

  // Subscribe to sse
  useEventSource(
    qid && `/api/v1/queues/${qid}/sse`,
    "question",
    useCallback(
      (data) => {
        if (data.questions) {
          data.questions.forEach(parseQuestionDates);
          mutateQuestions(data.questions, false);
        }
      },
      [mutateQuestions]
    )
  );

  const mutateQuestion = useCallback(
    (newQuestion) => {
      const newQuestions = questions?.map((q) =>
        q.id === newQuestion.id ? newQuestion : q
      );
      mutateQuestions(newQuestions);
    },
    [questions, mutateQuestions]
  );

  return { questions, questionsError, mutateQuestions, mutateQuestion };
}
