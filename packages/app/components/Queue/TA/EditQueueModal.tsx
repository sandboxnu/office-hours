import { ReactElement } from "react";
import Modal from "antd/lib/modal/Modal";
import { Switch, Input, Form } from "antd";
import styled from "styled-components";
import { API } from "@koh/api-client";
import { useQueue } from "../../../hooks/useQueue";
import { UpdateQueueParams } from "@koh/common";
import { pick } from "lodash";
import ModalFooter from "../../common/ModalFooter";

const NotesInput = styled(Input.TextArea)`
  border-radius: 6px;
  border: 1px solid #b8c4ce;
`;

interface EditQueueModalProps {
  queueId: number;
  visible: boolean;
  onClose: () => void;
}

export function EditQueueModal({
  queueId,
  visible,
  onClose,
}: EditQueueModalProps): ReactElement {
  const { queue, mutateQueue } = useQueue(queueId);
  const [form] = Form.useForm();

  const editQueue = async (updateQueue: UpdateQueueParams) => {
    const newQueue = { ...queue, ...updateQueue };
    mutateQueue(newQueue, false);
    await API.queues.update(
      newQueue.id,
      pick(newQueue, ["notes", "allowQuestions"])
    );
    mutateQueue();
  };

  const handleOk = async () => {
    const value = await form.validateFields();
    await editQueue(value);
    onClose();
  };

  return (
    <Modal
      title="Edit Queue Details"
      visible={visible}
      onCancel={onClose}
      onOk={handleOk}
      footer={<ModalFooter onCancel={onClose} onOk={handleOk} />}
    >
      {queue && (
        <Form form={form} initialValues={queue}>
          <Form.Item label="Queue Notes" name="notes">
            <NotesInput rows={4} allowClear={true} placeholder={""} />
          </Form.Item>
          <Form.Item
            label="Allow New Questions"
            name="allowQuestions"
            valuePropName="checked"
          >
            <Switch data-cy="allow-questions-toggle" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
