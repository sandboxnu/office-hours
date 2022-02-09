import { API } from "@koh/api-client";
import { AlertType, RephraseQuestionPayload } from "@koh/common";
import React, { ReactElement } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import StudentQuestionRephraseModal from "../Queue/Student/StudentQuestionRephraseModal";

type AlertsContainerProps = {
  courseId: number;
};
export default function AlertsContainer({
  courseId,
}: AlertsContainerProps): ReactElement {
  const router = useRouter();
  const { data, mutate: mutateAlerts } = useSWR("/api/v1/alerts", async () =>
    API.alerts.get(courseId)
  );
  const alerts = data?.alerts;

  const handleClose = async (alertId, courseId, queueId) => {
    await API.alerts.close(alertId);
    // TODO: literally no clue why you need to call the GET endpoint twice in order for
    // the new alerts list to be correctly fetched. For some reason the first call
    // returns the old list containing the already resolved alert
    await API.alerts.get(courseId);
    await mutateAlerts();
    router.push(`/course/${courseId}/queue/${queueId}?edit_question=true`);
  };

  const alertDivs = alerts?.map((alert) => {
    switch (alert.alertType) {
      case AlertType.REPHRASE_QUESTION:
        return (
          <StudentQuestionRephraseModal
            payload={alert.payload as RephraseQuestionPayload}
            handleClose={async (courseId, queueId) =>
              await handleClose(alert.id, courseId, queueId)
            }
          />
        );
    }
  });

  // probably want some better way of handling multiple alerts
  return <div>{alertDivs}</div>;
}
