import { API } from "@koh/api-client";
import { QueuePartial, Role } from "@koh/common";
import { Form, message, Modal, Select } from "antd";
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
  const { course } = useCourse(Number(cid));
  const role = useRoleInCourse(Number(cid));
  const [form] = Form.useForm();
  const { Option } = Select;
  const queueCheckedIn = course?.queues.find((queue) =>
    queue.staffList.find((staff) => staff.id === profile?.id)
  );

  function onQueueUpdate(queueIx: number) {
    setQueueToCheckInto(queueIx);
  }

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
            const value = await form.validateFields();
            let redirectID: QueuePartial;
            try {
              if (queueToCheckInto > -1) {
                redirectID = await API.taStatus.checkIn(
                  Number(cid),
                  course?.queues[queueToCheckInto].room
                );
              } else {
                redirectID = await API.taStatus.checkIn(
                  Number(cid),
                  value.officeHourName
                );
              }
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
            filterOption={(input, option) => {
              return (
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
          >
            {course?.queues
              .filter((q) => (role === Role.TA ? !q.isProfessorQueue : true))
              .map((q, i) => (
                <Option key={i} value={i}>{`${q.room}`}</Option>
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
