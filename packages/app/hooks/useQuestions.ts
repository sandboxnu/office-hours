import { API } from "@koh/api-client";
import { ListQuestionsResponse, SSEQueueResponse } from "@koh/common";
import { plainToClass } from "class-transformer";
import { useCallback } from "react";
import useSWR, { mutate, responseInterface } from "swr";
import { useEventSource } from "./useEventSource";

type questionsResponse = responseInterface<ListQuestionsResponse, any>;

interface UseQuestionReturn {
  questions?: questionsResponse["data"];
  questionsError: questionsResponse["error"];
  mutateQuestions: questionsResponse["mutate"];
}

export function useQuestions(qid: number): UseQuestionReturn {
  const key = qid && `/api/v1/queues/${qid}/questions`;
  // Subscribe to sse
  const isLive = useEventSource(
    qid && `/api/v1/queues/${qid}/sse`,
    "question",
    useCallback(
      (data: SSEQueueResponse) => {
        if (data.questions) {
          mutate(
            key,
            plainToClass(ListQuestionsResponse, data.questions),
            false
          );
        }
      },
      [key]
    )
  );

  const {
    data: questions,
    error: questionsError,
    mutate: mutateQuestions,
  } = useSWR(key, async () => API.questions.index(Number(qid)), {
    refreshInterval: isLive ? 0 : 10 * 1000,
  });

  return { questions, questionsError, mutateQuestions };
}
