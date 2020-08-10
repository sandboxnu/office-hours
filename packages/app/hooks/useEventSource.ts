import { useEffect, useState } from "react";

export const useEventSource = (
  url: string,
  onmessage: (d: any) => void
): any => {
  const [data, updateData] = useState(null);

  useEffect(() => {
    if (url) {
      const source = new EventSource(url);

      source.onmessage = function logEvents(event) {
        onmessage(JSON.parse(event.data));
      };
    }
  }, [url]);

  return data;
};
