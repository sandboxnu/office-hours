import { API } from "@koh/api-client";
import { QuestionStatusKeys } from "@koh/common";
import { Tooltip } from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useProfile } from "../../../hooks/useProfile";
import { useQuestions } from "../../../hooks/useQuestions";
import { useQueue } from "../../../hooks/useQueue";
import { useTAInQueueInfo } from "../../../hooks/useTAInQueueInfo";
import {
  QueueInfoColumn,
  QueueInfoColumnButton,
} from "../QueueListSharedComponents";
import { EditQueueModal } from "./EditQueueModal";
import onHelpQuestion from "./onHelpQuestion";
import { COMPACT_BKPT, SPLIT_DETAIL_BKPT } from "./TAQueueBreakpoints";
import TAQueueListDetail from "./TAQueueListDetail";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const CheckOutButton = styled(QueueInfoColumnButton)`
  color: #da3236;
`;

const CheckInButton = styled(QueueInfoColumnButton)`
  color: white;
  background: #2a9187;
`;

const HelpNextButton = styled(QueueInfoColumnButton)`
  color: white;
  background: #2a9187;
  &:hover,
  &:focus {
    color: white;
    background: #39aca1;
  }
`;

const EditQueueButton = styled(QueueInfoColumnButton)`
  color: #212934;
`;

const MiddleSpacer = styled.div`
  @media (min-width: ${SPLIT_DETAIL_BKPT}px) {
    margin-left: 20px;
  }
  @media (min-width: ${COMPACT_BKPT}px) {
    margin-left: 32px;
  }
`;

interface TAQueueProps {
  qid: number;
  courseId: number;
}

export default function TAQueue({ qid, courseId }: TAQueueProps): ReactElement {
  const user = useProfile();
  const { queue, mutateQueue } = useQueue(qid);

  const { questions, mutateQuestions } = useQuestions(qid);

  const { isCheckedIn, isHelping } = useTAInQueueInfo(qid);

  const [queueSettingsModal, setQueueSettingsModal] = useState(false);

  const nextQuestion =
    questions?.priorityQueue[0] || // gets the first item of priority queue if it exists
    questions?.queue?.find(
      (question) => question.status === QuestionStatusKeys.Queued
    );

  const helpNext = async () => {
    await onHelpQuestion(nextQuestion.id);
    mutateQuestions();
    window.open(
      `https://teams.microsoft.com/l/chat/0/0?users=${nextQuestion.creator.email}`
    );
  };

  if (queue) {
    return (
      <>
        <Container>
          <QueueInfoColumn
            queueId={qid}
            buttons={
              <>
                <EditQueueButton
                  data-cy="editQueue"
                  onClick={() => setQueueSettingsModal(true)}
                >
                  Edit Queue Details
                </EditQueueButton>
                <Tooltip
                  title={!isCheckedIn && "You must check in to help students!"}
                >
                  <HelpNextButton
                    onClick={helpNext}
                    disabled={!isCheckedIn || !nextQuestion || isHelping}
                    data-cy="help-next"
                  >
                    Help Next
                  </HelpNextButton>
                </Tooltip>
                {isCheckedIn ? (
                  <CheckOutButton
                    danger
                    disabled={isHelping}
                    data-cy="check-out-button"
                    onClick={async () => {
                      await API.taStatus.checkOut(courseId, queue?.room);
                      mutateQueue();
                    }}
                  >
                    Check Out
                  </CheckOutButton>
                ) : (
                  <CheckInButton
                    onClick={async () => {
                      await API.taStatus.checkIn(courseId, queue?.room);
                      mutateQueue();
                    }}
                    data-cy="check-in-button"
                  >
                    Check In
                  </CheckInButton>
                )}
              </>
            }
          />
          <MiddleSpacer />
          {user && questions && <TAQueueListDetail queueId={qid} />}
        </Container>
        <EditQueueModal
          queueId={qid}
          visible={queueSettingsModal}
          onClose={() => setQueueSettingsModal(false)}
        />
      </>
    );
  } else {
    return <div />;
  }
}
