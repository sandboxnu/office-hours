import {
  useState,
  useEffect,
  useCallback,
  ReactElement,
  ReactNode,
} from "react";

interface RenderEveryProps {
  render: () => ReactNode;
  /** ms between rerenders */
  interval: number;
}
export function RenderEvery({
  render,
  interval,
}: RenderEveryProps): ReactElement {
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    const timer = setInterval(() => {
      forceUpdate();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [forceUpdate, interval]);

  return <>{render()}</>;
}
