import React, { ReactElement, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { Role } from "@koh/common";
import { CheckinButton } from "./TACheckinButton";
import { useRouter } from "next/router";
import { useCourse } from "../../hooks/useCourse";
import { useRoleInCourse } from "../../hooks/useRoleInCourse";
import { Switch, Form, Input, message, Modal, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { API } from "@koh/api-client";

export default function TodayPageCreateButton(): ReactElement {
  const profile = useProfile();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { cid } = router.query;
  const { course, mutateCourse } = useCourse(Number(cid));
  const role = useRoleInCourse(Number(cid));
  const queueCheckedIn = course?.queues.find((queue) =>
    queue.staffList.find((staff) => staff.id === profile?.id)
  );
  const [form] = Form.useForm();
  const [locEditable, setLocEditable] = useState(
    !form.getFieldValue("isOnline")
  );

  const submitMakeQueue = async () => {
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
  };

  const onIsOnlineUpdate = (isOnline) => {
    setLocEditable(!isOnline);
    if (!isOnline) {
      form.setFieldsValue({
        officeHourName: "",
      });
    } else {
      updateRoomName();
    }
  };

  const updateRoomName = () => {
    const online = form.getFieldValue("isOnline");
    const allowTA = form.getFieldValue("allowTA");
    if (online) {
      form.setFieldsValue({
        officeHourName: allowTA
          ? `Online`
          : `Online - Professor ${profile.lastName}'s Office Hours`,
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
          <Form form={form} layout="vertical">
            <Form.Item
              label={<strong>Online?</strong>}
              name="isOnline"
              initialValue={false}
              valuePropName="checked"
              tooltip="Online queues automatically open a Teams chat when helping a student"
            >
              <Switch data-cy="qc-isonline" onChange={onIsOnlineUpdate} />
            </Form.Item>

            <Form.Item
              hidden={role === Role.TA}
              label={<strong>Configure Queue Permissions</strong>}
              name="allowTA"
              initialValue={true}
            >
              <Radio.Group onChange={updateRoomName}>
                <Radio value={false}>Allow professors only</Radio>
                <Radio value={true}>Allow TAs to check in</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label={<strong>Queue Location</strong>}
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
                disabled={!locEditable}
                style={{ width: 350 }}
              />
            </Form.Item>

            <Form.Item
              label={<strong>Additional Notes (optional)</strong>}
              name="notes"
              style={{ width: "100%" }}
            >
              <TextArea data-cy="qc-notes" rows={4} placeholder="Notes" />
            </Form.Item>
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
