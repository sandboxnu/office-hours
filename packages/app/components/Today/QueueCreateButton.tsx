import React, { ReactElement, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { Role } from "@koh/common";
import { CheckinButton } from "./TACheckinButton";
import { useRouter } from "next/router";
import { useCourse } from "../../hooks/useCourse";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import { Col, Form, Input, message, Modal, Row, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { API } from "@koh/api-client";

export default function TodayPageCreateButton(): ReactElement {
  const profile = useProfile();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { cid } = router.query;
  const { course } = useCourse(Number(cid));
  const role = useRoleInCourse(Number(cid));
  const queueCheckedIn = course?.queues.find((queue) =>
    queue.staffList.find((staff) => staff.id === profile?.id)
  );
  const [form] = Form.useForm();

  async function submitMakeQueue() {
    const queueRequest = await form.validateFields();
    try {
      await API.taStatus.makeQueue(
        Number(cid),
        queueRequest.officeHourName,
        !queueRequest.allowTA,
        queueRequest.notes
      );

      message.success(
        `created a new queue ${queueRequest.officeHourName}. Checking you in...`
      );

      const redirectID = await API.taStatus.checkIn(
        Number(cid),
        queueRequest.officeHourName
      );

      router.push(
        "/course/[cid]/queue/[qid]",
        `/course/${Number(cid)}/queue/${redirectID.id}`
      );
    } catch (err) {
      message.error(err.response?.data?.message);
    }
  }

  return (
    <>
      {modalVisible && (
        <Modal
          title={`Create a new queue`}
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
          }}
          okText="Create"
          onOk={submitMakeQueue}
        >
          <Form form={form}>
            <Row>
              <Col style={{ fontWeight: "bold" }}>
                <Row>Online?</Row>
                <Row>
                  <Form.Item
                    name="isOnline"
                    initialValue={true}
                    valuePropName="checked"
                  >
                    <Switch data-cy="qc-isonline" defaultChecked />
                  </Form.Item>
                </Row>
              </Col>

              <Col style={{ fontWeight: "bold" }}>
                <Row>Allow TAs?</Row>
                <Row>
                  <Form.Item
                    name="allowTA"
                    initialValue={role === Role.TA}
                    valuePropName="checked"
                  >
                    <Switch
                      data-cy="qc-allowTA"
                      disabled={role === Role.TA}
                      defaultChecked={role === Role.TA}
                    />
                  </Form.Item>
                </Row>
              </Col>
            </Row>

            <Row style={{ fontWeight: "bold" }}>Queue Location</Row>

            <Row>
              <Form.Item
                name="officeHourName"
                rules={[
                  {
                    required: true,
                    message: "Please give this room a name.",
                  },
                ]}
                initialValue={
                  role === Role.TA
                    ? ""
                    : `Professor ${profile.lastName}'s Office Hours`
                }
              >
                <Input
                  data-cy="qc-location"
                  placeholder={"location"}
                  style={{ width: 350 }}
                />
              </Form.Item>
            </Row>
            <Row style={{ fontWeight: "bold" }}>
              Additional Notes (optional)
            </Row>
            <Row>
              <Form.Item name="notes">
                <TextArea data-cy="qc-notes" rows={4} placeholder="Notes" />
              </Form.Item>
            </Row>
          </Form>
        </Modal>
      )}
      {!queueCheckedIn && role !== Role.STUDENT && (
        <CheckinButton
          type="default"
          size="large"
          data-cy="create-queue-modal-button"
          onClick={() => setModalVisible(true)}
        >
          + Create Queue
        </CheckinButton>
      )}
    </>
  );
}
