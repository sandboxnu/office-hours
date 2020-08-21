import { useEffect } from "react";

interface SourceAndCount {
  eventSource: EventSource;
  listenerCount: number;
}
const EVENTSOURCES: Record<string, SourceAndCount> = {};

export const useEventSource = (
  url: string,
  onmessage: (d: any) => void
): any => {
  useEffect(() => {
    if (url) {
      let source: SourceAndCount;
      if (url in EVENTSOURCES) {
        source = EVENTSOURCES[url];
        source.listenerCount++;
      } else {
        source = { eventSource: new EventSource(url), listenerCount: 1 };
        EVENTSOURCES[url] = source;
      }

      source.eventSource.onmessage = function logEvents(event) {
        onmessage(JSON.parse(event.data));
      };
      return () => {
        // Close event source if no one is listening
        source.listenerCount--;
        if (source.listenerCount === 0) {
          source.eventSource.close();
          delete EVENTSOURCES[url];
        }
      };
    }
  }, [url, onmessage]);
};
