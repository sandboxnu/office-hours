import { API } from "@template/api-client";
import {
  GetQueueResponse,
  QueuePartial,
  SSEQueueResponse,
} from "@template/common";
import useSWR, { responseInterface } from "swr";
import { useCallback } from "react";
import { useEventSource } from "./useEventSource";
import { plainToClass } from "class-transformer";

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
      (data: SSEQueueResponse) => {
        if (data.queue) {
          mutateQueue(plainToClass(GetQueueResponse, data.queue), false);
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
