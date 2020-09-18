import { apm } from "@elastic/apm-rum";
import { Result } from "antd";
import React, { ReactNode } from "react";

interface EBState {
  hasError: boolean;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export class ErrorBoundary extends React.Component<{}, EBState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error): EBState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo): void {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    if (window) {
      apm.captureError(error);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Result
          status="500"
          title="We hit an unexpected error."
          subTitle="Sorry about that! A report has automatically been filed. Try refreshing the page."
        />
      );
    }

    return this.props.children;
  }
}
