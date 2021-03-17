import { API } from "@koh/api-client";
import { AlertType, RephraseQuestionPayload } from "@koh/common";
import React, { ReactElement } from "react";
import useSWR from "swr";
import StudentQuestionRephraseModal from "../Queue/Student/StudentQuestionRephraseModal";

type AlertsContainerProps = {
  courseId: number;
};
export default function AlertsContainer({
  courseId,
}: AlertsContainerProps): ReactElement {
  const { data } = useSWR("/api/v1/alerts", async () => {
    console.log("ligma 1", courseId);
    return await API.alerts.get(courseId);
  });
  const alerts = data?.alerts;

  const handleClose = async (alertId) => {
    await API.alerts.close(alertId);
  };

  const alertDivs = alerts?.map((alert) => {
    switch (alert.alertType) {
      case AlertType.REPHRASE_QUESTION:
        return (
          <StudentQuestionRephraseModal
            courseId={courseId}
            payload={alert.payload as RephraseQuestionPayload}
            handleClose={async () => {
              console.log("ligma", alert, alert.id);
              await API.alerts.close(alert.id);
            }}
          />
        );
    }
  });

  return <div>{alertDivs}</div>;
}
