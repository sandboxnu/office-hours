import { API } from "@koh/api-client";
import { GetQueueResponse, QueuePartial, SSEQueueResponse } from "@koh/common";
import useSWR, { mutate, responseInterface } from "swr";
import { useCallback, useEffect } from "react";
import { useEventSource } from "./useEventSource";
import { plainToClass } from "class-transformer";

type queueResponse = responseInterface<QueuePartial, any>;

interface UseQueueReturn {
  queue?: queueResponse["data"];
  queueError: queueResponse["error"];
  mutateQueue: queueResponse["mutate"];
  isLive: boolean;
}

type OnUpdate = (lastUpdated: Date) => void;

interface RefreshInfo {
  lastUpdated: Date;
  onUpdates: Set<OnUpdate>;
}

// Keep track of all the different Refresh information and callbacks.
// This is a global because useQueue can be used multiple times, but SWR's onSuccess overwrites other instances
const REFRESH_INFO: Record<string, RefreshInfo> = {};

/**
 * Notify all onUpdate subscribers that new data came in.
 */
function callOnUpdates(key: string) {
  const refreshInfo = REFRESH_INFO[key];
  refreshInfo.onUpdates.forEach((cb) => cb(refreshInfo.lastUpdated));
}

/**
 * Get data for a queue.
 * @param qid Queue ID to get data for
 * @param onUpdate Optional callback to listen for when data is refetched, whether via HTTP or SSE
 */
export function useQueue(qid: number, onUpdate?: OnUpdate): UseQueueReturn {
  const key = qid && `/api/v1/queues/${qid}`;
  if (!(key in REFRESH_INFO)) {
    REFRESH_INFO[key] = {
      lastUpdated: null,
      onUpdates: new Set(),
    };
  }

  // Register onUpdate callback
  useEffect(() => {
    if (onUpdate) {
      const refreshInfo = REFRESH_INFO[key];
      refreshInfo.onUpdates.add(onUpdate);
      onUpdate(refreshInfo.lastUpdated);
      return () => {
        refreshInfo.onUpdates.delete(onUpdate);
      };
    }
  }, [onUpdate, key]);

  const isLive = useEventSource(
    qid && `/api/v1/queues/${qid}/sse`,
    "queue",
    useCallback(
      (data: SSEQueueResponse) => {
        if (data.queue) {
          mutate(key, plainToClass(GetQueueResponse, data.queue), false);
          REFRESH_INFO[key].lastUpdated = new Date();
          callOnUpdates(key);
        }
      },
      [key]
    )
  );

  const { data: queue, error: queueError, mutate: mutateQueue } = useSWR(
    key,
    useCallback(async () => API.queues.get(Number(qid)), [qid]),
    {
      refreshInterval: isLive ? 0 : 10 * 1000,
      onSuccess: (_, key) => {
        REFRESH_INFO[key].lastUpdated = new Date();
        callOnUpdates(key);
      },
    }
  );

  return {
    queue,
    queueError,
    mutateQueue,
    isLive,
  };
}
