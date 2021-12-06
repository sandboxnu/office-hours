import { API } from "@koh/api-client";
import { QueuePartial, Role } from "@koh/common";
import { Form, Input, message, Modal, Radio } from "antd";
import { useRouter } from "next/router";
import { Row } from "antd";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useCourse } from "../../hooks/useCourse";
import { useProfile } from "../../hooks/useProfile";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import TACheckinButton, { CheckinButton } from "./TACheckinButton";

const ModalRadio = styled(Radio)`
  display: block;
  height: 30px;
`;

export default function TodayPageCheckinButton(): ReactElement {
  const profile = useProfile();
  const [modalVisible, setModalVisible] = useState(false);
  const [queueToCheckInto, setQueueToCheckInto] = useState(0);
  const router = useRouter();
  const { cid } = router.query;
  const { course } = useCourse(Number(cid));
  const role = useRoleInCourse(Number(cid));
  const [form] = Form.useForm();
  const queueCheckedIn = course?.queues.find((queue) =>
    queue.staffList.find((staff) => staff.id === profile?.id)
  );

  return (
    <>
      {modalVisible && (
        <Modal
          title="Check-In To Office Hours"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          okText="Check In"
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
          <h3>Which queue would you like to check into?</h3>
          <Radio.Group
            value={queueToCheckInto}
            onChange={(e) => setQueueToCheckInto(e.target.value)}
          >
            {course?.queues
              .filter((q) => (role === Role.TA ? !q.isProfessorQueue : true))
              .map((q, i) => (
                <ModalRadio key={q.id} value={i}>
                  {q.room}
                </ModalRadio>
              ))}
            <Row style={{ flexWrap: "nowrap" }}>
              <ModalRadio value={-1}>Other...</ModalRadio>
              {queueToCheckInto === -1 ? (
                <Form form={form}>
                  <Form.Item
                    name="officeHourName"
                    rules={[
                      {
                        required: true,
                        message: "Please give this room a name.",
                      },
                    ]}
                  >
                    <Input
                      defaultValue={
                        role === Role.TA
                          ? ""
                          : `Professor ${profile.lastName}'s Office Hours`
                      }
                      placeholder={"Please name the room."}
                      style={{ width: 350 }}
                    />
                  </Form.Item>
                </Form>
              ) : null}
            </Row>
          </Radio.Group>
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