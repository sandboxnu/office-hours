import React from "react";
import useSWR from "swr/esm/use-swr";
import { API } from "@koh/api-client";
import { AlertType, RephraseQuestionPayload } from "@koh/common";
import StudentQuestionRephraseModal from "../Queue/Student/StudentQuestionRephraseModal";

type AlertsContainerProps = {
  courseId: number;
};
export default function AlertsContainer({ courseId }: AlertsContainerProps) {
  const { data } = useSWR("/api/v1/alerts", async () => {
    return API.alerts.get(courseId);
  });
  const alerts = data.alerts;

  const handleClose = async (alertId) => {
    await API.alerts.close(alertId);
  };

  alerts.map((alert) => {
    switch (alert.alertType) {
      case AlertType.REPHRASE_QUESTION:
        return (
          <StudentQuestionRephraseModal
            courseId={courseId}
            payload={alert.payload as RephraseQuestionPayload}
            handelClose={async (alertId) => {
              await API.alerts.close(alertId);
            }}
          />
        );
    }
  });

  return <div></div>;
}
