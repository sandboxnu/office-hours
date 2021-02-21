import React from "react";
import useSWR from "swr/esm/use-swr";
import { API } from "@koh/api-client";

type AlertsContainerProps = {
  courseId: number;
};
export default function AlertsContainer({ courseId }: AlertsContainerProps) {
  const { data } = useSWR("/api/v1/alerts", async () => {
    return API.alerts.get(courseId);
  });
  const alerts = data.alerts;

  return <div></div>;
}
