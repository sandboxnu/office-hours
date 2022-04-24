import { API } from "@koh/api-client";
import { QueuePartial, Role } from "@koh/common";
import { message, Modal, Select } from "antd";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useCourse } from "../../hooks/useCourse";
import { useProfile } from "../../hooks/useProfile";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import TACheckinButton, { CheckinButton } from "./TACheckinButton";

export default function TodayPageCheckinButton(): ReactElement {
  const profile = useProfile();
  const [modalVisible, setModalVisible] = useState(false);
  const [queueToCheckInto, setQueueToCheckInto] = useState(-1);
  const router = useRouter();
  const { cid } = router.query;
  const { course, mutateCourse } = useCourse(Number(cid));
  const role = useRoleInCourse(Number(cid));
  const { Option } = Select;
  const availableQueues = course?.queues.filter((q) =>
    role === Role.TA ? !q.isProfessorQueue : true
  );
  const queueCheckedIn = course?.queues.find((queue) =>
    queue.staffList.find((staff) => staff.id === profile?.id)
  );

  const onQueueUpdate = (queueIx: number) => {
    setQueueToCheckInto(queueIx);
  };

  return (
    <>
      {modalVisible && (
        <Modal
          title="Check into an existing queue"
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setQueueToCheckInto(-1);
          }}
          okText="Check In"
          okButtonProps={{ disabled: queueToCheckInto < 0 }}
          onOk={async () => {
            let redirectID: QueuePartial;
            try {
              // ok only enabled on nonnegative values
              redirectID = await API.taStatus.checkIn(
                Number(cid),
                availableQueues[queueToCheckInto].room
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
        >
          <h3>Begin searching for a room</h3>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a course"
            optionFilterProp="children"
            onChange={onQueueUpdate}
            data-cy="select-existing-queue"
            filterOption={(input, option) => {
              return (
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
          >
            {availableQueues.map((q, i) => (
              <Option
                key={i}
                value={i}
                data-cy={`select-queue-${q.room}`}
              >{`${q.room}`}</Option>
            ))}
          </Select>
        </Modal>
      )}
      {!queueCheckedIn && role !== Role.STUDENT && (
        <CheckinButton
          type="default"
          size="large"
          data-cy="check-in-modal-button"
          onClick={() => setModalVisible(true)}
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
