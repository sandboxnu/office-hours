import { API } from "@koh/api-client";
import { Button, Form, Input, message } from "antd";
import { ReactElement, useState } from "react";
import styled from "styled-components";
type CourseRosterPageProps = { courseId: number };
import { useCourse } from "../../hooks/useCourse";
const CourseRosterPageComponent = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
`;

export default function EditCourse({
  courseId,
}: CourseRosterPageProps): ReactElement {
  const cid = courseId;
  const course = useCourse(cid);
  const inviteCode = course.course?.courseInviteCode;
  const id = course.course?.id;

  const baseURL =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "";
  const inviteURL = `${baseURL}/course/${id}/invite?code=${inviteCode}`;

  const [form] = Form.useForm();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteURL).then(() => {
      setCopied(true);
    });
  };

  const submit = async () => {
    const value = await form.validateFields();
    await API.course
      .editCourseInfo(cid, {
        courseId: cid,
        courseInviteCode: value.inviteCode,
      })
      .then(() => message.success("Edited Course info"));
  };

  //   return (
  //   <div>
  //     <CourseRosterPageComponent>
  //       <div style={{ textAlign: "center" }}>
  //       <Form
  //         form={form}
  //         initialValues={course}
  //         onFinish={submit}>
  //           <h3> Current Timer: {course.course?.questionTimer} minutes</h3>
  //       <Form.Item style={{ width:"500px" }}label="Question Timer" name="questionTimer">
  //         <Input allowClear={true} placeholder={"Minutes before a question times out"}/>
  //       </Form.Item>
  //       <Form.Item >
  //     <Button type="primary" htmlType="submit">
  //       Submit
  //     </Button>
  //   </Form.Item>
  //     </Form>
  //       </div>
  //     </CourseRosterPageComponent>
  //   </div>
  // );
  return (
    <div>
      <CourseRosterPageComponent>
        <div style={{ textAlign: "center" }}>
          <Form form={form} initialValues={course} onFinish={submit}>
            <h3>
              Current Invite Code:
              {course.course?.courseInviteCode
                ? course.course.courseInviteCode
                : "No invite code set"}
            </h3>
            <Form.Item
              style={{ width: "500px" }}
              label="Invite Code"
              name="inviteCode"
            >
              <Input
                allowClear={true}
                placeholder={
                  course.course?.courseInviteCode || "No invite code set"
                }
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          {inviteCode && (
            <div>
              <p>Invite URL: {inviteURL}</p>
              <button onClick={handleCopy}>
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>
          )}
        </div>
      </CourseRosterPageComponent>
    </div>
  );
}
