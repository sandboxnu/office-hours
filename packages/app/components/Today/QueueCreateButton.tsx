import React, { ReactElement, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { Role } from "@koh/common";
import { CheckinButton } from "./TACheckinButton";
import { useRouter } from "next/router";
import { useCourse } from "../../hooks/useCourse";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import { Checkbox, Col, Form, Input, message, Modal, Row, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { API } from "@koh/api-client";

export default function TodayPageCreateButton(): ReactElement {
  const profile = useProfile();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { cid } = router.query;
  const { course, mutateCourse } = useCourse(Number(cid));
  const role = useRoleInCourse(Number(cid));
  const [isOnline, setIsOnline] = useState(false);
  const [allowTA, setAllowTA] = useState(role === Role.PROFESSOR);
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
    } catch (err) {
      message.error(err.response?.data?.message);
    }
  }

  const onAllowTAUpdate = (e) => {
    setAllowTA(e.target.checked);
    updateRoomName(isOnline, e.target.checked);
  };

  const onIsOnlineUpdate = (e) => {
    setIsOnline(e.target.checked);
    updateRoomName(e.target.checked, allowTA);
  };

  const updateRoomName = (online, aTA) => {
    if (online) {
      form.setFieldsValue({
        officeHourName: aTA
          ? `Online`
          : `Professor ${profile.lastName}'s Office Hours`,
      });
    } else {
      form.setFieldsValue({
        officeHourName: "",
      });
    }
  };

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
              <Space>
                <Col style={{ fontWeight: "bold" }}>
                  <Row>Online?</Row>
                  <Row>
                    <Form.Item
                      name="isOnline"
                      initialValue={false}
                      valuePropName="checked"
                    >
                      <Checkbox
                        data-cy="qc-isonline"
                        defaultChecked
                        onChange={onIsOnlineUpdate}
                      />
                    </Form.Item>
                  </Row>
                </Col>
                {role === Role.PROFESSOR && (
                  <Col style={{ fontWeight: "bold" }}>
                    <Row>Allow TAs to check in?</Row>
                    <Row>
                      <Form.Item
                        name="allowTA"
                        initialValue={allowTA}
                        valuePropName="checked"
                      >
                        <Checkbox
                          data-cy="qc-allowTA"
                          defaultChecked={allowTA}
                          onChange={onAllowTAUpdate}
                        />
                      </Form.Item>
                    </Row>
                  </Col>
                )}
                {role === Role.TA && (
                  <Form.Item
                    name="allowTA"
                    initialValue={allowTA}
                    valuePropName="checked"
                  />
                )}
              </Space>
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
                  data-cy="qc-location"
                  placeholder={"Ex: ISEC 102"}
                  disabled={isOnline}
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
