import { useEffect } from "react";

interface ListenerAndCount {
  listener: (d: any) => void;
  count: number;
}

interface SourceAndCount {
  eventSource: EventSource;
  listeners: Record<string, ListenerAndCount>;
}
const EVENTSOURCES: Record<string, SourceAndCount> = {};

export const useEventSource = (
  url: string,
  listenerKey: string,
  onmessage: (d: any) => void
): any => {
  useEffect(() => {
    if (url) {
      let source: SourceAndCount;
      if (url in EVENTSOURCES) {
        source = EVENTSOURCES[url];
      } else {
        source = { eventSource: new EventSource(url), listeners: {} };
        EVENTSOURCES[url] = source;
        source.eventSource.onmessage = function logEvents(event) {
          const values = Object.values(source.listeners);
          const eventData = JSON.parse(event.data);
          values.forEach((lac) => lac.listener(eventData));
        };
      }

      let listener = source.listeners[listenerKey];

      if (source.listeners[listenerKey]) {
        listener.count++;
      } else {
        listener = { listener: onmessage, count: 1 };
        source.listeners[listenerKey] = listener;
      }

      return () => {
        // Close event source if no one is listening
        listener.count--;
        if (listener.count === 0) {
          delete source.listeners[listenerKey];
          if (Object.values(source.listeners).length === 0) {
            source.eventSource.close();
            delete EVENTSOURCES[url];
          }
        }
      };
    }
  }, [url, onmessage, listenerKey]);
};
