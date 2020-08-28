import { API } from "@template/api-client";
import { QueuePartial } from "@template/common";
import useSWR, { responseInterface } from "swr";

const TEN_SECONDS_IN_MS = 100000;
const FIFTEEN_SECOND_IN_MS = 150000;

type queueResponse = responseInterface<QueuePartial, any>;

interface UseQueueReturn {
  queue?: queueResponse["data"];
  queuesError: queueResponse["error"];
  mutateQueue: queueResponse["mutate"];
}

export function useQueue(qid: number): UseQueueReturn {
  const { data: queue, error: queuesError, mutate: mutateQueue } = useSWR(
    qid && `/api/v1/queues/${qid}`,
    async () => API.queues.get(Number(qid)),
    {
      refreshInterval: Math.floor(
        Math.random() * (FIFTEEN_SECOND_IN_MS - TEN_SECONDS_IN_MS + 1) +
          TEN_SECONDS_IN_MS
      ),
    }
  );
  return {
    queue,
    queuesError,
    mutateQueue,
  };
}
