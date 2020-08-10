import { API, parseQuestionDates } from "@template/api-client";
import { ListQuestionsResponse } from "@template/common";
import useSWR, { responseInterface } from "swr";
import { useCallback } from "react";
import { useEventSource } from "./useEventSource";

type questionsResponse = responseInterface<ListQuestionsResponse, any>;

interface UseQuestionReturn {
  questions: questionsResponse["data"];
  questionsError: questionsResponse["error"];
  mutateQuestions: questionsResponse["mutate"];
}

export function useQuestions(qid: number): UseQuestionReturn {
  const {
    data: questions,
    error: questionsError,
    mutate: mutateQuestions,
  } = useSWR(qid && `/api/v1/queues/${qid}/questions`, async () =>
    API.questions.index(Number(qid))
  );

  useEventSource(
    qid && `/api/v1/queues/${qid}/sse`,
    useCallback(
      (data) => {
        data.forEach(parseQuestionDates);
        mutateQuestions(data, false);
      },
      [mutateQuestions]
    )
  );

  return { questions, questionsError, mutateQuestions };
}
