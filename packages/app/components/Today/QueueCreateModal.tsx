import { Role } from '@koh/common'
import { Modal, Form, Radio, Input, Switch } from 'antd'
import { FormInstance } from 'antd/lib/form'
import TextArea from 'antd/lib/input/TextArea'
import { ReactElement } from 'react'
import { useState } from 'react'

interface QueueCreateModalProps {
  visible: boolean
  onSubmit: (form: FormInstance) => void
  onCancel: () => void
  role: Role
  lastName: string
}

export default function QueueCreateModal({
  visible,
  onSubmit,
  onCancel,
  role,
  lastName,
}: QueueCreateModalProps): ReactElement {
  const [form] = Form.useForm()
  const [locEditable, setLocEditable] = useState(
    !form.getFieldValue('isOnline'),
  )

  const onIsOnlineUpdate = (isOnline) => {
    setLocEditable(!isOnline)
    if (!isOnline) {
      form.setFieldsValue({
        officeHourName: '',
      })
    } else {
      updateRoomName()
    }
  }

  const updateRoomName = () => {
    const online = form.getFieldValue('isOnline')
    const allowTA = form.getFieldValue('allowTA')
    if (online) {
      form.setFieldsValue({
        officeHourName: allowTA
          ? `Online`
          : `Online - Professor ${lastName}'s Office Hours`,
      })
    }
  }

  return (
    <Modal
      title={`Create a new queue`}
      visible={visible}
      onCancel={onCancel}
      okText="Create"
      onOk={() => onSubmit(form)}
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
          <Radio.Group onChange={updateRoomName} data-cy="qc-allowTA">
            <Radio data-cy="qc-allowTA-unchecked" value={false}>
              Allow professors only
            </Radio>
            <Radio data-cy="qc-allowTA-checked" value={true}>
              Allow TAs to check in
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label={<strong>Queue Location</strong>}
          name="officeHourName"
          rules={[
            {
              required: true,
              message: 'Please give this room a name.',
            },
          ]}
        >
          <Input
            data-cy="qc-location"
            placeholder={'Ex: ISEC 102'}
            disabled={!locEditable}
            style={{ width: 350 }}
          />
        </Form.Item>

        <Form.Item
          label={<strong>Additional Notes (optional)</strong>}
          name="notes"
          style={{ width: '100%' }}
        >
          <TextArea data-cy="qc-notes" rows={4} placeholder="Notes" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
