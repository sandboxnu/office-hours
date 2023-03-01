import { API } from "@koh/api-client";
import { AsyncQuestionResponse } from "@koh/common";

import useSWR, { responseInterface } from "swr";

type questionsResponse = responseInterface<AsyncQuestionResponse, any>;

interface UseQuestionReturn {
  questions?: questionsResponse["data"];
  questionsError: questionsResponse["error"];
  mutateQuestions: questionsResponse["mutate"];
}

export function useAsnycQuestions(cid: number): UseQuestionReturn {
  const key = cid && `/api/v1/queues/${cid}/questions`;
  // Subscribe to sse
  // const isLive = useEventSource(
  //   qid && `/api/v1/queues/${qid}/sse`,
  //   "question",
  //   useCallback(
  //     (data: SSEQueueResponse) => {
  //       if (data.questions) {
  //         mutate(
  //           key,
  //           plainToClass(ListQuestionsResponse, data.questions),
  //           false
  //         );
  //       }
  //     },
  //     [key]
  //   )
  // );

  const {
    data: questions,
    error: questionsError,
    mutate: mutateQuestions
  } = useSWR(key, async () => API.course.getAsyncQuestions(Number(cid)), {
    // refreshInterval: isLive ? 0 : 10 * 1000,
  });

  return { questions, questionsError, mutateQuestions };
}
