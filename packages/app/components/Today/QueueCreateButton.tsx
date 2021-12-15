import React, { ReactElement, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { Role } from "@koh/common";
import { CheckinButton } from "./TACheckinButton";
import { useRouter } from "next/router";
import { useCourse } from "../../hooks/useCourse";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import { Col, Form, Input, Modal, Row, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";

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
        >
          <Form form={form}>
            <Row>
              <Col style={{ fontWeight: "bold" }}>
                <Row>Online?</Row>
                <Row>
                  <Form.Item name="isOnline">
                    <Switch defaultChecked />
                  </Form.Item>
                </Row>
              </Col>

              <Col style={{ fontWeight: "bold" }}>
                <Row>Allow TAs?</Row>
                <Row>
                  <Form.Item name="allowTA">
                    <Switch
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
              >
                <Input
                  defaultValue={
                    role === Role.TA
                      ? ""
                      : `Professor ${profile.lastName}'s Office Hours`
                  }
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
                <TextArea rows={4} placeholder="Notes" />
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
