import { API } from "@koh/api-client";
import { AlertType, RephraseQuestionPayload } from "@koh/common";
import React, { ReactElement } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import StudentQuestionRephraseModal from "../Queue/Student/StudentQuestionRephraseModal";

type AlertsContainerProps = {
  courseId: number; // TODO: replace this with a courseId that comes from the RephraseQuestionPayload
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
    mutateAlerts();
    router.push(`/course/${courseId}/queue/${queueId}?edit_question=true`);
  };

  const alertDivs = alerts?.map((alert) => {
    switch (alert.alertType) {
      case AlertType.REPHRASE_QUESTION:
        return (
          <StudentQuestionRephraseModal
            courseId={courseId}
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
