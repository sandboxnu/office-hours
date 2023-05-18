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
  const key = cid && `/api/v1/courses/${cid}/questions`;
  //Subscribe to sse
  // const isLive = useEventSource(
  //   cid && `/api/v1/queues/${qid}/sse`,
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
    mutate: mutateQuestions,
  } = useSWR(key, async () => API.course.getAsyncQuestions(Number(cid)), {
    refreshInterval: 0,
  });

  return { questions, questionsError, mutateQuestions };
}
