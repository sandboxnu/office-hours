import { API } from "@template/api-client";
import { ListQuestionsResponse } from "@template/common";
import useSWR, { responseInterface } from "swr";

const TEN_SECONDS_IN_MS = 100000;
const FIFTEEN_SECOND_IN_MS = 150000;

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
  } = useSWR(
    qid && `/api/v1/queues/${qid}/questions`,
    async () => API.questions.index(Number(qid)),
    {
      refreshInterval: Math.floor(
        Math.random() * (FIFTEEN_SECOND_IN_MS - TEN_SECONDS_IN_MS + 1) +
          TEN_SECONDS_IN_MS
      ),
    }
  );

  return { questions, questionsError, mutateQuestions };
}
