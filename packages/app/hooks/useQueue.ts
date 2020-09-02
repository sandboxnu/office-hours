import { API, parseQueueDates } from "@template/api-client";
import { QueuePartial } from "@template/common";
import useSWR, { responseInterface } from "swr";
import { useCallback } from "react";
import { useEventSource } from "./useEventSource";

type queueResponse = responseInterface<QueuePartial, any>;

interface UseQueueReturn {
  queue?: queueResponse["data"];
  queuesError: queueResponse["error"];
  mutateQueue: queueResponse["mutate"];
  isQueueLive: boolean;
}

export function useQueue(qid: number): UseQueueReturn {
  const { data: queue, error: queuesError, mutate: mutateQueue } = useSWR(
    qid && `/api/v1/queues/${qid}`,
    async () => API.queues.get(Number(qid))
  );

  const isQueueLive = useEventSource(
    qid && `/api/v1/queues/${qid}/sse`,
    "queue",
    useCallback(
      (data) => {
        console.log(data);
        if (data.queue) {
          parseQueueDates(data.queue);
          mutateQueue(data.queue, false);
        }
      },
      [mutateQueue]
    )
  );

  return {
    queue,
    queuesError,
    mutateQueue,
    isQueueLive,
  };
}
