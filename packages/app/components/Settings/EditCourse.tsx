import { API } from '@koh/api-client'
import { Button, Form, Input, message } from 'antd'
import { ReactElement, useState, useEffect } from 'react'
import styled from 'styled-components'
type CourseRosterPageProps = { courseId: number }
import { useCourse } from '../../hooks/useCourse'
const CourseRosterPageComponent = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
`

export default function EditCourse({
  courseId,
}: CourseRosterPageProps): ReactElement {
  const cid = courseId
  const course = useCourse(cid)
  const inviteCode = course.course?.courseInviteCode
  const id = course.course?.id

  const baseURL =
    typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.host}`
      : ''

  const [form] = Form.useForm()
  const [copied, setCopied] = useState(false)
  const [courseCode, setCourseCode] = useState(course.course?.courseInviteCode)
  const [inviteURL, setInviteURL] = useState<string>('')

  useEffect(() => {
    setInviteURL(`${baseURL}/course/${id}/invite?code=${courseCode}`)
  }, [courseCode, id, baseURL])

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteURL).then(() => {
      setCopied(true)
    })
  }

  const submit = async (values) => {
    const value = await form.validateFields()
    await API.course
      .editCourseInfo(cid, {
        courseId: cid,
        courseInviteCode: value.inviteCode,
      })
      .then(() => message.success('Edited Course info'))

    setCopied(false)
    setCourseCode(values.inviteCode)
  }

  return (
    <div>
      <CourseRosterPageComponent>
        <div style={{ textAlign: 'center' }}>
          <Form form={form} initialValues={course} onFinish={submit}>
            <h3>
              Current Invite Code is:&nbsp;
              {courseCode ? courseCode : 'No invite code set'}
            </h3>
            <Form.Item
              style={{ width: '500px' }}
              label="Invite Code"
              name="inviteCode"
            >
              <Input
                allowClear={true}
                placeholder={courseCode || 'No invite code set'}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          {courseCode && (
            <div>
              <p>Invite URL: {inviteURL}</p>
              <Button onClick={handleCopy} type="primary">
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </Button>
            </div>
          )}
        </div>
      </CourseRosterPageComponent>
    </div>
  )
}
