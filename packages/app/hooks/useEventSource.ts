import { useEffect } from "react";

export const useEventSource = (
  url: string,
  onmessage: (d: any) => void
): any => {
  useEffect(() => {
    if (url) {
      const source = new EventSource(url);

      source.onmessage = function logEvents(event) {
        onmessage(JSON.parse(event.data));
      };
      return () => source.close();
    }
  }, [url, onmessage]);
};
