import { API } from "@koh/api-client";
import { QueuePartial, Role } from "@koh/common";
import { Button, message } from "antd";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useCourse } from "../../hooks/useCourse";
import { useProfile } from "../../hooks/useProfile";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import QueueCheckInModal from "./QueueCheckInModal";
import QueueCreateModal from "./QueueCreateModal";
import TACheckinButton, { CheckinButton } from "./TACheckinButton";

const CreateQueueButton = styled(Button)`
  color: white;
  background: #2a9187;
  &:hover,
  &:focus {
    color: white;
    background: #39aca1;
  }
`;

export default function TodayPageCheckinButton(): ReactElement {
  // state for check in modal
  const [checkInModalVisible, setCheckInModalVisible] = useState(false);
  const [createQueueModalVisible, setCreateQueueModalVisible] = useState(false);

  const profile = useProfile();
  const router = useRouter();
  const { cid } = router.query;
  const { course, mutateCourse } = useCourse(Number(cid));
  const role = useRoleInCourse(Number(cid));
  const availableQueues = course?.queues.filter((q) =>
    role === Role.TA ? !q.isProfessorQueue : true
  );
  const queueCheckedIn = course?.queues.find((queue) =>
    queue.staffList.find((staff) => staff.id === profile?.id)
  );

  const numQueues = course?.queues.length;

  const renderProperModal = () => {
    numQueues !== 0
      ? setCheckInModalVisible(true)
      : setCreateQueueModalVisible(true);
  };

  const submitMakeQueue = async (submittedForm) => {
    const queueRequest = await submittedForm.validateFields();
    try {
      await API.taStatus.makeQueue(
        Number(cid),
        queueRequest.officeHourName,
        !queueRequest.allowTA,
        queueRequest.notes
      );
      message.success(
        `Created a new queue ${queueRequest.officeHourName}. Checking you in...`
      );
      const redirectID = await API.taStatus.checkIn(
        Number(cid),
        queueRequest.officeHourName
      );
      mutateCourse();
      router.push(
        "/course/[cid]/queue/[qid]",
        `/course/${Number(cid)}/queue/${redirectID.id}`
      );
      setCreateQueueModalVisible(false);
    } catch (err) {
      message.error(err.response?.data?.message);
    }
  };

  const onCreateQueueButtonClick = () => {
    setCheckInModalVisible(false);
    setCreateQueueModalVisible(true);
  };

  return (
    <>
      {checkInModalVisible && (
        <QueueCheckInModal
          visible={checkInModalVisible}
          onSubmit={async (queueId: number) => {
            let redirectID: QueuePartial;
            try {
              redirectID = await API.taStatus.checkIn(
                Number(cid),
                availableQueues[queueId].room
              );
              mutateCourse();
              router.push(
                "/course/[cid]/queue/[qid]",
                `/course/${Number(cid)}/queue/${redirectID.id}`
              );
            } catch (err) {
              message.error(err.response?.data?.message);
            }
          }}
          onCancel={() => setCheckInModalVisible(false)}
          button={
            <CreateQueueButton onClick={onCreateQueueButtonClick}>
              + Create Queue
            </CreateQueueButton>
          }
          queues={availableQueues}
        />
      )}
      {createQueueModalVisible && (
        <QueueCreateModal
          visible={createQueueModalVisible}
          onSubmit={submitMakeQueue}
          onCancel={() => setCreateQueueModalVisible(false)}
          role={role}
          lastName={profile?.lastName}
        />
      )}
      {!queueCheckedIn && role !== Role.STUDENT && (
        <CheckinButton
          type="default"
          size="large"
          data-cy="check-in-modal-button"
          onClick={() => renderProperModal()}
        >
          Check In
        </CheckinButton>
      )}
      {queueCheckedIn && role !== Role.STUDENT && (
        <TACheckinButton
          courseId={Number(cid)}
          room={queueCheckedIn.room}
          state="CheckedIn"
        />
      )}
    </>
  );
}
