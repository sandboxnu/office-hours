import { API } from "@koh/api-client";
import { ListQuestionsResponse, SSEQueueResponse } from "@koh/common";
import { plainToClass } from "class-transformer";
import { useCallback } from "react";
import useSWR, { responseInterface } from "swr";
import { useEventSource } from "./useEventSource";

type questionsResponse = responseInterface<ListQuestionsResponse, any>;

interface UseQuestionReturn {
  questions?: questionsResponse["data"];
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

  // Subscribe to sse
  useEventSource(
    qid && `/api/v1/queues/${qid}/sse`,
    "question",
    useCallback(
      (data: SSEQueueResponse) => {
        if (data.questions) {
          mutateQuestions(
            plainToClass(ListQuestionsResponse, data.questions),
            false
          );
        }
      },
      [mutateQuestions]
    )
  );

  return { questions, questionsError, mutateQuestions };
}
