/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Result } from "antd";
import React, { ReactNode } from "react";
import * as Sentry from "@sentry/node";

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
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo): void {
    if (window) {
      Sentry.captureException(error);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
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
